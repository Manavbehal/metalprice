import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { useDetailScreen } from './detail.controller';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { data, loading, error, rows } = useDetailScreen(route.params.symbol, route.params.name, navigation);

  if (loading) return <ActivityIndicator style={styles.center} size="large" color="#F5A623" />;
  if (error || !data) return <Text style={styles.center}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.price}>${data.price?.toFixed(2)}</Text>
      <Text style={styles.sub}>per troy ounce · USD</Text>
      <View style={styles.table}>
        {rows.map(row => (
          <View key={row.label} style={styles.row}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={[styles.value, row.highlight && { color: data.change >= 0 ? '#2e7d32' : '#c62828' }]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center:    { flex: 1, textAlign: 'center', marginTop: 40, alignSelf: 'center' },
  container: { padding: 20, alignItems: 'center' },
  price:     { fontSize: 48, fontWeight: '700', color: '#F5A623', marginTop: 16 },
  sub:       { fontSize: 14, color: '#888', marginBottom: 24 },
  table:     { width: '100%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  row:       { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee' },
  label:     { fontSize: 15, color: '#555' },
  value:     { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
});
