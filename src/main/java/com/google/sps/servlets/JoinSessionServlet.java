package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Attendee;
import java.util.Date;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.DatastoreClientInterface;
import com.google.sps.data.DatastoreClient;
import com.google.sps.data.AttendeeInterface;
import com.google.sps.data.Attendee;

/** 
 * Servlet that stores users data in datastore and redirected them to the 
 * session webpage.  
 */
@WebServlet("/join-session")
public class JoinSessionServlet extends HttpServlet {
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
      DatastoreClientInterface datastoreClient = new DatastoreClient();
      String screenName = request.getParameter("name");
      String sessionId = request.getParameter("session-id");
      Date timeLastPolled = new Date();
      List<AttendeeInterface> attendeeList = 
        datastoreClient.getAttendeesInSession(sessionId);
      if (attendeeList.isEmpty()) {
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return;
      }
      else {
        for (int i = 0; i<attendeeList.size(); i++) {
          if (attendeeList.get(i).getScreenName().equals(screenName)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
          }
        }
        AttendeeInterface attendee = 
          new Attendee(sessionId, screenName, timeLastPolled);
        datastoreClient.insertOrUpdateAttendee(attendee);
        List<AttendeeInterface> List2 = 
          datastoreClient.getAttendeesInSession(sessionId);
        response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect("/session.html?session-id=" + sessionId + 
          "&name=" + screenName); 
      }
    }
}       