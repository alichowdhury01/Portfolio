import * as nodemailer from 'nodemailer';
import { exec } from 'child_process';

// Configuration
const wifiInterface = 'wlan0'; // Change this to your Wi-Fi interface name
const targetMacAddress = '00:11:22:33:44:55'; // Change this to the MAC address you want to monitor
const emailRecipient = 'your-email@example.com'; // Change this to your email address

let previousStatus: boolean | null = null; // Previous connection status

// Ping the target device
function pingTargetDevice(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    exec(`ping -c 1 ${targetMacAddress}`, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// Send email notification
function sendEmailNotification(status: boolean): void {
  if (previousStatus === null || status !== previousStatus) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-gmail-username@gmail.com',
        pass: 'your-gmail-password',
      },
    });

    const mailOptions = {
      from: 'your-gmail-username@gmail.com',
      to: emailRecipient,
      subject: 'Wi-Fi Monitoring',
      text: `MAC address ${targetMacAddress} is ${
        status ? 'connected' : 'disconnected'
      } from Wi-Fi.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email notification sent successfully.');
      }
    });

    previousStatus = status;
  }
}

// Monitor the Wi-Fi connection
async function monitorWiFiConnection(): Promise<void> {
  while (true) {
    const isConnected = await pingTargetDevice();
    sendEmailNotification(isConnected);
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay between each iteration (5 seconds in this example)
  }
}

// Start monitoring the Wi-Fi connection
monitorWiFiConnection().catch((error) => {
  console.error('An error occurred:', error);
});
