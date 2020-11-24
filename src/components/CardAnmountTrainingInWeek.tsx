import React, { useState } from 'react';
import { Card } from './ui/Card';
import { TextInput } from 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';

export const CardTraining = ({ changeList, titleSave }: any) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const handlerTextChange = (number: string) => {
    setText(number);
  };

  const handlerTitleSave = () => {
    titleSave(title);
  };

  const handlerTitle = (text: string) => {
    setTitle(text);
  };

  const handlerNumber = () => {
    changeList(text);
  };

  return (
    <>
      <Card style={styles.card}>
        <Text style={styles.title}>Название программы тренеровок</Text>
        <TextInput
          autoCorrect={false}
          maxLength={40}
          value={title}
          onEndEditing={handlerTitleSave}
          onChangeText={handlerTitle}
          style={{ ...styles.input, ...styles.name }}
        />
        <Text style={styles.title}>Количество тренеровок в неделлю</Text>
        <TextInput
          autoCorrect={false}
          keyboardType='numeric'
          maxLength={2}
          value={text}
          onEndEditing={handlerNumber}
          onChangeText={handlerTextChange}
          style={styles.input}
        />
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'openBold',
    fontSize: 14,
    marginTop: 20,
  },
  card: {
    width: '100%',
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
  name: {
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
});
