import * as sessionscript from './session-script';

test('display none to block', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  expect(div.style.display).toEqual('block');
});

test('display block to none', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'block';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.closeSessionInfo();
  expect(div.style.display).toEqual('none');
});

test('change display using both functions - open then close', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  sessionscript.closeSessionInfo();
  expect(div.style.display).toEqual('none');
});

test('already opened', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'block';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  expect(div.style.display).toEqual('block');
});

test('tests copy and paste', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const input = document.createElement('input');
  input.id = 'session-id-field';
  input.name = 'session-id';
  input.value = 'hello!';
  input.addEventListener('click', function() {
    sessionscript.copyTextToClipboard(this);
  });
  container.appendChild(input);
  document.execCommand = jest.fn();
  input.click();
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});

test('adding an attendee div', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);
  const attendeeDivExpected = document.createElement('div');
  attendeeDivExpected.className = 'attendee-div'
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', 
      sessionscript.changeController, /**AddEventListenerOptions=*/false);
  const attendeeName = document.createElement('h3');
  attendeeName.innerHTML = 'hello';
  attendeeName.className = 'attendee-name'
  attendeeName.id = 'hello';
  attendeeDivExpected.appendChild(controllerToggle);
  attendeeDivExpected.appendChild(attendeeName);
  sessionscript.buildAttendeeDiv('hello');
  expect(sessionInfoAttendeeDiv.childNodes[0]).
      toEqual(attendeeDivExpected);
})

test('removing an attendee div', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);
  sessionscript.buildAttendeeDiv('hello');
  sessionscript.removeAttendeeDiv('hello');
  expect(sessionInfoAttendeeDiv.innerHTML).toBeFalsy();
})

test('removing an attendee div, already empty', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);  
  sessionscript.removeAttendeeDiv('hello');
  expect(sessionInfoAttendeeDiv.innerHTML).toBeFalsy();
})

test('removing a non matching attendee div', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);
  sessionscript.buildAttendeeDiv('hello');
  sessionscript.removeAttendeeDiv('hell');
  const attendeeDivExpected = document.createElement('div');
  attendeeDivExpected.className = 'attendee-div'
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', 
      sessionscript.changeController, /**AddEventListenerOptions=*/false);
  const attendeeName = document.createElement('h3');
  attendeeName.innerHTML = 'hello';
  attendeeName.className = 'attendee-name'
  attendeeName.id = 'hello';
  attendeeDivExpected.appendChild(controllerToggle);
  attendeeDivExpected.appendChild(attendeeName);
  expect(sessionInfoAttendeeDiv.childNodes[0]).
      toEqual(attendeeDivExpected);
})

test('We can check if correct errors are thrown' + 
    '-passController', () => {
      try {
        sessionscript.passController();
      } catch (e) {
        expect(e.message).toBe('Unimplemented');
      }
});
