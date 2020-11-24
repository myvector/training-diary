import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container } from '../components/Container';
import { CardList } from '../components/CardList';
import { AppCircleButton } from '../components/ui/AppCircleButton';
import {
  ItrainingInfor,
  Inavigation,
  IstateForm,
} from '../type/interfaceAndType';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideButton,
  showButton,
  sendDataResultTrainingDay,
} from '../store/reducers/actions/formDataActions';
import { ScrollView } from 'react-native-gesture-handler';

export const AddTrainingDay = ({ navigation, route }: Inavigation) => {
  const dispatch = useDispatch();
  const buttonShow = useSelector(
    ({ formCreateData }: IstateForm) => formCreateData.buttonShow
  );

  const [resultData, setResultData] = useState<ItrainingInfor[]>([]);

  const takeResult = (
    result: ItrainingInfor[],
    id: number, 
    readiness?: boolean
  ) => {
    if (readiness) {
      setResultData(result);
      dispatch(showButton());
    } else {
      dispatch(hideButton());
    }
  };

  const sendResult = async () => {
    await dispatch(sendDataResultTrainingDay([resultData], route.params));
    await navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior='height'
      keyboardVerticalOffset={20}
    >
      <Container>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <CardList list={[1]} takeResult={takeResult} flatList={true} />
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
    height: '100%',
  },
});
