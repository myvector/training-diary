import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Ichild } from '../../type/interfaceAndType';
import { THEME } from '../../Theme';

export const Card = ({ children, style, onPress }: Ichild) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export const CardTouch = ({ children, style, onPress }: Ichild) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      style={{ width: '100%', backgroundColor: 'red', flex: 1 }}
    >
      <View style={{ ...styles.card, ...style }}>{children}</View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingBottom: 30,
    borderColor: THEME.BORDER_COLOR,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
  },
});
