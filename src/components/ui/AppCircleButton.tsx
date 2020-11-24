import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from './AppButton';
import { THEME } from '../../Theme';
import { Ibutton } from '../../type/interfaceAndType';

export const AppCircleButton = ({
  onPress,
  children,
  onLongPress,
  style,
}: Ibutton) => {
  return (
    <View
      style={{ ...styles.circleButtonWrap, ...style }}
      pointerEvents='box-none'
    >
      <AppButton
        style={{ ...styles.circleButton }}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {children}
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    width: 50,
    height: 50,
    backgroundColor: THEME.ACCENT_COLOR,
  },
  circleButtonWrap: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 1,
    right: 20,
    zIndex: 19,
    overflow: 'hidden',
    borderStyle: 'solid',
    elevation: 6,
  },
});
