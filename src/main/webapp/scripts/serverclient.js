import { SessionCache } from './sessioncache.js';

/**
 * ServerClient is responsible for keeping up-to-date with the current 
 * session and handles many of the client-to-server interactions, 
 * like changing the controller.
 */
class ServerClient {
  /**
   * Initalizes a ServerClient object.
   * @param {URLSearchParams} urlParams Represents the URLSearchParams 
   *    of the session the client is in, holds information such as the
   *    session ID and the screen name of the current user.
   */
  constructor(urlParams) {
    /**
     * Specifies the URL pattern of the ChangeControllerServlet
     * @private @const
     */
    this.CHANGE_CONTROLLER_ENDPOINT_ = '/change-controller';

    /**
     * Specifies the URL pattern of the GetSessionServlet
     * @private @const
     */
    this.GET_SESSION_ENDPOINT_ = '/get-session';

    /**
     * function sessionRequest_() is the fetch api request
     * responsible for contacting the server to retrieve the Session
     * object.
     * @param {string} getSessionEndpoint the url pattern of the 
     *    GetSessionServlet
     * @return {function(): Promise<any>} 
     * @private
     */
    async function sessionRequest_() {
      const /** string */ name = encodeURI(urlParams.get('name'));
      const /** string */ sessionID = 
          encodeURI(urlParams.get('session-id'));
      const /** Response */ response =
          await fetch(`/get-session?name=${name}&session-id=${sessionID}`);
      return await response.json();
    }

    /**
     * The SessionCache for the current session, contacts the server for 
     * the Session object.
     * @private {SessionCache}
     */
    this.sessionCache_ = new SessionCache(sessionRequest_);

    /**
     * @private {URLSearchParams}
     */
    this.urlParams_ = urlParams;

    this.startSessionCache_();
  }

  /** 
   * This method starts to cache.
   * @private
   */
  startSessionCache_() {
    this.sessionCache_.start();
  }

  /**
   * This method changes the controller of the current session to the 
   * Attendee passed in.
   * @param {string} newControllerName 
   */
  changeController(newControllerName) {
    const /** string */ sessionID = 
        encodeURI(this.urlParams_.get('session-id'));
    const /** Request */ request =
        new Request(this.CHANGE_CONTROLLER_ENDPOINT_, {
          method: 'POST',
          body: JSON.stringify({
            "name": encodeURI(newControllerName),
            "session-id": sessionID
          })
    });
    fetch(request).then(response => {
      if(!response.ok) {
        throw new Error('No contact with server,' + 
            'unsuccessful in changing controller!');
      }
    });
  }

  /**
   * Returns a promise containing the Session object, given how updated the 
   * cache is in refreshing.
   * @return {Promise} The Promise object
   */
  getSession() {
    return this.sessionCache_.getSession();
  }
}

export { ServerClient };
