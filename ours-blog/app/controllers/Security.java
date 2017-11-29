package controllers;

import java.security.NoSuchAlgorithmException;

import play.mvc.Http;
import models.User;

public class Security extends Secure.Security{
	public static boolean authenticate(String username,String password){
		User user = User.find("username = ?", username).first();
		if(user==null){
			user = User.find("email = ?", username).first();
		}
		if(user == null){
			return false;
		}
		Http.Response.current().setCookie("id",user.id.toString());
		try {
			if(user.passwordMaches(password)){
				return true;
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return false;
	}
}
