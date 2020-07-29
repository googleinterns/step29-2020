import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.1.0/core/rfb.js';
import { ServerClient } from './serverclient.js';
import { Session } from './session.js';

/**
 * Represents (in miliseconds) the cadence at which the session is
 * refreshed. 
 * @type {number}
 */
const SESSION_REFRESH_CADENCE_MS = 30000;

/**
 * Represents the noVNC client object; the single connection to the 
 * VNC server.
 * @type {RFB}
 */
let sessionScreen;

/**
 * Represents the current state of the session in terms of whether or not
 * the sessionScreen is connected.
 */
let isConnected = false;

/**
 * Represents the URLSearchParams of the
 * the client is in, holds information such as the
 * session ID and the screen name of the current user.
 * @type {URLSearchParams}
 */
const urlParameters = new URLSearchParams(window.location.search);

/**
 * Represents the ServerClient object responsible for
 * keeping up-to-date with the current session and handles many
 * of the client-to-server interactions, like passing the controller.
 * @type {ServerClient}
 */
const client = new ServerClient(urlParameters);

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function() { main(); }

/**
 * function main() connects the client to a session and begins many of
 * the behind the scenes operations, like caching.
 */
function main() {
  client.getSession().then(session => {
    remoteToSession(session.getIpOfVM(), session.getSessionId());
  }).catch(error => {
    window.alert(error);
  });
}

/**
 * function remoteToSession() uses the noVNC library
 * in order to connect to a session.
 * @param {string} ipOfVM
 * @param {string} sessionId
 */
function remoteToSession(ipOfVM, sessionId) {
  const /** string */ url = `wss://${ipOfVM}:6080`;
  sessionScreen = new RFB(document.getElementById('session-screen'), url,
      { credentials: { password: sessionId } });
  sessionScreen.addEventListener('connect', connectedToServer);
  sessionScreen.addEventListener('disconnect', disconnectedFromServer);
  sessionScreen.viewOnly = true;
  document.getElementById('welcome-message').style.display = 'block';
}

/**
 * function connectedToServer() is called on once the session connects.
 */
function connectedToServer() {
  document.getElementById('session-status').style.display = 'none';
  isConnected = true;
}

/**
 * function disconnectedFromServer() is called on once the session
 * disconnects.
 */
function disconnectedFromServer() {
  document.getElementById('session-status').style.display = 'block';
  isConnected = false;
  let /** number */ setIntervalId = setInterval(() => {
    if(!isConnected) {
      client.getSession().then(session => {
        remoteToSession(session.getIpOfVM(), session.getSessionId());
      }).catch(error => {
        window.alert(error);
      });
    } else {
      clearInterval(setIntervalId);
    }
  }, SESSION_REFRESH_CADENCE_MS);
}

/**
 * function openSessionInfo() displays the div container
 * that has information about the session.
 */
function openSessionInfo() {
  document.getElementById('session-info-div').style.display = 'block'; 
}

/**
 * function closeSessionInfo() closes the div container
 * that has information about the session.
 */
function closeSessionInfo() {
  document.getElementById('session-info-div').style.display = 'none';
}

/**
 * function copyTextToClipboard() copies the text in the input field
 * with the id 'session-id-field' into the clipboard.
 */
function copyTextToClipboard() {
  const /** HTMLElement */ sessionIdElement =
      document.getElementById('session-id-field');
  sessionIdElement.select();
  document.execCommand('copy');
}

module.exports = {
  openSessionInfo: openSessionInfo,
  closeSessionInfo: closeSessionInfo,
  copyTextToClipboard: copyTextToClipboard
};
