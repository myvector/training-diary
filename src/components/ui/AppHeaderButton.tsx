import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { THEME } from '../../Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AppHeaderButton = (props: any) => {
  return (
    <HeaderButton
      {...props}
      title='save'
      iconSize={24}
      IconComponent={MaterialCommunityIcons}
      color={THEME.WHITE_COLOR}
    />
  );
};
