package com.google.sps.data;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.sps.servlets.JoinSessionServlet;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({JoinSessionServlet.class})
public class JoinSessionServletTest {
  private final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private final DatastoreClientInterface datastoreClient = 
      new DatastoreClient();
  private final JoinSessionServlet servlet = new JoinSessionServlet();
  private final DatastoreService DatastoreService = 
      DatastoreServiceFactory.getDatastoreService();

  @Mock
  HttpServletRequest request;
  @Mock
  HttpServletResponse response;

  @Before
  public void setUp() throws Exception {
    helper.setUp();
    MockitoAnnotations.openMocks(this);
    Date mockDate = new Date();
    PowerMockito.whenNew(Date.class).withNoArguments().thenReturn(mockDate);
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void testDoGetReturnsAttendeeList() throws Exception {
    Mockito.when(request.getParameter("sessionId")).thenReturn("12345");
    List<AttendeeInterface> listOfAttendees = 
        datastoreClient.getAttendeesInSession("12345");
    Gson gson = new Gson();
    String expectedJson = gson.toJson(listOfAttendees);
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    Mockito.when(response.getWriter()).thenReturn(pw);
    servlet.doGet(request, response);
    String actualJson = sw.getBuffer().toString().trim();
    Assert.assertEquals(expectedJson, actualJson);
    Mockito.verify(response).setStatus(HttpServletResponse.SC_OK);
  }

  @Test
  public void testDoPostWritesToDatastoreAndRedirects() throws Exception {
    Mockito.when(request.getParameter("screenName")).thenReturn("Taniece");
    Mockito.when(request.getParameter("sessionId")).thenReturn("12345");
    servlet.doPost(request, response);
    Assert.assertEquals(DatastoreService.prepare(new Query
        (EntityConstants.AttendeeEntity.TABLE_NAME))
        .countEntities(), 1);
    Mockito.verify(response).sendRedirect
        ("/session.html?session-id=12345&name=Taniece");
  }
} 