import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../components/ui/Card';
import { Inavigation, Istate } from '../type/interfaceAndType';
import { Container } from '../components/Container';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { THEME } from '../Theme';
import { useSelector } from 'react-redux';
import {
  changeTrainingDayName,
  deleteTrainingDay,
} from '../store/reducers/actions/trainingActions';
import { SettingCard } from '../components/SettingCard';
import { AppCircleButton } from '../components/ui/AppCircleButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CheckTrainingScreen = ({ navigation, route }: Inavigation) => {
  const parrentId = route.params.toString();

  const trainingList = useSelector(({ trainingData }: Istate) => {
    return trainingData.trainingDay[parrentId].list;
  });

  const exerciseList = useSelector(({ trainingData }: Istate) => {
    return trainingData.exercise;
  });

  const handlerCheck = (
    trainingDayId: string,
    exerciseId: string,
    amount: number,
    name: string
  ) => {
    navigation.navigate('Exercise', {
      id: exerciseId,
      amount: amount,
      name: name,
      mapId: {
        shemeId: parrentId,
        trainingDayId,
        exerciseId,
      },
    });
  };

  const addNewCardTrainingDay = () => {
    navigation.navigate('AddDay', parrentId);
  };

  return (
    <Container>
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {trainingList.map(({ name, id }, i: number) => {
          return (
            <Card
              style={{
                paddingHorizontal: 0,
                marginBottom:
                  i === trainingList.length - 1 || trainingList.length == 1
                    ? 80
                    : 0,
              }}
              key={i}
            >
              <View style={styles.border}></View>
              <View style={styles.innerCard}>
                <View style={styles.innerTitle}>
                  <Text style={styles.title}>{name}</Text>
                  <SettingCard
                    id={id}
                    name={name}
                    change={changeTrainingDayName}
                    action={[
                      'Изменить название',
                      'Упаравление упражнениями',
                      'Удалить',
                    ]}
                    pressAction={[null, deleteTrainingDay]}
                    parrentId={parrentId}
                    index={i}
                    navigation={navigation.navigate}
                  />
                </View>
                <ScrollView
                  snapToStart={true}
                  horizontal={true}
                  contentContainerStyle={{
                    width: `${100 * exerciseList[id].list.length}%`,
                  }}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={250}
                  decelerationRate='fast'
                  pagingEnabled
                >
                  {exerciseList[id].list.map((obj, i: number) => {
                    return (
                      <View style={styles.case} key={obj.id}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            handlerCheck(
                              String(id),
                              String(obj.id),
                              obj.amount,
                              obj.name
                            );
                          }}
                        >
                          <View style={styles.training}>
                            <Text style={styles.textItem}>{obj.name}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </Card>
          );
        })}
      </ScrollView>
      <AppCircleButton onPress={addNewCardTrainingDay} style={styles.addButton}>
        <MaterialCommunityIcons name='plus' size={24} color='black' />
      </AppCircleButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
  },
  innerCard: {
    paddingHorizontal: 15,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  case: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'open',
  },
  border: {
    backgroundColor: THEME.LIGHT_BLUE_COLOR,
    height: 15,
    width: '100%',
  },
  title: {
    fontFamily: 'openBold',
    fontSize: 18,
    marginVertical: 40,
  },
  innerTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  training: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: THEME.DARK_BLUE_COLOR,
    width: '96%',
    height: 100,
    marginHorizontal: '2%',
    justifyContent: 'center',
  },
  addButton: {
    marginBottom: 30,
    elevation: 6,
  },
});
