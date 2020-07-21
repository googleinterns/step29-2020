// To be utilized when unwrapping JSON from the future servlets. Will be on the 
// client side and be used as a buffer for client to server information needed  
// for other components of Virtual Movie Night.
class Session { 
  constructor() { 
  /** @private @const {string} */
      this.sessionId;

  /** @private @const {string} */
      this.ipOfVM;

  /** @private @const {string} */
      this.listOfAttendees;

  /** @private @const {string} */
      this.screenNameOfController; 
  }
/**
 * @param @private {string} id A string must be passed so that the function 
   can set it as the sessionId for the object
 */ 
  setSessionId_(id) { 
      this.sessionId = id;
  }
/**
 * @param @private {string} id A string must be passed so that the function 
   can set it as the ipOfVM for the object
 */ 
  setIpOfVM_(ip) {
      this.ipOfVM = ip;
  }
/**
 * @param @private {string[]} attendees A string must be passed so that the function 
   can set it as the listOfAttendees for the object
 */ 
  setListOfAttendees_(attendees) {
      this.listOfAttendees = attendees;
  }
/**
 * @param @private {string} controller A string must be passed so that the function 
   can set it as the screenNameOfController for the object
 */ 
  setScreenNameOfController_(controller) {
      this.screenNameOfController = controller;
  }

  getSessionId() {
      return this.sessionId;
  } 

  getIpOfVM() {
      return this.ipOfVM;
  } 

  getListOfAttendees() { 
     return this.listOfAttendees;    
  }
  
  getScreenNameOfController() {
     return this.screenNameOfController; 
  }
/**
 * @param {Session} obj A Session object must be passed so that the function 
   can utilize the setters to set the variables of the object
 */    
  static fromObject(obj) {  
      const session = new Session();
      session.setSessionId_(obj.sessionId);
      session.setIpOfVM_(obj.ipOfVM);
      session.setListOfAttendees_(obj.listOfAttendees);
      sess.setScreenNameOfController_(obj.ScreenNameOfController);
      return session;
  }
  
}
export { Session };