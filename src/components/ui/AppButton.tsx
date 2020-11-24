import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';

import { THEME } from '../../Theme';
import { Ibutton } from '../../type/interfaceAndType';

export const AppButton = ({
  children,
  color = THEME.MAIN_COLOR,
  onPress,
  onLongPress,
  style,
}: Ibutton) => {
  return Platform.OS == 'android' ? (
    <TouchableNativeFeedback
      onLongPress={onLongPress}
      style={{
        zIndex: 9,
        position: 'relative',
        borderRadius: 100,
      }}
      onPress={onPress}
    >
      <View
        pointerEvents='box-only'
        style={{ ...styles.button, backgroundColor: color, ...style }}
      >
        <View>{children}</View>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ zIndex: 9, position: 'relative' }}
    >
      <View
        pointerEvents='box-only'
        style={{ ...styles.button, backgroundColor: color, ...style }}
      >
        <View>{children}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: THEME.WHITE_COLOR,
    fontFamily: 'openBold',
    fontSize: 16,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
