import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { IpopupMenu } from '../type/interfaceAndType';

export const PopupMenu = ({ actions, onPress, color, width }: IpopupMenu) => {
  const [icon, setIcon] = useState<any>(null);

  let onRef = useRef(null);
  const onError = () => {
    console.log('Popup Error');
  };

  const onPressIcon = () => {
    if (icon) {
      const number: any = findNodeHandle(icon);
      UIManager.showPopupMenu(number, actions, onError, onPress);
    }
  };

  useEffect(() => {
    if (!icon) {
      setIcon(onRef.current);
    }
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={onPressIcon}>
        <View>
          <MaterialIcons
            name='more-vert'
            size={26}
            color={color}
            ref={onRef}
            style={{
              width: width || 'auto',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
