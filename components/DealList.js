import { FlatList, StyleSheet, Text, View } from 'react-native';

import DealItem from './DealItem';
import React from 'react';

export default DealList = ({deals, onItemPress}) => {
  return (
    <View style={styles.list}>
      <FlatList data={deals} renderItem={({item}) =>
        <DealItem deal={item} onPress={onItemPress} />
      } keyExtractor={item => item.key} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
  },
});
