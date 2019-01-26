package src.main.java.User;

public class CreateUser {
    
    
    public static void main(String[] args) {
        
        User user = new User();
        user.setFirstName(fname);
        user.setLastName(lname);
        user.setEmailAddress(email);

    }

    /**
     * Java class used for binding Java to JavaScript must be public.
     */
    public static class Account {
        public void save(String firstName, String lastName) {
            System.out.println("firstName = " + firstName);
            System.out.println("lastName = " + lastName);
        }
    }
}