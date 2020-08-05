// import { NoVNCClient } from './novncclient.js';

const rfbScript = document.createElement('script');
rfbScript.setAttribute('type', 'text/javascript');
rfbScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.2.0/core/rfb.js');

import { NoVNCClient } from './novncclient.js';

//import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.2.0/core/rfb.js';


// jest.mock('https://cdn.jsdelivr.net/npm/@novnc/novnc@1.2.0/core/rfb.js', 
//   () => {
//     const mockRFB = {
//       viewOnly: null,
//       disconnect: jest.fn().mockImplementation(() => { return true; })
//     };
//     return jest.fn(() => mockRFB);
// });

test.only('We can check if remoteToSession throws an error', () => {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.remoteToSession('123456.12', 'EEEEE7');
    console.log(novncClient.rfbConnection_);
});

test('We can check if setViewOnly throws an error', () => {
  try {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.setViewOnly(true);
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if disconnect throws an error', () => {
  try {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.disconnect();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

function testConnectCallback() {
  const hello = 'Hello!';
}

function testDisconnectCallback() {
  const goodbye = 'Goodbye!';
}


