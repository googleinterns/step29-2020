// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * function updateSessionInfoAttendees() adds new attendees to the
 * session to the session info attendee div. Also removes attendees 
 * if they left the session. Alerts users of anyone who has left/entered.
 */
function updateSessionInfoAttendees() {
  const /** Object */ updatedAttendees = session.getListOfAttendees();
  const /** Object */ newAttendees = [];
  const /** Object */ attendeesThatHaveLeft = [];
  for (const attendee of updatedAttendees) {
    if (!currentAttendees.includes(attendee)) {
      exportFunctions.buildAttendeeDiv(attendee)
      newAttendees.push(attendee);
    }
  }
  for (const attendee of currentAttendees) {
    if (!updatedAttendees.includes(attendee)) {
      exportFunctions.removeFromAttendeeDiv(attendee);
      attendeesThatHaveLeft.push(attendee);
    }
  }
  if (newAttendees.length) {
    let /** string */ displayMessage =
        'The following people have joined the session: ';
    for (const attendee of newAttendees) {
      displayMessage += `${attendee} `;
    }
    if (attendeesThatHaveLeft.length) {
      // displayMessage = `${displayMessage.
      //   substring(0, displayMessage.length-1)}. The following people have
      //   left the session: `;
      displayMessage += '. The following people have left the session: ';
      for (const attendee of attendeesThatHaveLeft) {
        displayMessage += `${attendee} `;
      }
    }
    exportFunctions.notifyOfChangesToMembership(displayMessage);
  } else if (!newAttendees.length && attendeesThatHaveLeft.length) {
    let /** string */ displayMessage = 
        'The following people have left the session: ';
    for (const attendee of attendeesThatHaveLeft) {
      displayMessage += `${attendee} `;
    }
    exportFunctions.notifyOfChangesToMembership(displayMessage);
  }
  currentAttendees = updatedAttendees;
}

/**
 * function notifyOfChangesToMembership() notifies 
 * users of anyone who has left/entered.
 * @param {string} displayMessage message to display to users
 */
function notifyOfChangesToMembership(displayMessage) {
  displayMessage = `${displayMessage.
      substring(0, displayMessage.length-1)}.`;
  const alertMembershipDiv = document.getElementById('alert-membership');
  alertMembershipDiv.textContent = displayMessage;
  alertMembershipDiv.className = 'display-message';
  setTimeout(() => { 
    alertMembershipDiv.className = ''; 
  }, DISPLAY_CADENCE);
}

const exportFunctions = {
  buildAttendeeDiv,
  notifyOfChangesToMembership,
  removeFromAttendeeDiv
}

export default exportFunctions;

export { openSessionInfo, copyTextToClipboard, 
  buildAttendeeDiv, removeFromAttendeeDiv,
  updateSessionInfoAttendees, notifyOfChangesToMembership };


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
