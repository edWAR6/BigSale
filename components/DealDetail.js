import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { formatPrice } from '../utils';

export default DealDetail = ({deal}) => {
  return (
    <View style={styles.deal}>
      <Image style={styles.image} source={{ uri: Object.values(deal.media)[0] }} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.cause}>{deal.cause.name}</Text>
          <Text style={styles.price}>{formatPrice(deal.price)}</Text>
        </View>
      </View>
      <Text>...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 50,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
});
