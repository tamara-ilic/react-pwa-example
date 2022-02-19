// /src/setupNotifications.js
import { sanity } from './sanity';

async function setupNotifications() {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    // early return if not
    return;
  }

  // Check if the user denied notifications
  if (Notification.permission === 'denied') {
    // early return if so
    return;
  }

  // Wait for the user to give notification permissions
  await new Promise(async (resolve) => {
    if (Notification.permission === 'granted') {
      resolve();
    }

    const result = await Notification.requestPermission();

    if (result === 'granted') {
      resolve();
    }
  });

  const getMabLibCount = async () =>
    sanity.fetch(`count(*[ _type == 'madLib' ])`);

  let previous = await getMabLibCount();
  // setup interval to poll for new mad libs every minute
  setInterval(async () => {
    const current = await getMabLibCount();
    // the the current count is greater than the previous, send a notification
    if (current > previous) {
      previous = current;
      new Notification("There's a new Mad Lib for you to try!");
    }
  }, 60 * 1000);
}

export default setupNotifications;

/*

This code only takes advantage of the Notifications API but does not utilize background sync.
This means the notifications are only sent when the app is open.

There are additional web APIs required in order to make this work while the app isn't open that are not in the scope of this article.

*/