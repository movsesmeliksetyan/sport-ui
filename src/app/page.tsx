'use client';

import { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import { GameCard } from '@/components/GameCard';
import { MatchTabs } from '@/components/MatchTabs';
import { FootballMatch, MatchStatus } from '@/types';
import { PageContainer, PageTitle } from '@/components/GameCard/styles';

export default function Home() {
  const [matches, setMatches] = useState<FootballMatch[]>([]);
  const [currentTab, setCurrentTab] = useState<MatchStatus | 'ALL'>('LIVE');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches');
        if (!response.ok) throw new Error('Failed to fetch matches');
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load matches');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = matches.filter((match) =>
    currentTab === 'ALL' ? true : match.status === currentTab
  );

  const counts = {
    all: matches.length,
    live: matches.filter((m) => m.status === 'LIVE').length,
    scheduled: matches.filter((m) => m.status === 'SCHEDULED').length,
    finished: matches.filter((m) => m.status === 'FINISHED').length,
  };

  const handleTabChange = (tab: MatchStatus | 'ALL') => {
    setCurrentTab(tab);
  };

  if (loading)
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <PageTitle variant="h4" component="h1">
          Live Football Matches
        </PageTitle>

        <MatchTabs
          currentTab={currentTab}
          onTabChange={handleTabChange}
          counts={counts}
        />

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
        >
          {filteredMatches.map((match, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ maxWidth: { xs: '100%', sm: '500px', md: '400px' } }}
            >
              <GameCard
                game={{
                  id: index.toString(),
                  homeTeam: match.homeTeam.name,
                  awayTeam: match.awayTeam.name,
                  homeTeamLogo: match.homeTeam.logo,
                  awayTeamLogo: match.awayTeam.logo,
                  scheduledTime: match.time,
                  status: match.status,
                  league: match.tournament,
                  channel: match.channel,
                  link: match.link,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
}
