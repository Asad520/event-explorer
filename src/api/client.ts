import { Event } from './types';
import { BASE_URL, wait } from './utils';

/**
 * Generic Fetch Wrapper
 * Handles errors and parsing, but keeps it lightweight.
 */
async function client<T>(
  endpoint: string,
  { body, ...customConfig }: RequestInit = {},
): Promise<T> {
  const headers = { 'Content-Type': 'application/json' };

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  // ARTIFICIAL DELAY: Wait 1.5 seconds before making the request
  // This satisfies the "Simulated Latency" requirement.
  await wait(1500);

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // In a real app, you might log this to Sentry/Crashlytics
    console.error('API Request Failed:', error);
    throw error;
  }
}

// 3. EXPORTED API FUNCTIONS
export const getEvents = () => {
  return client<Event[]>('events');
};

export const getEventById = (id: string) => {
  return client<Event>(`events/${id}`);
};
