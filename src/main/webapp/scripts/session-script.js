import { ServerClient } from './serverclient.js';

/**
 * Represents the URLSearchParams the client is in, 
 * holds information such as the session ID and 
 * the screen name of the current user.
 * @type {URLSearchParams}
 */
let urlParameters;

/**
 * Represents the ServerClient object responsible for
 * keeping up-to-date with the current session and handles many
 * of the client-to-server interactions, like changing the controller.
 * @type {ServerClient}
 */
let serverClient;

/**
 * This object represents the two keys that are a part 
 * of the URLSearchParams of the given session. They convey the current
 * screen name of the current user and the session-id they are in.
 * @type {object}
 */
const URL_PARAM_KEY = {
  SCREEN_NAME: 'name',
  SESSION_ID: 'session-id'
};

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
  urlParameters = new URLSearchParams(window.location.search);
  serverClient = new ServerClient(urlParameters);
  addOnClickListenerToElements();
}

/**
 * Adds an onclick event listener to some of the elements on the
 * in-session webpage.
 */
function addOnClickListenerToElements() {
  document.getElementById('session-info-span').addEventListener('click', 
      openSessionInfo);
  document.querySelectorAll('.close').forEach(element => {
    element.addEventListener('click', event => {
      closeParentDisplay(event.target);
    });
  });
  document.querySelectorAll('.session-id-input').forEach(element => {
    element.addEventListener('click', event => {
      copyTextToClipboard(event.target);
    });
  });
}

/**
 * function buildAttendeeDiv() adds the div element containing
 * all the elements representing an attendee to the session info
 * attendees div.
 * @param {string} nameOfAttendee name of attendee to build
 * @param {string} controller name of the controller of the session
 */
function buildAttendeeDiv(nameOfAttendee, controller) {
  const /** HTMLElement */ sessionInfoAttendeesDiv =
      document.getElementById('session-info-attendees');
  const /** HTMLDivElement */ attendeeDiv = document.createElement('div');
  attendeeDiv.className = 'attendee-div'
  const /** HTMLSpanElement */ controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', event => {
    changeControllerTo(event, controller);
  }, /**AddEventListenerOptions=*/false);
  const /** HTMLHeadingElement */ attendeeName =
      document.createElement('h3');
  attendeeName.innerHTML = nameOfAttendee;
  attendeeName.className = 'attendee-name'
  attendeeName.id = nameOfAttendee;
  attendeeDiv.appendChild(controllerToggle);
  attendeeDiv.appendChild(attendeeName);
  sessionInfoAttendeesDiv.appendChild(attendeeDiv);
}

/**
 * If the current controller of the session clicks on the controller 
 * toggle, their controller status is revoked and the server is updated
 * with information on the new controller.
 * @param {MouseEvent} event the event that captures what was clicked on
 * @param {string} controller name of the controller of the session
 */
function changeControllerTo(event, controller) {
  if (urlParameters.get(URL_PARAM_KEY.SCREEN_NAME) === controller) {
    try {
      serverClient.changeControllerTo(/**newControllerName=*/
          event.target.parentElement.querySelector('h3').id);
    } catch (e) {
      window.alert('No contact with the server!');
    }
  }
}
/**
 * function openSessionInfo() displays the div container
 * that has information about the session.
 */
function openSessionInfo() {
  document.getElementById('session-info-div').style.display = 'block'; 
}

/**
 * function closeParentDisplay() changes the display of the 
 * parent of the element passed in to 'none'.
 * @param {HTMLElement} element
 */
function closeParentDisplay(element) {
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

export { openSessionInfo, closeParentDisplay, copyTextToClipboard, 
  addOnClickListenerToElements, buildAttendeeDiv, changeControllerTo };
