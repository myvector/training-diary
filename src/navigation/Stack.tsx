import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { MainScreen } from '../screens/MainScreen';
import { THEME } from '../Theme';
import { CreateDiaryScreen } from '../screens/CreateDiaryScreen';
import { CheckTrainingScreen } from '../screens/CheckTrainingScreen';
import { ExerciseScreen } from '../screens/ExerciseScreen';
import { AddTrainingDay } from '../screens/AddTrainingDayScreen';
import { SettingExercise } from '../screens/SettingExerciseScreen';

const Stack = createStackNavigator();

export const StackNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.MAIN_COLOR,
      },
      headerTintColor: THEME.WHITE_COLOR,
      headerTitleStyle: {
        fontFamily: 'openBold',
        fontSize: 18,
      },
    }}
  >
    <Stack.Screen
      name={'Main'}
      component={MainScreen}
      options={{
        title: 'Дневник тренеровок',
      }}
    />
    <Stack.Screen
      name={'Create'}
      component={CreateDiaryScreen}
      options={{
        title: 'Создать программу',
      }}
    />
    <Stack.Screen
      name={'Check'}
      component={CheckTrainingScreen}
      options={{
        title: 'Выбор упражнения',
      }}
    />
    <Stack.Screen name={'Exercise'} component={ExerciseScreen} />
    <Stack.Screen
      name={'AddDay'}
      component={AddTrainingDay}
      options={{
        title: 'Создать новый день',
      }}
    />
    <Stack.Screen
      name={'SettingExercise'}
      component={SettingExercise}
      options={{
        title: 'Редактировать упражнения',
      }}
    />
  </Stack.Navigator>
);
