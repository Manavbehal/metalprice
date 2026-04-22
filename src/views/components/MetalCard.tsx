import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { MetalWithPrice } from '../screens/Home/home.model';

const META: Record<string, { color: string; label: string }> = {
  XAU: { color: '#F5A623', label: 'Au' },
  XAG: { color: '#A8A9AD', label: 'Ag' },
  XPT: { color: '#6CB4E4', label: 'Pt' },
  XPD: { color: '#7B68EE', label: 'Pd' },
};

interface Props {
  metal: MetalWithPrice;
  onPress: () => void;
}

export default function MetalCard({ metal, onPress }: Props) {
  const { color, label } = META[metal.symbol];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBadge, { backgroundColor: color + '22', borderColor: color }]}>
        <Text style={[styles.iconLabel, { color }]}>{label}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{metal.name}</Text>
        <Text style={styles.symbol}>{metal.symbol} · USD/oz</Text>
      </View>
      <View style={styles.right}>
        {metal.price === null ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Text style={styles.price}>${metal.price.toLocaleString()}</Text>
        )}
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconLabel: { fontSize: 18, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: '600', color: '#1a1a1a' },
  symbol: { fontSize: 12, color: '#999', marginTop: 3 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  arrow: { fontSize: 22, color: '#ccc' },
});
