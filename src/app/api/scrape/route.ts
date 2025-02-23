import { NextResponse } from 'next/server';
import { ScraperService } from '@/services/scraper.service';
import { logger } from '@/utils/logger';

const scraperService = new ScraperService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const data = await scraperService.scrape(url);
    return NextResponse.json(data);
  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape website' },
      { status: 500 }
    );
  }
}
