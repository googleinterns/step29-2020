import { Attendee } from './Attendee';

test('Check for correct value of screenName', () => {
    const attendee = new Attendee(); 
    attendee.setScreenName("Jaz"); 
    const name = attendee.getScreenName();
    expect(name).toBe(attendee.screenName); 
}); 
test('Check for correct value of sessionId', () => {
    const attendee = new Attendee();
    attendee.setSessionId("JTK614");
    const id = attendee.getSessionId();
    expect(id).toBe(attendee.sessionId);
}); 
test('Check for correct value of userIp', () => {
    const attendee = new Attendee();
    attendee.setTimeLastPolled("2 minutes ago"); 
    const lastTimePolled = attendee.getTimeLastPolled(); 
    expect(lastTimePolled).toBe(attendee.timeLastPolled);
});