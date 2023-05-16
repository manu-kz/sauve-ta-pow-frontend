import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';



export default function UiKitScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UI KIT</Text>
      <TouchableOpacity style={styles.buttonLong} activeOpacity={0.8}>
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  buttonLong: {
    width: 273,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#8B9EAB',
    borderRadius: 20,
  },
  textButton: {
    color: '#ffffff',
    fontWeight: '700',
    height: '100%',
  }
});
