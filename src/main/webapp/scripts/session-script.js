// RFB holds the API to connect and communicate with a VNC server   
import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.1.0/core/rfb.js';
import { SessionCache } from '../scripts/sessioncache';
import { Session } from '../scripts/session'

/**
 * Represents (in miliseconds) the cadence at which the client is 
 * refreshed. 
 * @type {number}
 */
const REFRESH_CADENCE_MS = 30000;

/**
 * Represents a cache of the session, keeps in contact with server  
 * about the current session.
 * @type {Object}
 */
let sessionCache;

/**
 * Represents the current session, a Session object.
 * @type {Object}
 */
let session;

/**
 * Represents the noVNC client object; the single connection to the 
 * VNC server.
 * @type {Object}
 */
let sessionScreen;

/**
 * Represents the URLSearchParams of the
 * the client is in, holds information such as the
 * session ID and the screen name of the current user.
 * @type {Object}
 */
const urlParameters = new URLSearchParams(window.location.search);

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
  sessionCache = new SessionCache(urlParameters);
  sessionCache.start();
  sessionCache.getSession().then(sessionObject => {
    session = sessionObject;
  });
  remoteToSession(session.getIpOfVM());
  refresh();
}

/**
 * function remoteToSession() uses the noVNC library
 * in order to connect to a session.
 * @param {string} ipOfVM required to connect to a session
 */
function remoteToSession(ipOfVM) {
  const /** string */ url = `wss://${ipOfVM}:6080`;
  sessionScreen = new RFB(document.getElementById('session-screen'), url,
      { credentials: { password: 'session' } });
  sessionScreen.addEventListener('connect', connectedToServer);
  sessionScreen.addEventListener('disconnect', disconnectedFromServer);
  sessionScreen.viewOnly = true;
  document.getElementById('welcome-message').style.display = 'block';
}

/**
 * function refresh() refreshes information client side, 
 * given how updated the server is with changes. 
 * Checks for new attendees and for whoever the controller is.
 */
function refresh() {
  sessionCache.getSession().then(sessionObject => {
    session = sessionObject;
  });
  updateSessionInfoAttendees();
  updateController();
  setTimeout(() => {
    refresh();
  }, REFRESH_CADENCE_MS);
}

/**
 * function updateSessionInfoAttendees() adds new attendees to the
 * session to the session info attendee div. Also removes attendees 
 * if they left the session. Alerts users of anyone who has left/entered.
 */
function updateSessionInfoAttendees() {
  throw new Error('Unimplemented');
}

/**
 * function updateController() checks to see if the current user should
 * be the controller of their party, changing session screen privilege
 * and updating user interface.
 */
function updateController() {
  const /** HTMLElement */ sessionInfoAttendeesDiv =
      document.getElementById('session-info-attendees');
  const /** NodeListOf<HTMLSpanElement> */ controllerToggleList = 
      sessionInfoAttendeesDiv.querySelectorAll('span');
  if (urlParameters.get('name') === 
    session.getScreenNameOfController()) {
      sessionScreen.viewOnly = false;
    }
  controllerToggleList.forEach(function(individualSpanElement) {
    individualSpanElement.style.backgroundColor = '#fff';
  });
  sessionInfoAttendeesDiv.querySelector(`#${session.
      getScreenNameOfController()}`)
          .parentElement.querySelector('span').style.
              backgroundColor = '#fd5d00';
}

/**
 * function openSessionInfo() displays the div container
 * that has information about the session.
 */
function openSessionInfo() {
  document.getElementById('session-info-div').style.display = 'block'; 
}

/**
 * function closeDisplay changes the display of the parent of the element
 * passed in to 'none'.
 */
function closeDisplay(element) {
  document.getElementById(element.parentNode.id).style.display = 'none';
}

/**
 * function copyTextToClipboard() copies the text of the element passed
 * in into the clipboard.
 */
function copyTextToClipboard(element) {
  element.select();
  document.execCommand('copy');
}

/**
 * function connectedToServer() is called on once the session connects.
 */
function connectedToServer() {
  throw new Error('Unimplemented');
}

/**
 * function disconnectedFromServer() is called on once the session
 * disconnects.
 */
function disconnectedFromServer() {
  throw new Error('Unimplemented');
}

export { openSessionInfo, closeDisplay, copyTextToClipboard,  
  updateController, updateSessionInfoAttendees, remoteToSession, 
  connectedToServer, disconnectedFromServer };
