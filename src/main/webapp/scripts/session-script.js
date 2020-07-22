// RFB holds the API to connect and communicate with a VNC server   
import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.1.0/core/rfb.js';
import { SessionCache } from './sessioncache';
import { Session } from './session'

/**
 * Represents (in miliseconds) the cadence at which the client is 
 * refreshed. 
 * @type {number}
 */
const REFRESH_CADENCE_MS = 30000;

/**
 * Represents a cache of the session, keeps in contact with server  
 * about the current session.
 * @type {SessionCache}
 */
let sessionCache;

/**
 * Represents the current session, a Session object.
 * @type {Session}
 */
let session;

/**
 * Represents the noVNC client object; the single connection to the 
 * VNC server.
 * @type {RFB}
 */
let sessionScreen;

/**
 * Represents the URLSearchParams of the
 * the client is in, holds information such as the
 * session ID and the screen name of the current user.
 * @type {URLSearchParams}
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
  changeToReadOnly();
  remoteToSession(session.getIpOfVM());
  refresh();
}

/**
 * function changetoReadOnly() changes the two inputs
 * (one on the welcome message) and the other in the session 
 * information div to show the session ID and then changes them
 * to read only.
 */
function changeToReadOnly() {
  const /** HTMLElement */ sessionInfoInput = 
      document.getElementById('session-info-input');
  sessionInfoInput.value = session.getSessionId();
  sessionInfoInput.readOnly = true;
  const /** HTMLElement */ welcomeMessageInput = 
      document.getElementById('welcome-message-input');
  welcomeMessageInput.value = session.getSessionId();
  welcomeMessageInput.readOnly = true;
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
  updateController();
  setTimeout(() => {
    refresh();
  }, REFRESH_CADENCE_MS);
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
 * function closeDisplay() changes the display of the parent of the element
 * passed in to 'none'.
 * @param {HTMLElement} element
 */
function closeDisplay(element) {
  element.parentElement.style.display = 'none';
}

/**
 * function copyTextToClipboard() copies the text of the element passed
 * in into the clipboard.
 * @param {HTMLInputElement} element
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
  updateController, remoteToSession, 
  connectedToServer, disconnectedFromServer, changeToReadOnly };
