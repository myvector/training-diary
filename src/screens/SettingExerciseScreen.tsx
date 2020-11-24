import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Inavigation, Istate } from '../type/interfaceAndType';
import { Text, StyleSheet, View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppCircleButton } from '../components/ui/AppCircleButton';
import { Card } from '../components/ui/Card';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderButton } from '../components/ui/AppHeaderButton';
import {
  changeExercise,
  addNewExercise,
  deleteExercise,
} from '../store/reducers/actions/trainingActions';

export const SettingExercise = ({ navigation, route }: Inavigation) => {
  const dispatch = useDispatch();
  const trainingDayId = route.params.id.toString();

  let amountTmp: string[] = [];
  let nameTmp: string[] = [];
  let id: number[] = [];

  const [amount, setAmount] = useState<string[]>([]);
  const [name, setName] = useState<string[]>([]);
  const exerciseList = useSelector(({ trainingData }: Istate) => {
    return trainingData.exercise[trainingDayId];
  });

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title={'save'}
          iconName={'check'}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(changeExercise(trainingDayId, name, amount, id));
            navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  });

  useEffect(() => {
    setAmount(amountTmp);
    setName(nameTmp);
  }, []);

  const changeName = (value: string, i: number) => {
    let nameValue = [...name];
    nameValue[i] = value;
    setName([...nameValue]);
  };

  const changeAmount = (value: string, i: number) => {
    let amountValue = [...amount];
    amountValue[i] = value;
    setAmount([...amountValue]);
  };

  const addExercise = () => {
    dispatch(addNewExercise(route.params.parrentId, trainingDayId));
  };

  const deleteExerciseCard = (idCard: number, i: number) => {
    setName(name.filter((el, item) => item !== i));
    setAmount(amount.filter((el, item) => item !== i));
    id = id.filter((el, item) => item !== i);

    dispatch(deleteExercise(idCard, trainingDayId));
  };

  return (
    <Container>
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {exerciseList.list.map((el, i) => {
          amountTmp.push(String(el.amount));
          nameTmp.push(el.name);
          id.push(el.id);
          return (
            <View
              key={el.id}
              style={{
                ...styles.wrap,
                marginBottom:
                  i === exerciseList.list.length - 1 ||
                  exerciseList.list.length == 1
                    ? 80
                    : 0,
              }}
            >
              <Card style={styles.card}>
                <View>
                  <Text style={styles.title}>Название упражнения</Text>

                  <TextInput
                    style={{ ...styles.input, ...styles.textInput }}
                    value={name[i]}
                    onChange={(e) => changeName(e.nativeEvent.text, i)}
                  ></TextInput>
                </View>
                <View>
                  <Text style={styles.title}>Количество подходов</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    maxLength={2}
                    value={amount[i]}
                    onChange={(e) => changeAmount(e.nativeEvent.text, i)}
                  ></TextInput>
                </View>
              </Card>
              <AppCircleButton onPress={() => deleteExerciseCard(el.id, i)}>
                {
                  <View>
                    <MaterialCommunityIcons
                      name='delete-forever-outline'
                      size={26}
                      color='black'
                    />
                  </View>
                }
              </AppCircleButton>
            </View>
          );
        })}
        {}
      </ScrollView>
      <AppCircleButton
        onPress={() => {
          addExercise();
        }}
        style={styles.addButton}
      >
        <MaterialCommunityIcons name='plus' size={24} color='black' />
      </AppCircleButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'openBold',
    width: 75,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    textAlign: 'left',
  },
  card: {
    width: '100%',
    marginBottom: 25,
    paddingBottom: 10,
  },
  wrap: {
    width: '100%',
    marginBottom: 25,
  },
  title: {
    fontFamily: 'openBold',
    marginTop: 20,
    fontSize: 14,
  },
  addButton: {
    right: 35,
    marginBottom: 30,
    elevation: 6,
  },
  list: {
    width: '100%',
  },
});
