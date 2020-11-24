import React, { useEffect } from 'react';
import { StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useKeepAwake } from 'expo-keep-awake';

import { Container } from '../components/Container';
import { HeaderTraining } from '../components/HeaderTraining';
import { Inavigation, IitemListChange, Istate } from '../type/interfaceAndType';
import { CardExercise } from '../components/CardExercise';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderButton } from '../components/ui/AppHeaderButton';
import {
  sendExerciseResult,
  loadHistory,
  clearHistory,
  addApproach,
  deleteApproach,
  changeApproachWeightAmount,
} from '../store/reducers/actions/trainingActions';
import { AppCircleButton } from '../components/ui/AppCircleButton';

export const ExerciseScreen = ({ navigation, route }: Inavigation) => {
  const dispatch = useDispatch();
  const mapId = route.params.mapId;
  const amount = route.params.amount;

  const history = useSelector(({ trainingData }: Istate) => {
    return trainingData.history;
  });

  const historyId = useSelector(({ trainingData }: Istate) => {
    return trainingData.historyId;
  });

  const approaches = useSelector(({ trainingData }: Istate) => {
    return trainingData.approaches;
  });

  navigation.setOptions({
    title: route.params.name,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title={'save'}
          iconName={'check'}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(
              sendExerciseResult(
                approaches.map((el, i: number) => ({ ...el, i: i + 1 })), // выравниваем номер i
                mapId.shemeId,
                mapId.trainingDayId,
                mapId.exerciseId
              )
            );
            navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  });

  useKeepAwake();

  useEffect(() => {
    dispatch(
      loadHistory(mapId.shemeId, mapId.trainingDayId, mapId.exerciseId, amount)
    );

    return () => {
      dispatch(clearHistory());
    };
  }, []);

  const removeItem = (id: number) => {
    let tmpHistory = [],
      tmpApproaches = [],
      j = 1;

    for (let i = 0; i < history.length; i++) {
      if (history[i].id !== id) {
        tmpHistory.push({ ...history[i], i: j });
        tmpApproaches.push({ ...approaches[i], i: j });
        j++;
      }
    }

    dispatch(
      deleteApproach(
        id,
        historyId,
        mapId.exerciseId,
        mapId.trainingDayId,
        tmpHistory,
        tmpApproaches
      )
    );
  };

  const handlerAddApproach = () => {
    dispatch(
      addApproach(mapId.trainingDayId, mapId.exerciseId, history, approaches)
    );
  };

  const changeValue = (value: IitemListChange, i: number) => {
    let cardListTmp = [...approaches];
    let cardListItemTmp = { ...cardListTmp[i] };
    let cardListObj = {};
    if (value.type == 'weight') {
      cardListObj = { ...cardListItemTmp, weight: value.value };
    } else if (value.type == 'amount') {
      cardListObj = { ...cardListItemTmp, amount: value.value };
    }

    cardListTmp[i] = {
      ...cardListTmp[i],
      ...cardListObj,
      date: new Date().toUTCString(),
    };

    dispatch(changeApproachWeightAmount(cardListTmp));
  };

  return (
    <Container style={{ paddingHorizontal: 10 }}>
      <HeaderTraining />
      <ScrollView
        style={{ width: '100%', flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {history.map((el: any, i: number) => {
          return (
            <CardExercise
              id={el.id}
              key={el.id}
              iteration={i + 1}
              margin={i === history.length - 1 || history.length == 1 ? 80 : 10}
              history={
                history[i]
                  ? { weight: history[i].weight, amount: history[i].amount }
                  : { weight: '0', amount: '0' }
              }
              change={changeValue}
              removeItem={removeItem}
            />
          );
        })}
      </ScrollView>
      <AppCircleButton onPress={handlerAddApproach} style={styles.addButton}>
        <MaterialCommunityIcons name='plus' size={24} color='black' />
      </AppCircleButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginBottom: 30,
    right: 35,
    elevation: 6,
  },
});
