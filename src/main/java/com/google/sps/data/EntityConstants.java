import java.util.Date;

public class EntityConstants {
  static class AttendeeEntity {
    public static String TABLE_NAME = "Attendee";
    public static String SESSION_ID = "SessionId";
    public static String SCREEN_NAME = "ScreenName";
    public static String TIME_LAST_POLLED = "TimeLastPolled";
  }

  static class InstanceEntity {
    public static String TABLE_NAME = "Instance";
    public static String INSTANCE_NAME = "InstanceName";
    public static String SESSION_ID = "SessionId";
  }

  static class SessionEntity {
    public static String TABLE_NAME = "Session";
    public static String SESSION_ID = "SessionId";
    public static String SCREEN_NAME_OF_CONTROLLER = "SreenNameOfController";
    public static String IP_OF_VM = "IpOfVM";
  }
}