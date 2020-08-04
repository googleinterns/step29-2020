import * as sessionscript from './session-script';
import { ServerClient } from './serverclient';
import { Session } from './session';
import fetch from 'jest-fetch-mock';

const getSessionSpy = 
    jest.spyOn(ServerClient.prototype, 'getSession').
        mockResolvedValue(new Session(
            'leee3414123', '1234', [], 'Bryan'));
const getSessionIdSpy = 
    jest.spyOn(Session.prototype, 'getSessionId').
        mockReturnValue('leee3414123');
const changeControllerToSpy = 
    jest.spyOn(ServerClient.prototype, 'changeControllerTo');
const urlParamSpy = 
    jest.spyOn(window.URLSearchParams.prototype, 'get').
        mockReturnValue('Jessica');

fetch.enableMocks();

afterEach(() => {
  jest.clearAllMocks();
  fetch.resetMocks();
});

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
  sessionscript.closeParentDisplay(div);
  expect(container.style.display).toEqual('none');
});

test('change display using both functions - open then close', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  sessionscript.closeParentDisplay(div);
  expect(div.style.display).toEqual('block');
  expect(container.style.display).toEqual('none');
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
  input.addEventListener('click', () => {
    sessionscript.copyTextToClipboard(input)
  });
  container.appendChild(input);
  document.execCommand = jest.fn();
  input.click();
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});

test('tests setReadOnlyInputs()', () => {
  document.body.innerHTML = '';
  const sessionInfoInput = document.createElement('input');
  sessionInfoInput.id = 'session-info-input';
  const welcomeMessageInput = document.createElement('input');
  welcomeMessageInput.id = 'welcome-message-input';
  document.body.appendChild(sessionInfoInput);
  document.body.appendChild(welcomeMessageInput);
  sessionscript.setReadOnlyInputs('leee3414123');
  expect(sessionInfoInput.readOnly).toBe(true);
  expect(welcomeMessageInput.readOnly).toBe(true);
  expect(sessionInfoInput.value).toEqual('leee3414123');
  expect(welcomeMessageInput.value).toEqual('leee3414123');
});

test('addOnClickTo', () => {
  buildTestPage();
  const sessionInfoSpan = document.getElementById('session-info-span');
  const sessionInfoDiv = document.getElementById('session-info-div');
  const close = document.getElementsByClassName('close').item(0);
  const sessionIdInput =
      document.getElementsByClassName('session-id-input').item(0);
  sessionscript.addOnClickListenerToElements();
  sessionInfoSpan.click();
  expect(sessionInfoDiv.style.display).toEqual('block');
  close.click();
  expect(sessionInfoDiv.style.display).toEqual('none');
  document.execCommand = jest.fn();
  sessionIdInput.click();
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});

test('adding an attendee div', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);
  sessionscript.buildAttendeeDiv('hello', 'Bryan'); 
  expect(sessionInfoAttendeeDiv.querySelector('h3').id).toEqual('hello');
});

test('tests changeControllerTo() - controller clicks', () => {
  const attendeeDiv = document.createElement('div');
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.addEventListener('click', event => {
    sessionscript.changeControllerTo(event, 'Jessica');
  }, false);
  const attendeeName = document.createElement('h3');
  attendeeName.id = 'Naomi';
  attendeeDiv.appendChild(controllerToggle);
  attendeeDiv.appendChild(attendeeName);
  document.body.appendChild(attendeeDiv);
  controllerToggle.click();
  expect(changeControllerToSpy).toBeCalledWith('Naomi');
});

test('tests changeControllerTo() - controller does not click', () => {
  const attendeeDiv = document.createElement('div');
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.addEventListener('click', event => {
    sessionscript.changeControllerTo(event, 'Bob');
  }, false);
  const attendeeName =
      document.createElement('h3');
  attendeeName.id = 'Bob';
  attendeeDiv.appendChild(controllerToggle);
  attendeeDiv.appendChild(attendeeName);
  document.body.appendChild(attendeeDiv);
  controllerToggle.click();
  expect(changeControllerToSpy).toBeCalledTimes(0);
});

test('Tests to see if controller updates correctly UI wise', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);
  sessionscript.buildAttendeeDiv('Jessica', 'Jessica');
  sessionscript.buildAttendeeDiv('Bryan', 'Jessica');
  sessionscript.buildAttendeeDiv('Chris', 'Jessica');
  const urlParamSpy = 
      jest.spyOn(window.URLSearchParams.prototype, 'get').
          mockReturnValue('Jessica');
  const sessionSpy = 
      jest.spyOn(Session.prototype, 'getScreenNameOfController').
          mockReturnValue('Jessica');
  sessionscript.updateController('Jessica');
  expect(sessionInfoAttendeeDiv.querySelector(`#${'Jessica'}`)
      .parentElement.querySelector('span').style.
          backgroundColor).toEqual('rgb(253, 93, 0)');
  expect(sessionInfoAttendeeDiv.querySelector(`#${'Bryan'}`)
      .parentElement.querySelector('span').style.
          backgroundColor).toEqual('rgb(255, 255, 255)');
  expect(sessionInfoAttendeeDiv.querySelector(`#${'Chris'}`)
      .parentElement.querySelector('span').style.
          backgroundColor).toEqual('rgb(255, 255, 255)');
});

/**
 * Builds a mini-webpage to be used to test addOnClickListenerToElements.
 * Adds elements with specific ids/class names that the session-script 
 * function adds onClick listeners to.
 */
function buildTestPage() {
  document.body.innerHTML = '';
  const sessionInfoSpan = document.createElement('span');
  sessionInfoSpan.id = 'session-info-span';
  const sessionInfoDiv = document.createElement('div');
  sessionInfoDiv.id = 'session-info-div';
  const close = document.createElement('span');
  close.className = 'close';
  sessionInfoDiv.appendChild(close);
  const sessionIdInput = document.createElement('input');
  sessionIdInput.className = 'session-id-input';
  document.body.appendChild(sessionInfoDiv);
  document.body.appendChild(sessionInfoSpan);
  document.body.appendChild(sessionIdInput);
}
