'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Theme,
  IconButton,
} from '@mui/material';
import { IMatchDetails } from '@/types';
import { VideoPlayer } from '@/components/VideoPlayer';
import { fetchMatchDetails } from '@/services/matchService';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';

const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [matchData, setMatchData] = useState<IMatchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadMatchDetails = async () => {
      try {
        const data = await fetchMatchDetails(matchId);
        setVideoUrl(
          `${process.env.NEXT_PUBLIC_ACE_STREAM_URL}?id=${encodeURIComponent(data.link)}`
        );
        setMatchData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMatchDetails();
  }, [matchId]);

  console.log('videoUrl12', videoUrl);
  useVideoPlayer({ videoUrl });

  if (loading) {
    return (
      <Container sx={styles.loadingContainer}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={styles.errorContainer}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={styles.mainContainer}>
      <Box sx={styles.header}>
        <IconButton
          onClick={() => router.back()}
          sx={styles.backButton}
          aria-label="go back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" gutterBottom sx={styles.title}>
          {matchData?.homeTeam.name} vs {matchData?.awayTeam.name}
        </Typography>
      </Box>

      <Box sx={styles.videoContainer}>
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} />
        ) : (
          <Typography>No video available</Typography>
        )}
      </Box>
    </Container>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  mainContainer: {
    padding: 2,
    backgroundColor: (theme: Theme) => theme.palette.background.paper,
    borderRadius: 2,
    boxShadow: (theme: Theme) => `0 4px 20px ${theme.palette.grey[200]}`,
    height: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    mb: 2,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    color: (theme: Theme) => theme.palette.text.primary,
  },
  title: {
    textAlign: 'center',
    color: (theme: Theme) => theme.palette.text.primary,
    fontWeight: 600,
    width: '100%',
  },
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 2,
    width: '100%',
    height: 'calc(100vh - 100px)',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
} as const;

export default MatchDetails;
