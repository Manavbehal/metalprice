import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getMetalBySymbol } from '../../../api/goldApi';
import { MetalDetail, DetailRow } from './detail.model';
import { RootStackParamList } from '../../../navigation/AppNavigator';

async function fetchMetalDetail(symbol: string, name: string): Promise<MetalDetail> {
  const data = await getMetalBySymbol(symbol);
  return {
    symbol,
    name,
    price: data.price,
    open_price: data.open_price,
    high_price: data.high_price,
    low_price: data.low_price,
    change: data.ch,
    change_pct: data.chp,
    currency: data.currency,
    timestamp: data.timestamp,
  };
}

export function getDetailRows(data: MetalDetail): DetailRow[] {
  return [
    { label: 'Price (USD/oz)', value: `$${data.price?.toFixed(2)}` },
    { label: 'Open Price',     value: `$${data.open_price?.toFixed(2)}` },
    { label: 'High Price',     value: `$${data.high_price?.toFixed(2)}` },
    { label: 'Low Price',      value: `$${data.low_price?.toFixed(2)}` },
    { label: 'Change',         value: `${data.change > 0 ? '+' : ''}${data.change?.toFixed(2)}`, highlight: true },
    { label: 'Change %',       value: `${data.change_pct?.toFixed(2)}%` },
    { label: 'Currency',       value: data.currency },
    { label: 'Updated',        value: new Date(data.timestamp * 1000).toLocaleString() },
  ];
}

export function useDetailScreen(
  symbol: string,
  name: string,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Detail'>,
) {
  const [data, setData] = useState<MetalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: name });
    fetchMetalDetail(symbol, name)
      .then(setData)
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false));
  }, [symbol]);

  const rows = data ? getDetailRows(data) : [];

  return { data, loading, error, rows };
}
