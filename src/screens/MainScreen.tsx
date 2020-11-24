import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Inavigation, Istate } from '../type/interfaceAndType';
import { Card, CardTouch } from '../components/ui/Card';
import { Container } from '../components/Container';
import { THEME } from '../Theme';
import { AppButton } from '../components/ui/AppButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import {
  loadSheme,
  deleteSheme,
} from '../store/reducers/actions/trainingActions';

import { changeNameSheme } from '../store/reducers/actions/trainingActions';
import { SettingCard } from '../components/SettingCard';



export const MainScreen = ({ navigation }: Inavigation) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const shemeList = useSelector(
    ({ trainingData }: Istate) => trainingData.sheme
  );

  useEffect(() => {
    dispatch(loadSheme());
  }, [dispatch]);


  const checkTrainingSheme = (id: number) => {
    navigation.navigate('Check', id);
  };

  return (
    <Container>
      <StatusBar
        translucent={true}
        backgroundColor={'rgba(0, 0, 0, 0.5)'}
        barStyle={modalVisible ? 'dark-content' : 'light-content'}
      />

      <ScrollView
        style={styles.scrolView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {shemeList.map(({ name, id }) => {
          return (
            <CardTouch
              key={id}
              style={styles.sheme}
              onPress={() => checkTrainingSheme(id)}
            >
              <View style={styles.active}></View>
              <View style={styles.wrapSheme}>
                <Text style={styles.shemeTitle}>{name}</Text>
                <SettingCard
                  id={id}
                  name={name}
                  change={changeNameSheme}
                  action={['Изменить название', 'Удалить']}
                  pressAction={[null, deleteSheme]}
                />
              </View>
            </CardTouch>
          );
        })}
        <Card>
          <Text style={styles.title}>Создать тренеровочную схему</Text>
          <View style={styles.wrapButton}>
            <AppButton
              color={THEME.ACCENT_COLOR}
              colorText={THEME.BLACK_COLOR}
              onPress={() => navigation.navigate('Create')}
            >
              <View style={styles.wrapTextButton}>
                <Text style={styles.textButton}>Создать</Text>
                <MaterialCommunityIcons
                  name='notebook-outline'
                  size={24}
                  color='black'
                />
              </View>
            </AppButton>
          </View>
        </Card>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  scrolView: {
    width: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'openBold',
    fontSize: 18,
    paddingVertical: 36,
    textAlign: 'center',
  },
  wrapButton: {
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textButton: {
    color: THEME.BLACK_COLOR,
    paddingHorizontal: 10,
    fontFamily: 'openBold',
    fontSize: 16,
  },
  wrapTextButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sheme: {
    width: '100%',
    flex: 1,
    height: 110,
    justifyContent: 'center',
    paddingBottom: 0,
    position: 'relative',
    paddingHorizontal: 0,
  },
  shemeTitle: {
    fontFamily: 'openBold',
    textAlign: 'center',
  },
  active: {
    height: 20,
    width: '100%',
    flex: 1,
    position: 'absolute',
    backgroundColor: THEME.ACCENT_COLOR,
    top: 0,
    left: 0,
  },
  wrapSheme: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});
