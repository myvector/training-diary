import React from 'react';
import { StyleSheet } from 'react-native';
import { CardForm } from './CardForm';
import { ItrainingInfor, IcardList } from '../type/interfaceAndType';

export const CardList = ({ list, takeResult }: IcardList) => {
  const handlerResultData = (
    result: ItrainingInfor[],
    id: number,
    readiness?: boolean
  ) => {
    takeResult(result, id, readiness);
  };

  const zeroViewList = list ? list : [];

  return (
    <>
      {zeroViewList.map((index) => {
        return (
          <CardForm
            key={index}
            finishResultData={handlerResultData}
            id={index}
            style={
              index === list.length - 1 || list.length == 1
                ? { marginBottom: 80 }
                : {}
            }
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
  },
});
