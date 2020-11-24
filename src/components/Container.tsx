import React from 'react';
import { Ichild } from '../type/interfaceAndType';
import { View, StyleSheet } from 'react-native';
import { THEME } from '../Theme';

export const Container = ({ children, style }: Ichild) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
    alignItems: 'center',
    paddingBottom: 15,
  },
});
