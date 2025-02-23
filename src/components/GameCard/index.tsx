'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FootballGame } from '@/types';
import {
  StyledCard,
  StyledCardContent,
  LeagueName,
  TeamContainer,
  TeamName,
  TeamLogo,
  StatusChip,
  GameTime,
} from './styles';

interface GameCardProps {
  game: FootballGame;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`${game.link}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <StyledCardContent>
        <LeagueName gutterBottom>{game.league}</LeagueName>

        <StatusChip label={game.status} size="medium" status={game.status} />

        <TeamContainer>
          <TeamLogo
            src={`https://www.pimpletv.ru/${game.homeTeamLogo}`}
            alt={game.homeTeam}
          />
          <TeamName>{game.homeTeam}</TeamName>
        </TeamContainer>

        <TeamContainer>
          <TeamLogo
            src={`https://www.pimpletv.ru/${game.awayTeamLogo}`}
            alt={game.awayTeam}
          />
          <TeamName>{game.awayTeam}</TeamName>
        </TeamContainer>

        <GameTime>{game.scheduledTime}</GameTime>
      </StyledCardContent>
    </StyledCard>
  );
};
