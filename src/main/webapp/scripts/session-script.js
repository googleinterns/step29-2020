/**
 * An array of who is currently in the session.
 * @type {Array}
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
const DISPLAY_CADENCE_MS = 4000;

/**
 * function updateSessionInfoAttendees() adds new attendees to the
 * session to the session info attendee div. Also removes attendees 
 * if they left the session. Alerts users of anyone who has left/entered.
 */
function updateSessionInfoAttendees() {
  const /** Array */ updatedAttendees = session.getListOfAttendees();
  const /** Array */ newAttendees = updatedAttendees.filter(attendee => {
    return !currentAttendees.includes(attendee);
  });
  const /** Array */ attendeesThatHaveLeft = 
      currentAttendees.filter(attendee => {
        return !updatedAttendees.includes(attendee);
  });
  newAttendees.forEach(buildAttendeeDiv);
  attendeesThatHaveLeft.forEach(removeAttendeeDiv);
  if (newAttendees.length !== 0) {
    let /** string */ displayMessage =
        'The following people have joined the session: ';
    newAttendees.forEach(attendee => {
      displayMessage += `${attendee} `;
    });
    if (attendeesThatHaveLeft.length !== 0) {
      displayMessage = 
          displayMessage.substring(0, displayMessage.length-1) + 
              '. The following people have left the session: ';
      attendeesThatHaveLeft.forEach(attendee => {
        displayMessage += `${attendee} `;
      });
    }
    notifyOfChangesToMembership(displayMessage);
  } else if (newAttendees.length === 0 && attendeesThatHaveLeft.length 
        !== 0) {
          let /** string */ displayMessage = 
              'The following people have left the session: ';
          attendeesThatHaveLeft.forEach(attendee => {
            displayMessage += `${attendee} `;
          });
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
  }, DISPLAY_CADENCE_MS);
}

export { 
  updateSessionInfoAttendees, notifyOfChangesToMembership };
