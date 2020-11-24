import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ImodalWrap } from '../../type/interfaceAndType';
import { THEME } from '../../Theme';

export const ModalWrap = ({
  show,
  modalVisible,
  children,
  save,
  backColor,
}: ImodalWrap) => {
  const cancel = () => {
    show();
  };

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Изменения не сохранятся!');
        }}
      >
        <View
          style={{
            ...styles.centeredView,
            backgroundColor: backColor ? backColor : 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View style={styles.modalView}>
            {children}
            <TextInput style={styles.modalText}></TextInput>
            <View style={styles.wrapButton}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  ...styles.openButton,
                  backgroundColor: THEME.GREY_COLOR,
                }}
                onPress={cancel}
              >
                <Text style={styles.textStyle}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.openButton}
                onPress={save}
              >
                <Text style={styles.textStyle}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'openBold',
    width: '100%',

    textAlign: 'auto',
    paddingLeft: 5,
  },
  openButton: {
    width: 100,
    backgroundColor: THEME.LIGHT_BLUE_COLOR,
    borderRadius: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'openBold',
    height: 40,
    lineHeight: 40,
    color: THEME.WHITE_COLOR,
  },
  wrapButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
