import React, { useState, useCallback, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from '../components/Container';
import { CardTraining } from '../components/CardAnmountTrainingInWeek';
import { CardList } from '../components/CardList';
import { AppCircleButton } from '../components/ui/AppCircleButton';

import {
  ItrainingInfor,
  Inavigation,
  IstateForm,
} from '../type/interfaceAndType';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import '../database/db';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTrainingDay,
  hideButton,
  showButton,
  saveTmpData,
  sendDataResult,
} from '../store/reducers/actions/formDataActions';

import { loadSheme } from '../store/reducers/actions/trainingActions';
import { ScrollView } from 'react-native-gesture-handler';

export const CreateDiaryScreen = ({ navigation }: Inavigation) => {
  const dispatch = useDispatch();
  const resultDataStore = useSelector(
    ({ formCreateData }: IstateForm) => formCreateData.resultData
  );

  const day = useSelector(
    ({ formCreateData }: IstateForm) => formCreateData.day
  );

  const buttonShow = useSelector(
    ({ formCreateData }: IstateForm) => formCreateData.buttonShow
  );

  const formValidResultStore = useSelector(
    ({ formCreateData }: IstateForm) => formCreateData.checkFormValid
  );
  const [title, useTitle] = useState('');
  let checkFormValid: boolean[] = [...formValidResultStore];
  let resultData: ItrainingInfor[][] = [...resultDataStore];

  const changeResultValid = (array: boolean[], bool: boolean, id: number) => {
    array = [...checkFormValid];

    if (array[id] !== bool) {
      array[id] = bool;
      checkFormValid = [...array];
      dispatch(saveTmpData(array, resultData));
    }
    return array;
  };

  const noRepeatUpDataButtonFalse = (
    array: boolean[],
    resultData: ItrainingInfor[][]
  ) => {
    if (buttonShow) {
      dispatch(saveTmpData(array, resultData, false));
    }
  };

  const noRepeatUpDataButtonTrue = (
    array: boolean[],
    resultData: ItrainingInfor[][]
  ) => {
    if (!buttonShow) {
      dispatch(saveTmpData(array, resultData, true));
    }
  };

  const takeResult = (
    result: ItrainingInfor[],
    id: number,
    readiness?: boolean
  ) => {
    let tmpResult = [...resultData];
    tmpResult[id] = [...result];
    resultData = [...tmpResult];

    let formValidResult: boolean[] = [...checkFormValid];
    if (readiness) {
      formValidResult = [...changeResultValid(formValidResult, true, id)];
    } else {
      changeResultValid(formValidResult, false, id);
      if (buttonShow) {
        dispatch(hideButton());
      }
      return;
    }

    const resultValid = formValidResult.every((el) => el == true);

    if (resultValid) {
      noRepeatUpDataButtonTrue(formValidResult, resultData);
    } else {
      noRepeatUpDataButtonFalse(formValidResult, resultData);
    }
  };

  const handlerChangeTrainingDay = (text: string) => {
    dispatch(
      changeTrainingDay(text, resultData, buttonShow, formValidResultStore)
    );
  };

  useEffect(() => {
    return () => {
      dispatch(
        changeTrainingDay('0', resultData, buttonShow, formValidResultStore)
      );
    };
  }, []);

  const sendResult = async () => {

    await dispatch(sendDataResult(resultData, title));
    await dispatch(loadSheme());
    await navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior='height'
      // enabled
      keyboardVerticalOffset={20}
    >
      <Container>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <CardTraining
            changeList={handlerChangeTrainingDay}
            titleSave={useTitle}
          />
          <CardList list={day} takeResult={takeResult} />
        </ScrollView>

        {buttonShow ? (
          <AppCircleButton style={styles.button} onPress={sendResult}>
            <MaterialCommunityIcons name='check' size={24} color='black' />
          </AppCircleButton>
        ) : null}
        {}
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    right: 35,
    bottom: 30,
    elevation: 6,
  },
  scroll: {
    width: '100%',
    flex: 1,
  },
});
