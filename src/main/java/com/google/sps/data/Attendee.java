package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;

/** Class that represents an attendee. */
public class Attendee {

  private final String sessionId;
  private final String screenName;
  private Date timeLastPolled;
  
  /** Initializes an Attendee object
   * @param {String} sessionId - the session the attendee is attached to.
   * @param {String} screenName - the screen name of the attendee. 
   * @param {Date} timeLastPolled - the time attendee was last polled.
   */
  public Attendee (String sessionId, String screenName, Date timeLastPolled) {
    this.sessionId = sessionId;
    this.screenName = screenName;
    this.timeLastPolled = timeLastPolled;
  }

  public String getSessionId() {
    return sessionId;
  }

  public String getScreenName() {
    return screenName;
  }

  public Date getTimeLastPolled() {
    return timeLastPolled;
  }
  
  /**
   * Returns a new Entity of kind "Attendee" from an Attendee object.
   * @param {Attendee} attendee - the Attendee object that will be made into
   *     an Entity.
   */
  public static Entity toEntity(Attendee attendee) {
    Entity attendeeEntity = new Entity("Attendee");
    attendeeEntity.setProperty("sessionId", attendee.sessionId);
    attendeeEntity.setProperty("screenName", attendee.screenName);
    attendeeEntity.setProperty("timeLastPolled", attendee.timeLastPolled);
    return attendeeEntity;
  }

  /**
   * Returns a new Attendee from an entity of kind "Attendee".
   * @param {Entity} attendeeEntity - entity of kind "Attendee" with various 
   *     properties similar to the fields of a attendee object.
   */
  public static Attendee toAttendee(Entity attendeeEntity) {
    String sessionId = (String) attendeeEntity.getProperty("sessionId");    
    String screenName = (String) attendeeEntity.getProperty("screenName");
    Date timeLastPolled = (Date) attendeeEntity.getProperty("timeLastPolled");
    return new Attendee(sessionId, screenName, timeLastPolled);
  }
}