import { OneSignal } from 'react-native-onesignal';

export function tagUserEmailCreate(email: string) {
  OneSignal.User.addTag('user_email', email)
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.User.addTag('cart_items_count', itemsCount)
}