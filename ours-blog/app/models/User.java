package models;
 
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import javax.persistence.*;

import org.apache.commons.codec.binary.Hex;

import play.db.jpa.*;
 
@Entity
public class User extends Model {
    public String username;
    public String password;
    public String email;
    public String imgname;
	public int isAdmin;
    
    /*public User(String username, String password) {
        this.username = username;
        this.password = password;
        
    }*/
    
    public User(String email,String password){
    	this.email = email;
        this.password = password;
    }
    
	public static Object current() {
		// TODO Auto-generated method stub
		List<User> user = User.findAll();
		return user;
	}
	
	public boolean passwordMaches(String password) throws NoSuchAlgorithmException{
		if(password == null){
			return false;
		}
		MessageDigest md = MessageDigest.getInstance("MD5");
  		byte[] pwdMD5 = md.digest(password.getBytes());
  		String pwd = Hex.encodeHexString(pwdMD5);
  		
		return this.password.equals(pwd);
	}
 
}