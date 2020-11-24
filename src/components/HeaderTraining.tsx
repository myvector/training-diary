import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { THEME } from '../Theme';

export const HeaderTraining = () => {
  return (
    <View style={styles.header}>
      <View style={styles.itemHeader}>
        <FontAwesome
          name='sort-numeric-asc'
          size={24}
          color={THEME.GREY_COLOR}
        />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.itemHeader}>
        <MaterialCommunityIcons
          name='weight-kilogram'
          size={24}
          color={THEME.GREY_COLOR}
        />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.itemHeader}>
        <MaterialCommunityIcons
          name='history'
          size={24}
          color={THEME.GREY_COLOR}
        />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.itemHeader}>
        <MaterialCommunityIcons
          name='clipboard-check-outline'
          size={24}
          color={THEME.GREY_COLOR}
        />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.itemHeader}>
        <MaterialCommunityIcons
          name='settings-outline'
          size={24}
          color={THEME.GREY_COLOR}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: 50,
  },
  separator: {
    backgroundColor: THEME.GREY_COLOR,
    width: 2,
    height: '100%',
  },
});
