package controllers;
 
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Hex;

import com.google.gson.JsonObject;

import play.*;
import play.mvc.*;
import play.mvc.Http.Cookie;
import models.*;

@With(Secure.class)
public class Application extends Controller {
	public static void index() {
		String username=session.get("username");
    	User user = User.find("username = ?", username).first();
		if(user!=null){
			//用户不是第一次登录
			redirect("/noteslist");
		}else{
			user = User.find("email = ?", username).first();
			if(user!=null && user.username!=null && !user.username.equals("")){
				//用户不是第一次登录
				redirect("/noteslist");
			}
			if(user!=null && (user.username==null || user.username.equals(""))){
				//用户是第一次登陆
				render();
			}
		}
	}

    public static void noteslist() {
        render();
    }
    
    public static void editUserInfo() {
        render();
    }
}