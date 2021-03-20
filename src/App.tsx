import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Hello, Tinsports!</Text>
    </View>
  );
};

export default App;
