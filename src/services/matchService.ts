import { IMatchDetails } from '@/types';

export const fetchMatchDetails = async (
  matchId: string
): Promise<IMatchDetails> => {
  const response = await fetch('/api/scrape', {
    method: 'POST',
    body: JSON.stringify({ url: matchId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch match details');
  }

  return response.json();
};
