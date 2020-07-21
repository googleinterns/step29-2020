import * as sessionscript from './session-script';
import { Session } from './session';

const buildAttendeeDivSpy =
    jest.spyOn(sessionscript.sessionScriptSpies, 'buildAttendeeDiv');
const removeAttendeeDivSpy =
    jest.spyOn(sessionscript.sessionScriptSpies, 'removeAttendeeDiv');
const notifyOfChangesToMembershipSpy =
    jest.spyOn(sessionscript.sessionScriptSpies,
        'notifyOfChangesToMembership');

afterEach(() => {    
  jest.clearAllMocks();
});

test(`makes sure notifyOfChangesToMembership is
correctly displaying message`, (done) => {
    const displayMessage = 'How are you ';
    document.body.innerHTML = '';
    const alertMembershipDiv =
        document.createElement('div');
    alertMembershipDiv.id = 'alert-membership';
    document.body.appendChild(alertMembershipDiv);
    sessionscript.notifyOfChangesToMembership(displayMessage);
    setTimeout(() => {
      expect(alertMembershipDiv.textContent).toEqual('How are you.');
      expect(alertMembershipDiv.className).toEqual('display-message');
      done();
    }, 2000);
    setTimeout(() => {
      expect(alertMembershipDiv.className).toEqual('');
      done();
    }, 6000);
});

test(`A new member 
    -updateSessionInfoAttendees`, () => {
      const expectedMessage =
          `The following people have joined the session: ${'Miguel'} `;
      document.body.innerHTML = '';
      const sessionInfoAttendeeDiv =
          document.createElement('div');
      sessionInfoAttendeeDiv.id = 'session-info-attendees';
      document.body.appendChild(sessionInfoAttendeeDiv);
      const alertMembershipDiv =
          document.createElement('div');
      alertMembershipDiv.id = 'alert-membership';
      document.body.appendChild(alertMembershipDiv);
      const sessionSpy = 
          jest.spyOn(Session.prototype, 'getListOfAttendees').
              mockReturnValue(['Jessica', 'Bryan', 'Miguel']);
      sessionscript.updateSessionInfoAttendees();
      expect(notifyOfChangesToMembershipSpy).
          toHaveBeenCalledWith(expectedMessage);
      expect(buildAttendeeDivSpy).toBeCalledTimes(1);
      expect(buildAttendeeDivSpy).toHaveBeenCalledWith('Miguel');
      expect(removeAttendeeDivSpy).toBeCalledTimes(0);
});

test(`A member that has left
    -updateSessionInfoAttendees`, () => {
      const expectedMessage =
          `The following people have left the session: ${'Bryan'} `;
      document.body.innerHTML = '';
      const sessionInfoAttendeeDiv =
          document.createElement('div');
      sessionInfoAttendeeDiv.id = 'session-info-attendees';
      document.body.appendChild(sessionInfoAttendeeDiv);
      const alertMembershipDiv =
          document.createElement('div');
      alertMembershipDiv.id = 'alert-membership';
      document.body.appendChild(alertMembershipDiv);
      const sessionSpy = 
          jest.spyOn(Session.prototype, 'getListOfAttendees').
              mockReturnValue(['Jessica']);
      sessionscript.updateSessionInfoAttendees();
      expect(notifyOfChangesToMembershipSpy).
          toHaveBeenCalledWith(expectedMessage);
      expect(buildAttendeeDivSpy).toBeCalledTimes(0);
      expect(removeAttendeeDivSpy).toBeCalledTimes(1);
      expect(removeAttendeeDivSpy).toBeCalledWith('Bryan');
});

test(`A new member + a lost member' + 
    '-updateSessionInfoAttendees`, () => {
      const expectedMessage =
          'The following people have joined the session: ' + 'Miguel.' + 
              ' The following people have left the session: ' + 'Bryan ';
      document.body.innerHTML = '';
      const sessionInfoAttendeeDiv =
          document.createElement('div');
      sessionInfoAttendeeDiv.id = 'session-info-attendees';
      document.body.appendChild(sessionInfoAttendeeDiv);
      const alertMembershipDiv =
          document.createElement('div');
      alertMembershipDiv.id = 'alert-membership';
      document.body.appendChild(alertMembershipDiv);
      const sessionSpy = 
          jest.spyOn(Session.prototype, 'getListOfAttendees').
              mockReturnValue(['Jessica', 'Miguel']);
      sessionscript.updateSessionInfoAttendees();
      expect(notifyOfChangesToMembershipSpy).
          toHaveBeenCalledWith(expectedMessage);
      expect(buildAttendeeDivSpy).toBeCalledTimes(1);
      expect(buildAttendeeDivSpy).toBeCalledWith('Miguel');
      expect(removeAttendeeDivSpy).toBeCalledTimes(1);
      expect(removeAttendeeDivSpy).toBeCalledWith('Bryan');
});

test(`no update 
    '-updateSessionInfoAttendees`, () => {
      document.body.innerHTML = '';
      const sessionInfoAttendeeDiv =
          document.createElement('div');
      sessionInfoAttendeeDiv.id = 'session-info-attendees';
      document.body.appendChild(sessionInfoAttendeeDiv);
      const sessionSpy = 
          jest.spyOn(Session.prototype, 'getListOfAttendees').
              mockReturnValue([]);
      sessionscript.updateSessionInfoAttendees();
      expect(notifyOfChangesToMembershipSpy).toBeCalledTimes(0);
      expect(buildAttendeeDivSpy).toBeCalledTimes(0);
      expect(removeAttendeeDivSpy).toBeCalledTimes(0);
});
