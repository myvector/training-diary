import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Card } from './ui/Card';
import { THEME } from '../Theme';
import { IcardExercise } from '../type/interfaceAndType';
import { PopupMenu } from './PopupMenu';

export const CardExercise = ({
  iteration,
  history,
  id,
  change,
  removeItem,
  margin,
}: IcardExercise) => {
  const [weight, setWeight] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const changeValueWeight = (weight: string) => {
    setWeight(weight);
    change({ value: weight, type: 'weight' }, iteration - 1);
  };

  const changeValueAmount = (amount: string) => {
    setAmount(amount);
    change({ value: amount, type: 'amount' }, iteration - 1);
  };

  const deleteItemCard = () => {
    removeItem(id);
  };

  return (
    <Card style={{ ...styles.card, marginBottom: margin }}>
      <View style={styles.innerItemInfo}>
        <Text style={{ ...styles.width, ...styles.textStyle }}>
          {iteration}
        </Text>
        <TextInput
          maxLength={3}
          keyboardType='numeric'
          style={styles.textInput}
          value={weight}
          onChangeText={changeValueWeight}
          placeholder={'kg'}
        />
        <View style={{ ...styles.history, ...styles.width }}>
          <Text
            style={{
              ...styles.textStyle,
              width: '50%',
              color:
                parseInt(amount) > parseInt(history.amount)
                  ? THEME.GREEN_COLOR
                  : THEME.RED_COLOR,
            }}
          >
            {history.amount}
          </Text>
          <View
            style={{
              height: 2,
              width: '50%',
              backgroundColor: THEME.GREY_COLOR,
            }}
          ></View>
          <Text
            style={{
              ...styles.textStyle,
              width: '50%',
              color:
                parseInt(weight) >= parseInt(history.weight)
                  ? THEME.GREEN_COLOR
                  : THEME.RED_COLOR,
            }}
          >
            {history.weight}
          </Text>
        </View>

        <TextInput
          maxLength={3}
          style={styles.textInput}
          value={amount}
          keyboardType='numeric'
          onChangeText={changeValueAmount}
          placeholder={''}
        />
        <View
          style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}
        >
          <PopupMenu
            color={THEME.DARK_GRAY_COLOR}
            actions={['Удалить']}
            width={22}
            onPress={(e: string, i: number | void) => {
              if (e == 'itemSelected' && i == 0) {
                deleteItemCard();
              }
            }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 50,
    fontFamily: 'openBold',
    fontSize: 18,
    textAlign: 'center',
    borderStyle: 'solid',
    borderBottomColor: THEME.GREY_COLOR,
    borderBottomWidth: 2,
    height: 30,
  },
  separator: {
    backgroundColor: THEME.GREY_COLOR,
    width: 2,
    height: '100%',
  },
  card: {
    height: 100,
    paddingHorizontal: 0,
    justifyContent: 'center',
    paddingBottom: 0,
  },
  width: {
    width: 50,
    overflow: 'hidden',
  },
  inputItem: {
    borderStyle: 'solid',
    borderBottomColor: THEME.GREY_COLOR,
    borderBottomWidth: 2,
    height: 30,
  },
  innerItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontFamily: 'openBold',
    fontSize: 18,
    textAlign: 'center',
  },
  history: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
