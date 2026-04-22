import { useState, useEffect } from 'react';
import { getMetalBySymbol } from '../../../api/goldApi';
import { METALS, MetalWithPrice } from './home.model';

export function useMetals() {
  const [metals, setMetals] = useState<MetalWithPrice[]>(
    METALS.map(m => ({ ...m, price: null })),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      METALS.map(m =>
        getMetalBySymbol(m.symbol)
          .then(data => ({ ...m, price: data.price as number }))
          .catch(() => ({ ...m, price: null })),
      ),
    )
      .then(setMetals)
      .finally(() => setLoading(false));
  }, []);

  return { metals, loading };
}
