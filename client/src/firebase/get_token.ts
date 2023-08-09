import { setNotificationToken } from 'api/notifications';
import { getToken, onMessage } from 'firebase/messaging';
import Cookies from 'js-cookie';
import messaging from './firebase';
export const requestToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: 'BGJr-IKnxZi4jszj0i_gXwanmABe7_fQHDvto8cXXnHR1AFWIk9wA06u_79K9zW86bzeUkVo-zdfe7n1zejwyAU',
    });
    Cookies.set('notificationToken', currentToken);
    console.log('current token:' + currentToken);
    await setNotificationToken(currentToken);
  } catch (err) {
    console.log(err);
  }
};
