export interface ScrapedData {
  // Define your scraped data structure here
  title: string;
  content: string;
  timestamp: string;
}

export interface ScraperServiceInterface {
  scrape(url: string): Promise<ScrapedData>;
}

export type MatchStatus = 'LIVE' | 'FINISHED' | 'SCHEDULED';

export interface FootballGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  scheduledTime: string;
  status: MatchStatus;
  league: string;
  channel: string;
  link: string;
}

export interface FootballMatch {
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  tournament: string;
  status: MatchStatus;
  time: string;
  channel: string;
  link: string;
}

export interface Team {
  name: string;
  logo: string;
}

export interface IMatchDetails {
  homeTeam: Team;
  awayTeam: Team;
  link: string;
}
