package com.google.sps.data;

import com.google.appengine.api.datastore.Entity;
import java.util.Optional;

/** Class that represents a session. */
public class Session {

  private final String sessionId;
  private Optional<String> screenNameOfController;
  private Optional<String> ipOfVM;

  /** Initializes a Session object
   * @param {String} sessionID - the id used to identify a session.
   * @param {Optional <String>} screenNameOfController - the screen name of the attendee with the controller. 
   * @param {Optional <String>} ipOfVM - the ip of the VM assigned to the session.
   */
  public Session (String sessionId, Optional <String> screenNameOfController, Optional <String> ipOfVM) {
    this.sessionId = sessionId;
    this.screenNameOfController = screenNameOfController;
    this.ipOfVM = ipOfVM;
  }

  public String getSessionId() {
    return sessionId;
  }

  public Optional <String> getScreenNameOfController() {
    return screenNameOfController;
  }

  public Optional <String> getIpOfVM() {
      return ipOfVM;
  }
  
  /**
   * Returns a new Entity of kind "Session" from a Session object.
   * @param {Session} session - the Session object that will be made into an
   *     Entity.
   */
  public static Entity toEntity(Session session) {
    Entity sessionEntity = new Entity("Session");
    sessionEntity.setProperty("sessionId", session.sessionId);
    sessionEntity.setProperty("screenNameOfController", session.screenNameOfController);
    sessionEntity.setProperty("ipOfVM", session.ipOfVM);
    return sessionEntity;
  }

  /**
   * Returns a new Session from an entity of kind "Session".
   * @param {Entity} sessionEntity - entity of kind "Session" with various 
   *     properties similar to the fields of a session object.
   */
  public static Session toSession(Entity sessionEntity) {
    String sessionId = (String) sessionEntity.getProperty("sessionId");    
    Optional<String> screenNameOfController = (Optional<String>) sessionEntity.getProperty("screenNameOfController");
    Optional<String> ipOfVM = (Optional<String>) sessionEntity.getProperty("ipOfVM");
    return new Session(sessionId, screenNameOfController, ipOfVM);
  }
}