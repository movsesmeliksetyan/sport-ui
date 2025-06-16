import { fetchMatchDetails } from '../matchService';

describe('fetchMatchDetails', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it('sends POST request to /api/scrape with correct body', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ homeTeam: {}, awayTeam: {}, link: 'l' }),
    } as unknown as Response;

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await fetchMatchDetails('some-id');

    expect(global.fetch).toHaveBeenCalledWith('/api/scrape', {
      method: 'POST',
      body: JSON.stringify({ url: 'some-id' }),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(result).toEqual({ homeTeam: {}, awayTeam: {}, link: 'l' });
  });

  it('throws an error when response is not ok', async () => {
    const mockResponse = { ok: false } as Response;
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(fetchMatchDetails('some-id')).rejects.toThrow(
      'Failed to fetch match details'
    );
  });
});
