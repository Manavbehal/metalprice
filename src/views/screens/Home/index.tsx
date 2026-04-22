import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { useMetals } from './home.controller';
import MetalCard from '../../components/MetalCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const { metals, loading } = useMetals();

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#F5A623" /></View>;
  }

  return (
    <FlatList
      data={metals}
      keyExtractor={item => item.symbol}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MetalCard
          metal={item}
          onPress={() => navigation.navigate('Detail', { symbol: item.symbol, name: item.name })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
