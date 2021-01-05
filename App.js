import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import DealDetail from './components/DealDetail';
import DealList from './components/DealList';
import SearchBar from './components/SearchBar';
import { StatusBar } from 'expo-status-bar';
import api from './api';

export default function App() {
  const [ deals, setDeals ] = useState([]);
  const [ currentDealId, setCurrentDealId ] = useState(null);
  const [ query, setQuery ] = useState('');

  const titleXPos = new Animated.Value(0);

  useEffect(() => {
    (async () => {
      animateTitle();
      const deals = await api.fetchInitialDeals();
      setDeals(deals);
    })();
  }, []);

  const getCurrentDeal = () => deals.find(deal => deal.key === currentDealId);

  const unsetCurrentDealId = () => setCurrentDealId(null);

  const searchHandle = (text) => setQuery(text);

  const animateTitle = (direction = 1) => {
    const distance = (Dimensions.get('window').width - 180) / 2;
    Animated.timing(titleXPos, {
      toValue: direction * distance,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        animateTitle(direction * -1);
      }
    });
  };

  return (
    <>
      {
        currentDealId ? (
          <View style={styles.main}>
            <DealDetail deal={getCurrentDeal()} onBack={unsetCurrentDealId} />
          </View>
        ) : (
          <>
            {
              deals.length > 0 ? (
                <View style={styles.main}>
                  <SearchBar onChange={searchHandle} />
                  <DealList deals={deals.filter(deal => {
                    return (
                      deal.cause.name.includes(query) ||
                      deal.title.includes(query)
                    );
                  })} onItemPress={setCurrentDealId} />
                </View>
              ) : (
                <Animated.View style={[{ left: titleXPos }, styles.container]}>
                  <Text style={styles.header}>BigSale App!</Text>
                </Animated.View>
              )
            }
          </>
        )
      }
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
