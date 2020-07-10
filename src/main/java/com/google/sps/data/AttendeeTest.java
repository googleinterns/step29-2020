package com.google.sps.data;

import java.util.Date;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
//import org.junit.runners.JUnit4;
import com.google.appengine.api.datastore.Entity;

//@RunWith(JUnit4.class)
public class AttendeeTest {

//@Test
  public void attendeeTester() {
    Attendee Test = new Attendee("12345", "Taniece", new Date());
    Assert.assertEquals("12345", Test.getSessionId());
    Assert.assertEquals("Taniece", Test.getScreenName());

    //Entity testEntity = Test.toEntity();
   // assertEquals(Test, fromEntity(testEntity));
}
}
