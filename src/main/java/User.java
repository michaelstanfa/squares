public class User() {

	private User () {
		//private constructor
	}

	private static String firstName;
	private static String lastName;
	private static String emailAddress;


    protected static void setFirstName(String fname) {
        this.firstName = fname;
    }
    
    protected static void setLastName(String lname) {
        this.lastName = lname;
    }
    
    protected static void setEmailAddress(String email) {
        this.emailAddress = email;
    }

}