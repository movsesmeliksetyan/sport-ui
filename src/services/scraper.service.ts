import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { FootballMatch, IMatchDetails, Team } from '@/types';
import { logger } from '@/utils/logger';

const TARGET_URL = 'https://www.pimpletv.ru';

export class ScraperService {
  async request(url: string = '/'): Promise<AxiosResponse> {
    try {
      return await axios.get(`${TARGET_URL}${url}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });
    } catch (error) {
      logger.error('Failed to scrape football matches:', error);
      throw new Error('Failed to scrape football matches');
    }
  }

  async scrapeFootballMatches(): Promise<FootballMatch[]> {
    try {
      const response = await this.request();

      const $ = cheerio.load(response.data);
      const matches: FootballMatch[] = [];

      $('.match-item').each((_, element) => {
        const $match = $(element);

        // Get match status/time and determine status
        const dateElement = $match.find('.match-item__title-date');
        const timeText = dateElement.text().trim();

        let status: 'LIVE' | 'FINISHED' | 'SCHEDULED' = 'SCHEDULED';
        if (dateElement.hasClass('liveTime')) {
          status = 'LIVE';
        } else if (timeText.includes('Завершен')) {
          status = 'FINISHED';
        }

        // Get tournament name
        const tournament = $match
          .find('.match-item__title-tournament')
          .text()
          .trim();

        // Get home team details
        const homeTeamElement = $match.find('.table-item.home');
        const homeTeam = {
          name: homeTeamElement.find('.table-item__home-name').text().trim(),
          logo: homeTeamElement.find('.table-item__logo img').attr('src') || '',
        };

        // Get away team details
        const awayTeamElement = $match.find('.table-item.away');
        const awayTeam = {
          name: awayTeamElement.find('.table-item__away-name').text().trim(),
          logo: awayTeamElement.find('.table-item__logo img').attr('src') || '',
        };

        // Get channel info
        const channel = $match.find('.match-item__logo-channel').text().trim();

        // Get match link
        let link = $match.attr('href') || '';
        if (link) {
          link = link.replace('/football', '');
        }

        matches.push({
          homeTeam,
          awayTeam,
          tournament,
          status,
          time: timeText,
          channel,
          link,
        });
      });

      return matches;
    } catch (error) {
      logger.error('Failed to scrape football matches:', error);
      throw new Error('Failed to scrape football matches');
    }
  }

  async scrape(url: string): Promise<IMatchDetails> {
    try {
      const response = await this.request(`/football/${url}`);
      const $ = cheerio.load(response.data);
      let homeTeam: Team = { name: '', logo: '' };
      let awayTeam: Team = { name: '', logo: '' };

      $('.match-info__rival').each((_, element) => {
        const $team = $(element);
        if ($team.attr('itemprop') === 'homeTeam') {
          homeTeam = {
            name: $team.find('.match-info__team-name').text().trim(),
            logo: $team.find('.match-info__team-logo img').attr('src') || '',
          };
        }

        if ($team.attr('itemprop') === 'awayTeam') {
          awayTeam = {
            name: $team.find('.match-info__team-name').text().trim(),
            logo: $team.find('.match-info__team-logo img').attr('src') || '',
          };
        }
      });

      let link =
        $('.tabs-content')
          .find('.broadcast-table')
          .find('a.btn-watch')
          .attr('href') || '';

      if (link) {
        link = link.replace('acestream://', '');
      }

      return {
        homeTeam,
        awayTeam,
        link,
      };
    } catch (error) {
      logger.error('Failed to scrape website:', error);
      throw new Error('Failed to scrape website');
    }
  }
}
