/** 
 * SessionCache bridges the gap between the client and server. 
 * Allows client to indirectly stay in contact with the server,
 * encapsulating many of the contact points away from the client.
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
    //this.sessionInformationPoll_

    /** 
     * Poll responsible for updating the server of information about Date
     * last polled. 
     * @private {Object} 
     */
    //this.trackForInactivityPoll_

    /**
     * Holds the different keys being tracked by the SessionCache and their
     * respective values.
     * @private {Object}
     */
    //this.cacheObject_

    /**
     * Represents the cadence at which the keys of the cacheObject have their
     * values refreshed. For the purpose of this class, all of the keys refresh
     * at the same rate of 30,000 milliseconds (or 30 seconds). 
     * @private @const {number}
     */
    // this.REFRESH_RATE_

    /**
     * @private {Object}
     */
    //this.urlParams_
  }

  /**
   * Gathers the results from the various polls assigned to the keys
   * and updates their values. Keys are updated every 30 seconds.
   * @private
   */
  refreshKeys_() {
    return;
  }

  /**
   * Method sessionInformationRequest_() is the fetch api request
   * responsible for gathering information about the current session 
   * the client is in.
   * @private
   */
  sessionInformationRequest_() {
    return;
  }

  /**
   * Method updateDatePolledRequest_() is the fetch api request responsible
   * for updating the server with the last time the current user polled.
   * @private
   */
  updateDatePolledRequest_() {
    return;
  }

  /**
   * Returns the value of the key specified if being tracked by the SessionCache.
   * @param {string} key 
   * @return {Object} The value.
   */
  getValue(key) {
    return;
  }

  /**
   * Method updateControllerRequest_() is the fetch api request responsible
   * for updating the server with who the controller should be.
   * @param {string} name
   * @private
   */
  updateControllerRequest_(name) {
    return;
  }

  /**
   * Updates the controller of the session to be that of the person passed in.
   * @param {string} name 
   */
  updateController(name) {
    return;
  }
}
