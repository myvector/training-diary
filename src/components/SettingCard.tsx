import React, { useState } from 'react';
import { PopupMenu } from './PopupMenu';
import { ModalEdit } from './ModalEdit';
import { IsettingCard } from '../type/interfaceAndType';
import { THEME } from '../Theme';
import { useDispatch } from 'react-redux';

export const SettingCard = ({
  id,
  name,
  change, 
  action,
  pressAction,
  parrentId,
  index,
  navigation,
}: IsettingCard) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const show = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <PopupMenu
        color={THEME.DARK_GRAY_COLOR}
        actions={action}
        onPress={(e: string, i: number | void) => {
          if (i !== undefined) {
            let numberMenuOption = parseInt(String(i));

            switch (action[numberMenuOption]) {
              case 'Удалить':
                if (parrentId) {
                  dispatch(pressAction[1](id, parrentId, index));
                } else {
                  dispatch(pressAction[1](id));
                }
                break;
              case 'Изменить название':
                show();
                break;
              case 'Упаравление упражнениями':
                navigation('SettingExercise', { parrentId, id });
                break;
              default:
                break;
            }
          }
        }}
      />
      <ModalEdit
        show={show}
        modalVisible={modalVisible}
        name={name}
        id={id}
        parrentId={parrentId}
        change={change}
        index={index}
      />
    </>
  );
};
