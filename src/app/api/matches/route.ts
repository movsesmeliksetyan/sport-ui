import { NextResponse } from 'next/server';
import { ScraperService } from '@/services/scraper.service';
import { logger } from '@/utils/logger';

const scraperService = new ScraperService();

export async function GET() {
  try {
    const matches = await scraperService.scrapeFootballMatches();
    return NextResponse.json(matches);
  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch football matches' },
      { status: 500 }
    );
  }
}
