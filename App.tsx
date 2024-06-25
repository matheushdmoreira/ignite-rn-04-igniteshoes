import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Platform, StatusBar } from 'react-native';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { THEME } from './src/theme';

import { Routes } from './src/routes';

import { CartContextProvider } from './src/contexts/CartContext';

import { useEffect } from 'react';
import { Loading } from './src/components/Loading';

const oneSignalAppId = Platform.OS === 'ios' ? "a111ffdd-1599-45a0-bed9-cf41e09f63bf" : "73295791-e1df-403a-8634-a7e3a424301d"
OneSignal.initialize(oneSignalAppId);

OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  useEffect(() => {
    const handleNotificationClick = ((event: NotificationClickEvent):void => {
      const { actionId } = event.result as any

      switch (actionId) {
        case '1':
          console.log('Ver todas')
          break;
        case '2':
          console.log('Ver pedido')
          break;
        default:
          console.log('Nenhuma ação foi clicada')
          break;
      }
    })

    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      
    </NativeBaseProvider>
  );
}