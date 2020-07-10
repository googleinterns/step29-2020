package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;

interface AttendeeInterface{
  
  String getSessionId();
  String getScreenName();
  Date getTimeLastPolled();
  Entity toEntity(Attendee attendee);
}



