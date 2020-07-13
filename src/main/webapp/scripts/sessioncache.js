/** 
 * SessionCache bridges the gap between the client and server. 
 * Allows client to indirectly stay in contact with the server,
 * encapsulating many of the contact points away from the client.
 * 
 * SessionCache looks for information about the current session and
 * updates the server with information about each client in return (like
 * date last contacted). Also includes some additional functionality, 
 * like contacting the server to update the controller of the session.
 */
class SessionCache {
  /**
   * Initalizes a SessionCache object.
   * @param {Object} urlParams Represents the URLSearchParams of the
   *    session the client is in, holds information such as the
   *    session ID and the screen name of the current user.
   */
  constructor(urlParams) {
    /** 
     * Poll responsible for contacting the server for information about
     * the current session.
     * @private {Object} 
     */
    this.sessionInformationPoll_ = null;

    /** 
     * Poll responsible for updating the server of information about Date
     * last polled. 
     * @private {Object} 
     */
    this.trackForInactivityPoll_ = null;

    /**
     * Holds the different keys being tracked by the SessionCache and 
     * their respective values.
     * @private {Object}
     */
    this.cache_ = { session: null };

    /**
     * Represents the cadence at which the keys of the cacheObject
     * have their values refreshed. For the purpose of this class,
     * all of the keys refresh at the same rate of 30,000 milliseconds
     * (or 30 seconds). 
     * @private @const {number}
     */
    this.REFRESH_CADENCE_ = 30000;

    /**
     * @private {Object}
     */
    this.urlParams_ = urlParams;

    this.refreshKeys_();
  }

  /**
   * Gathers the results from the various polls assigned to the keys
   * and updates their values. Keys are updated every 30 seconds.
   * @private
   */
  refreshKeys_() {
    throw new Error('Unimplemented');
  }

  /**
   * Method sessionInformationRequest_() is the fetch api request
   * responsible for gathering information about the current session 
   * the client is in.
   * @private
   */
  sessionInformationRequest_() {
    throw new Error('Unimplemented');
  }

  /**
   * Method updateDatePolledRequest_() is the fetch api request 
   * responsible for updating the server with the last time the 
   * current user polled.
   * @private
   */
  updateDatePolledRequest_() {
    throw new Error('Unimplemented');
  }

  /**
   * Returns the value of the key specified if being tracked by
   * the cache.
   * @param {string} key 
   * @return {Object} The value.
   */
  getValue(key) {
    throw new Error('Unimplemented');
  }

  /**
   * Method updateControllerRequest_() is the fetch api request 
   * responsible for updating the server with who the controller 
   * should be.
   * @param {string} name
   * @private
   */
  updateControllerRequest_(name) {
    throw new Error('Unimplemented');
  }

  /**
   * Updates the controller of the session to be that of the 
   * person passed in.
   * @param {string} name 
   */
  updateController(name) {
    throw new Error('Unimplemented');
  }
}

export { SessionCache };
