/**
 * An array of who is currently in the session.
 * @type {Object}
 */
let currentAttendees = [];

/**
 * Represents the current session, a Session object.
 * @type {Object}
 */
let session;

/**
 * Represents (in miliseconds) how long users are alerted of any membership
 * changes in the session. 
 * @type {number}
 */
const DISPLAY_CADENCE = 4000;

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
      buildAttendeeDiv(attendee)
      newAttendees.push(attendee);
    }
  }
  for (const attendee of currentAttendees) {
    if (!updatedAttendees.includes(attendee)) {
      removeAttendeeDiv(attendee);
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
      displayMessage = 
          displayMessage.substring(0, displayMessage.length-1) + 
              '. The following people have left the session: ';
      for (const attendee of attendeesThatHaveLeft) {
        displayMessage += `${attendee} `;
      }
    }
    notifyOfChangesToMembership(displayMessage);
  } else if (!newAttendees.length && attendeesThatHaveLeft.length) {
    let /** string */ displayMessage = 
        'The following people have left the session: ';
    for (const attendee of attendeesThatHaveLeft) {
      displayMessage += `${attendee} `;
    }
    notifyOfChangesToMembership(displayMessage);
  }
  currentAttendees = updatedAttendees;
}

/**
 * function notifyOfChangesToMembership() notifies 
 * users the message that's passed in.
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

export { 
  updateSessionInfoAttendees, notifyOfChangesToMembership };
