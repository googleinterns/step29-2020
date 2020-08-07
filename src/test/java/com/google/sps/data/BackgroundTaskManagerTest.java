package com.google.sps;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import org.junit.After;
import org.junit.Before;
import com.google.sps.data.BackgroundTaskManager; 
import com.google.sps.data.BackgroundTaskManagerInterface;
import java.util.Optional;

/** Class that tests the BackgroundTaskManager. */
@RunWith(JUnit4.class)
public class BackgroundTaskManagerTest {
  private final LocalServiceTestHelper helper =
  new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  BackgroundTaskManagerInterface backgroundManager = new BackgroundTaskManager(); 
  private final DatastoreClientInterface datastore = new DatastoreClient();  
  String sessionId = "12345";  
  long date = 239201;
  AttendeeInterface attendee = new Attendee(sessionId, "Jaz", date);  
  AttendeeInterface attendee2 = new Attendee(sessionId, "Taniece", new Date());
  AttendeeInterface attendee3 = new Attendee(sessionId, "Chris", new Date()); 
  datastore.insertOrUpdateAttendee(attendee);
  datastore.insertOrUpdateAttendee(attendee2);
  datastore.insertOrUpdateAttendee(attendee3);


  



  @Before
  public void setUp() {
   helper.setUp();
  }

  @After
  public void tearDown() {
   helper.tearDown();
  }

  @Test
  public void updateInstanceTest() {
      
    try {
        backgroundManager.updateInstances();
    } catch(RuntimeException e) {
        Assert.assertEquals(e.getMessage(), "Unimplemented");
    }
  } 
  
  @Test
  public void replaceFaultyInstancesTest() {
    BackgroundTaskManagerInterface backgroundManager = new BackgroundTaskManager();
    try {
        backgroundManager.replaceFaultyInstances();
    } catch(RuntimeException e) {
        Assert.assertEquals(e.getMessage(), "Unimplemented");
    }
  }  
  @Test
  public void deleteInactiveAttendeesTest() {
    backgroundManager.deleteInactiveAttendees(datastore,sessionId);
    Assert.assertEquals(datastore.getAttendeesInSession, {"Taniece", "Chris"});

    
  } 
}
