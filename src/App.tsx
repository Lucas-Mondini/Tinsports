import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const src: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Hello, Tinsports!</Text>
    </View>
  );
};

export default src;
