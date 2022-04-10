import { getToken, onMessage } from 'firebase/messaging';
import { Howl } from 'howler';
import Cookies from 'js-cookie';
import messaging from './firebase';
export const requestToken = async () => {
  try {
    onMessage(messaging, (payload) => {
      console.log('Received message ', payload);
      if (payload) {
        const notificationTitle = payload.notification?.title;
        const notificationOptions = {
          body: payload.notification?.body,
        };
        console.log(notificationOptions, notificationTitle);
        const sound = new Howl({
          src: [`${process.env.REACT_APP_BASE_URL}/sounds/notification.wav`],
        });
        sound.play();
      }
    });
    const currentToken = await getToken(messaging, {
      vapidKey: 'BGJr-IKnxZi4jszj0i_gXwanmABe7_fQHDvto8cXXnHR1AFWIk9wA06u_79K9zW86bzeUkVo-zdfe7n1zejwyAU',
    });
    Cookies.set('notificationToken', currentToken);
    console.log('current token:' + currentToken);
  } catch (err) {
    console.log(err);
  }
};
