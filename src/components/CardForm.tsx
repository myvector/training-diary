import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from './ui/Card';
import { AppCircleButton } from './ui/AppCircleButton';
import { Ifinish, ItrainingInfor } from '../type/interfaceAndType';

export const CardForm = ({ finishResultData, id, style }: Ifinish) => {
  const [emptyFieldArrayIndex, setEmptyFieldArrayIndex] = useState<number[]>(
    []
  );
  const [multiline, setMultiline] = useState<number[]>([1]);
  const [textInfoArrayValueInput, setTextInfoArrayValueInput] = useState<any>([
    ['', ''],
  ]);
  const [trainingName, setTrainingName] = useState<string>('');
  const [trainingInfo, setTrainingInfo] = useState<ItrainingInfor[]>([]);
  const [finishCreate, setFinishCreate] = useState(false);

  const checkDifferentAnmountItemArray = () =>
    trainingInfo.length !== textInfoArrayValueInput.length ? true : false;

  const checkCreateFinish = (bool: boolean) =>
    setFinishCreate(bool ? trainingName !== '' : bool);

  useEffect(() => {
    finishResultData(trainingInfo, id, finishCreate);
  }, [finishCreate, trainingInfo]);

  const handlerChangeNameTraining = (value: string) => {
    setTrainingName(value);

    if (trainingInfo.length !== 0 && emptyFieldArrayIndex.length == 0) {
      if (multiline.length == trainingInfo.length) {
        setFinishCreate(
          emptyFieldArrayIndex.length
            ? false
            : multiline.length !== 0 && value !== ''
        );
      }
    }
  };

  const handlerAddOptions = () => {
    if (emptyFieldArrayIndex.length || checkDifferentAnmountItemArray()) {
      Alert.alert('Заполните поле');
      return;
    }

    let tmpArray = [...multiline, multiline.length + 1];
    const tmpInfoArray = [...textInfoArrayValueInput];
    tmpInfoArray.push(['', '']);
    setTextInfoArrayValueInput(tmpInfoArray);
    setMultiline(tmpArray);
    checkCreateFinish(false);
  };

  const handleDeleteOptions = () => {
    let tmpMultiline = [...multiline];
    const tmpInfoArray = [...textInfoArrayValueInput];
    const tmpArrTrainingInfo = [...trainingInfo];

    if (!checkDifferentAnmountItemArray()) {
      tmpArrTrainingInfo.pop();
    }
    tmpMultiline.pop();
    tmpInfoArray.pop();

    const resultDeleteIndexArrayEmptyField = tmpMultiline.length
      ? checkEmptyFieldDuringDelete(tmpMultiline)
      : lastItemResetEmptyArrayIndex();
    return new Promise((resolve, reject) => {
      setMultiline(tmpMultiline);
      setTextInfoArrayValueInput(tmpInfoArray);
      setTrainingInfo(tmpArrTrainingInfo);
      checkCreateFinish(resultDeleteIndexArrayEmptyField ? false : true);
      resolve();
    });
  };
  const checkEmptyFieldDuringDelete = (array: number[]) => {
    const result = emptyFieldArrayIndex.some((index) => array[index]);
    if (result) {
      const arrayIndex = [...emptyFieldArrayIndex];

      if (array[array.length - 1] == arrayIndex[arrayIndex.length - 1]) {
        arrayIndex.pop();
      }
      setEmptyFieldArrayIndex([...arrayIndex]);
    } else {
      setEmptyFieldArrayIndex([]);
    }
    return result;
  };

  const lastItemResetEmptyArrayIndex = () => {
    setEmptyFieldArrayIndex([]);
    return true;
  };

  const changeKeyInTrainingInfoItem = (value: string, i: number) => {
    changeArrayInfoText(value, i, 1);
  };

  const changeValueInTrainingInfoItem = (value: string, i: number) => {
    changeArrayInfoText(value, i, 0);
  };

  const changeArrayInfoText = (value: string, i: number, key: number) => {
    const textTmpArray = [...textInfoArrayValueInput];
    const itemTmp = [...textTmpArray[i]];
    const validItemTmp = key ? [value, itemTmp[key]] : [itemTmp[key], value];
    textTmpArray[i] = [...validItemTmp];
    setTextInfoArrayValueInput(textTmpArray);
  };

  const addValue = (i: number) => {
    checkCreateFinish(false);
    if (
      textInfoArrayValueInput[i] == void 0 ||
      textInfoArrayValueInput[i][0] == '' ||
      textInfoArrayValueInput[i][1] == ''
    ) {
      if (!emptyFieldArrayIndex.some((index) => index == i)) {
        const sortArray = [...emptyFieldArrayIndex, i];
        setEmptyFieldArrayIndex([...sortArray.sort((a, b) => a - b)]);
      }
      return;
    }

    const dataArrayInfo = [...trainingInfo];

    const amountEmpty =
      textInfoArrayValueInput[i][1] == '' ? 1 : textInfoArrayValueInput[i][1];
    const amountResult = parseInt(amountEmpty);

    dataArrayInfo[i] = {
      nameTrainingDay: trainingName,
      amount: isNaN(amountResult) ? 1 : amountResult,
      nameExercise: textInfoArrayValueInput[i][0],
    };

    const result = checkExistIndexInArray(emptyFieldArrayIndex, i);

    if (result.result) {
      const deleteElemNotEmpty = [...emptyFieldArrayIndex];
      deleteElemNotEmpty.splice(result.index, 1);

      setEmptyFieldArrayIndex([...deleteElemNotEmpty]);
      setTrainingInfo(dataArrayInfo);
      checkCreateFinish(deleteElemNotEmpty.length ? false : true);
    } else {
      setTrainingInfo(dataArrayInfo);
      checkCreateFinish(emptyFieldArrayIndex.length ? false : true);
    }
  };

  const checkExistIndexInArray = (array: number[], i: number) => {
    let result: any = { result: false };
    for (let j = 0; j < array.length; j++) {
      if (array[j] == i) {
        result.index = j;
        result.result = true;
      }
    }
    return result;
  };

  return (
    <>
      <View style={{ width: '100%', ...style }}>
        <Card style={styles.card}>
          <Text style={styles.subTitle}>
            Название дня тренеровки, пример (тренеровка рук)
          </Text>
          <TextInput
            value={trainingName}
            style={{
              ...styles.input,
              ...styles.textInput,
              ...styles.subInput,
            }}
            onChangeText={handlerChangeNameTraining}
          ></TextInput>
          {multiline.map((el, i) => (
            <View style={styles.wrapSubTitle} key={i}>
              <View>
                <Text style={styles.subTitle}>Название упражнения</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    ...styles.textInput,
                    ...styles.subInput,
                  }}
                  value={textInfoArrayValueInput[i][0]}
                  onChangeText={(e) => changeKeyInTrainingInfoItem(e, i)}
                  onBlur={() => {
                    addValue(i);
                  }}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.subTitle}>Количество подходов</Text>
                <TextInput
                  autoCorrect={false}
                  keyboardType='numeric'
                  maxLength={2}
                  style={{
                    ...styles.input,
                    ...styles.subInput,
                    textAlign: 'center',
                  }}
                  value={textInfoArrayValueInput[i][1]}
                  onChangeText={(e) => changeValueInTrainingInfoItem(e, i)}
                  onBlur={(e) => {
                    addValue(i);
                  }}
                ></TextInput>
              </View>
            </View>
          ))}
          {}
        </Card>
        <AppCircleButton
          onLongPress={handleDeleteOptions}
          onPress={handlerAddOptions}
        >
          <MaterialCommunityIcons name='plus' size={24} color='black' />
        </AppCircleButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
  },
  subTitle: {
    fontFamily: 'open',
    fontSize: 12,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'openBold',
    width: 75,
    textAlign: 'center',
  },
  subInput: { width: Dimensions.get('window').width > 360 ? 150 : 120 },
  textInput: {
    textAlign: 'auto',
    paddingLeft: 5,
  },
  wrapSubTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
