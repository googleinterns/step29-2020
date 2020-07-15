import { Poller } from "./poller";

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
   * @param {Object} urlSearchParams Represents the URLSearchParams of the
   *    session the client is in, holds information such as the
   *    session ID and the screen name of the current user.
   * @param {number=} [refreshCadence = 30000] Represents the cadence at
   *    which the sessionInformation is refreshed. By default, the rate is 
   *    30,000 milliseconds (or 30 seconds).  
   */
  constructor(urlParams, refreshCadence = 30000) {
    /** 
     * Poller responsible for contacting the server for information about
     * the current session.
     * @private {Object} 
     */
    this.sessionInformationPoller_ = 
        new Poller(this.sessionInformationFetchRequest_);

    /**
     * Holds what is being tracked by the SessionCache, the
     * information about the session.
     * @private {Object}
     */
    this.sessionInformation_ = null;

    /**
     * @private {number}
     */
    this.refreshCadence_ = refreshCadence;

    /**
     * Represents a resource request for the session
     * information fetch request.
     * @private @const {Object}
     */
    this.GET_SESSION_INFO_REQUEST_ = 
        new Request('/get-session-info', 
        { 
          method: 'GET', 
          body: urlSearchParams 
        }
      );
  }

  /**
   * Refreshes (rate dictated by the refreshCadence) 
   * the result from the session information poller 
   * and updates the sessionInformation field.
   * @private
   */
  refreshSessionInformation_() {
    this.sessionInformation_ = 
        this.sessionInformationPoller_.getLastResult();
    /**
     * Represents the handler returned by the setTimeout that refreshes.
     * @private {number}
     */
    this.setTimeoutIdOfRefresh_ = setTimeout(() => {
      this.refreshSessionInformation_();
    }, this.refreshCadence_);
  }

  /** 
   * This method begins polling for session information and starts
   * refreshing.
   */
  start() {
    this.sessionInformationPoller_.start();
    this.refreshSessionInformation_();
  }

  /** 
   * This method stops polling for session information and stops
   * refreshing.
   */
  stop() {
    this.sessionInformationPoller_.stop();
    clearTimeout(this.setTimeoutIdOfRefresh_);
  }

  /**
   * Method sessionInformationFetchRequest_() is the fetch api request
   * responsible for gathering information about the current session 
   * the client is in.
   * @private
   */
  sessionInformationFetchRequest_() {
    fetch(this.GET_SESSION_INFO_REQUEST_).then(response => 
      response.json()).then((sessionInfo) => {
        return sesionInfo;
      }
    );
  }

  /**
   * Returns information about the session, given how updated the 
   * cache is in refreshing.
   * @return {Object} The Session object.
   */
  getSessionInformation() {
    return this.sessionInformation_;
  }
}

export { SessionCache };
