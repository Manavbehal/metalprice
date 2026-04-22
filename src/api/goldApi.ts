import Config from 'react-native-config';

const API_KEY = Config.GOLD_API_KEY;
const BASE_URL = Config.GOLD_API_BASE_URL;

export async function getMetalBySymbol(symbol: string): Promise<any> {
  if (!API_KEY) {
    throw new Error('Missing GOLD_API_KEY environment variable');
  }
  if (!BASE_URL) {
    throw new Error('Missing GOLD_API_BASE_URL environment variable');
  }

  const res = await fetch(`${BASE_URL}/${symbol}/USD`, {
    headers: { 'x-access-token': API_KEY },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
