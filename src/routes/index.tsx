import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'native-base';
import { useEffect, useState } from 'react';
import {OneSignal, NotificationWillDisplayEvent, OSNotification} from 'react-native-onesignal';

import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

const linking = {
  prefixes: ["igniteshoesapp://", "exp+igniteshoesapp://"],
  config: {
    screens: {
      details: {
        path: "/details/:productId",
        parse: {
          productId: (productId: string) => productId
        }
      },
      cart: {
        path: "/cart"
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const handleNotification = ((notificationReceivedEvent: NotificationWillDisplayEvent) => {
      notificationReceivedEvent.preventDefault()
      
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay", 
      handleNotification
    )

    return () => OneSignal.Notifications.removeEventListener(
      "foregroundWillDisplay", 
      handleNotification
    )
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification 
          data={notification} 
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}