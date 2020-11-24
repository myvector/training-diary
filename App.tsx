import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import { bootstrap } from './src/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation/AppNavigation';
import { CardList } from './src/components/CardList';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
// import { enableScreens } from 'react-native-screens';
// enableScreens();

export default function App() {
  const [loading, setLoading] = useState(false);

  if (!loading) {
    return (
      <AppLoading
        startAsync={() => bootstrap()}
        onFinish={() => setLoading(true)}
        onError={(e) => console.log(e)}
      />
    );
  }

  // const day = [1, 2, 3, 4, 5, 6];

  // const takeResult = () => {};

  return (
    // <View>
    <OverflowMenuProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    </OverflowMenuProvider>
    // <KeyboardAvoidingView
    //   style={{
    //     // flex: 1,
    //     // flexDirection: 'column',
    //     // justifyContent: 'center', //space-between
    //     // width: '100%',
    //     // height: '100%',
    //     // flexDirection: 'column',
    //     // justifyContent: 'center',
    //     paddingBottom: 180,
    //     // marginBottom: -70,
    //     // paddingTop: -150,
    //     // marginTop: -130,
    //     // marginTop: -65,
    //     //justifyContent: 'flex-end',
    //   }}
    //   // behavior='height'
    //   // enabled
    //   // keyboardVerticalOffset={10}
    // >
    //   <CardList list={day} takeResult={takeResult} />
    // </KeyboardAvoidingView>

    // <ScrollView>
    //   <TouchableWithoutFeedback
    //     onPress={() => {
    //       console.log(1);
    //       Keyboard.dismiss();
    //     }}
    //   >
    //     <TextInput
    //       autoCorrect={false}
    //       // allowFontScaling={false}
    //       // textContentType='telephoneNumber'
    //       autoFocus={true}
    //       placeholder={'Введите число'}
    //       // keyboardType='numeric'
    //       // maxLength={2}
    //       multiline
    //       autoCompleteType={'tel'}
    //       // value={text}
    //       // onChangeText={handlerTextChange}
    //       style={styles.input}
    //     />
    //   </TouchableWithoutFeedback>
    // </ScrollView>
    // <View style={styles.container}>
    //   {/* <Hello compiler='text' framework='text2' /> */}
    //   <Ionicons name='md-checkmark-circle' size={32} color='green' />
    //   <Text style={styles.test}>Open up App.tsx to start working on your </Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    fontFamily: 'openBold',
  },
  input: {
    // borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 20,
    fontSize: 20,
    width: 75,
    backgroundColor: 'red',
  },
});
