const API_KEY = 'goldapi-e8c8bb35c9ec3de1653c9ce6c7741510-io';
const BASE_URL = 'https://www.goldapi.io/api';

export async function getMetalBySymbol(symbol: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/${symbol}/USD`, {
    headers: { 'x-access-token': API_KEY },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
