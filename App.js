import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DealDetail from './components/DealDetail';
import DealList from './components/DealList';
import { StatusBar } from 'expo-status-bar';
import api from './api';

export default function App() {
  const [ deals, setDeals ] = useState([]);
  const [ currentDealId, setCurrentDealId ] = useState(null);

  useEffect(() => {
    (async () => {
      const deals = await api.fetchInitialDeals();
      setDeals(deals);
    })();
  }, []);

  const getCurrentDeal = () => deals.find(deal => deal.key === currentDealId);

  return (
    <>
      {
        currentDealId ? (
          <DealDetail deal={getCurrentDeal()} />
        ) : (
          <View style={styles.container}>
            {
              deals.length > 0 ? (
                <DealList deals={deals} onItemPress={setCurrentDealId} />
              ) : (
                <Text style={styles.header}>BigSale App!</Text>
              )
            }
          </View>
        )
      }
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
