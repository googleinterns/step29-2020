package com.google.sps.data;

import com.google.appengine.api.datastore.Entity;
import java.util.Optional;

/** Class that represents an instance. */
public class Instance {

  private final String instanceName;
  private Optional<String> sessionId;

  /** Initializes an Instance object
   * @param {String} instanceName - the name of the instance.
   * @param {Optional<String>} sessionID - the session id 
   *    associated with the instance. 
   */
  public Instance (String instanceName, Optional<String> sessionId) {
    this.instanceName = instanceName;
    this.sessionId = sessionId;
  }

  public String getInstanceName() {
    return instanceName;
  } 

  public Optional<String> getSessionId() {
    return sessionId;
  }

  /**
   * Returns a new Entity of kind "Instance" from an Instance object.
   * @param {Instance} instance - the Instance object that will be 
   *    made into an Entity.
   */
  public static Entity toEntity(Instance instance) {
    Entity instanceEntity = new Entity("Instance");
    instanceEntity.setProperty("instanceName", instance.instanceName);
    instanceEntity.setProperty("sessionId", instance.sessionId);
    return instanceEntity;
  }

   /**
   * Returns a new Instance from an entity of kind "Instance".
   * @param {Entity} instanceEntity - entity of kind "Instance" with 
   *    various properties similar to the fields of a instance object.
   */
  public static Instance toInstance(Entity instanceEntity) {
    String instanceName = (String) instanceEntity.getProperty("instanceName");
    Optional<String> sessionId = 
        (Optional<String>) instanceEntity.getProperty("sessionId");    
    return new Instance(instanceName, sessionId);
  }
}