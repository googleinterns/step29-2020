package com.google.sps.data;

import java.util.Date;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList; 
import com.google.sps.data.BackgroundTaskManagerInterface;
import com.google.sps.data.DatastoreClientInterface;
import com.google.sps.data.DatastoreClient;
import com.google.sps.data.Attendee;
import com.google.sps.data.AttendeeInterface;

/** 
* Implements the interface for the BackgroundTaskManager class. 
*/ 
public class BackgroundTaskManager implements BackgroundTaskManagerInterface {
   
    @Override
    public void updateInstances() {
        throw new RuntimeException("Unimplemented");
    } 

    @Override
    public void replaceFaultyInstances() {
        throw new RuntimeException("Unimplemented");
    }

    @Override
    public void deleteInactiveAttendees(DatastoreClientInterface datastore, String sessionId) { 
        List<Attendee> attendees = datastore.getAttendeesInSession(sessionId);
        for(int i = 0; i <= attendees.length(); i++){
            AttendeeInterface currentAttendee = attendees.get(i);
            AttendeeeInterface screenName = currentAttendee.getScreenName();
            long timePolled = currentAttendee.getTimePolled();
            long currentTime = System.currentMillis(); 
            long twoMins = 120000;
            if(currentTime - timePolled > twoMins){
                datastore.deleteAttendee(screenName);
            }
              
        }
        
        
    }

}