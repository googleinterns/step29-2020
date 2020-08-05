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

/** Servlet that returns a list of attendees in a session.  */
@WebServlet("/join")
public class JoinSessionServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
      DatastoreClientInterface datastoreClient = new DatastoreClient();
      String sessionId = request.getParameter("sessionId");
      List<AttendeeInterface> attendeeList = 
        datastoreClient.getAttendeesInSession(sessionId);
      Gson gson = new Gson();
      String json = gson.toJson(attendeeList);
      response.setContentType("application/json;");
      response.getWriter().println(json);
      response.setStatus(HttpServletResponse.SC_OK);

    }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
      DatastoreClientInterface datastoreClient = new DatastoreClient();
      String screenName = request.getParameter("screenName");
      String sessionId = request.getParameter("sessionId");
      Date date = new Date();
      AttendeeInterface attendee = new Attendee(screenName, sessionId, date);
      datastoreClient.insertOrUpdateAttendee(attendee);
      response.sendRedirect("/session.html?session-id=" + sessionId + 
        "&name=" + screenName);
    }
}