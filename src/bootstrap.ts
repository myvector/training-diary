import * as Font from 'expo-font';
import { inintialDB } from './database/db';

export const bootstrap = async () => {
  try {
    void (await Font.loadAsync({
      open: require('../assets/font/OpenSans-Regular.ttf'),
      openBold: require('../assets/font/OpenSans-Bold.ttf'),
    }));
    await inintialDB();
  } catch (error) {
    console.log('Error...', error);
  }
};
