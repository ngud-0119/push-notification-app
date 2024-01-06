self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/path/to/your/icon.png', // Replace with your icon path
  };
  event.waitUntil(
    self.registration.showNotification('Your App Name', options)
  );
});


const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  data: {
    title: 'New Notification',
    body: 'This is a push notification from your server.',
  },
  token: 'DEVICE_REGISTRATION_TOKEN',
};

admin.messaging().send(message)
  .then(response => {
    console.log('Successfully sent message:', response);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });

  self.addEventListener('push', event => {
    const data = event.data.json(); // Assuming the payload is in JSON format
  
    const options = {
      body: data.body,
      icon: '/path/to/your/icon.png',
      data: {
        url: data.link, // Customize the link to open when the notification is clicked
      },
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });


  self.addEventListener('notificationclick', event => {
    const notificationData = event.notification.data;
  
    if (notificationData.url) {
      clients.openWindow(notificationData.url);
    }
  
    event.notification.close();
  });