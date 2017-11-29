package controllers;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import models.User;

import org.apache.commons.codec.binary.Hex;

import play.Play;
import play.libs.Files;
import play.mvc.Controller;

/**
 * 用户注册类
 * @author songxk88
 * @version 1.0
 * @date 2016-08-12
 * */
public class Register extends Controller {

	 /**
	  * 添加注册信息并将密码通过email发送给用户
	  * @param email
	  * @return
	  * */
    public static void addUser(String email,String password){
    	try {
	  		MessageDigest md = MessageDigest.getInstance("MD5");
	  		byte[] pwdMD5 = md.digest(password.getBytes());
	  		String pwd = Hex.encodeHexString(pwdMD5);
	  		
	  		//将密码通过email发送给用户
	  		sendMail(email);
	  		
	  		
	  		User user = new User(email,pwd);
	  		user.imgname="default.png";
	  		user.isAdmin=0;	//用户权限，默认普通用户
	  		if(user.save().isPersistent()){
	  			renderJSON("1");
	  		}else{
	  			renderJSON("0");
	  		}
	  	} catch (NoSuchAlgorithmException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	}
    }
    
    
    /**
     * 检验邮箱是否注册
     * @param email
     * @return 0表示已注册;1表示未注册
     * */
    public static void isRegister(String email){
    	User user = User.find("email=?",email).first();
    	
    	if(user==null){
    		renderJSON("1");
    	}else{
    		renderJSON("0");
    	}
    }
    
    /**
     * 获取当前用户头像
     * @param 
     * @return
     * */
    private static void getHeadImg(){
    	String username=session.get("username");
    	User user = User.find("username = ?", username).first();
		if(user==null){
			user = User.find("email = ?", username).first();
		}
    	File file = new File(Play.configuration.getProperty("head.imgfolder") + "/" + user.imgname);
		if (!file.exists()) {
			file = new File(Play.configuration.getProperty("head.imgfolder") + "/" + "failed.png");
		}
		renderBinary(file);
    }
    
    /**
     * 上传用户头像
     * @param file
     * @return
     * */
    private static void uploadHeadImg(File file){
    	String flag=null;
		try{
			String username=session.get("username");
	    	User user = User.find("username = ?", username).first();
			if(user==null){
				user = User.find("email = ?", username).first();
			}
			String fileName = file.getName();
			int position = fileName.lastIndexOf(".");
			String fileType = fileName.substring(position, fileName.length()-1);
			String path = Play.configuration.getProperty("head.imgfolder") +"/";
			String imgname=user.username;
			Files.copy(file, new File(path+imgname));
			flag="1";
		}catch(Exception e){
			flag="0";
			e.printStackTrace();
		}
		renderJSON(flag);
    }
    
    /**
     * 修改用户头像
     * @param file
     * @return
     * */
    private static void editHeadImg(File file){
    	String flag=null;
		try{
			String fileName = file.getName();
			int position = fileName.lastIndexOf(".");
			String fileType = fileName.substring(position, fileName.length()-1);
			String path = Play.configuration.getProperty("head.imgfolder") +"/";
			String imgname=UUID.randomUUID().toString() + "." + fileType;
			Files.copy(file, new File(path+imgname));
			
			String username=session.get("username");
	    	User user = User.find("username = ?", username).first();
			if(user==null){
				user = User.find("email = ?", username).first();
			}
			user.imgname=imgname;
			if(user.save().isPersistent()){
				flag="1";
			}else{
				flag="0";
			}
		}catch(Exception e){
			flag="0";
			e.printStackTrace();
		}
		
		renderJSON(flag);
    }
    
    /**
     * 获取当前登陆用户信息
     * @param
     * @return
     * */
    private static void getUserInfo(){
    	String username=session.get("username");
    	User user = User.find("username = ?", username).first();
		if(user==null){
			user = User.find("email = ?", username).first();
		}
    	renderJSON(user);
    }
    
    /**
     * 修改用户信息
     * @param
     * @return
     * */
    private static void editUser(String username,String password){
    	String name=session.get("username");
    	User user = User.find("username = ?", name).first();
		if(user==null){
			user = User.find("email = ?", name).first();
		}
		user.username=username;
		user.password=password;
		user.save().isPersistent();
    	renderJSON(user);
    }
    
    /**
     * 添加用户权限
     * @param id
     * @return
     * */
    private static void editAuthority(String id){
    	User user = User.findById(Long.parseLong(id));
		user.isAdmin=1;
		user.save().isPersistent();
		renderJSON(user);
    }
    
    /**
     * 删除用户
     * @param id
     * @return
     * */
    private static void deleteUser(String id){
    	User user = User.findById(Long.parseLong(id));
		user.delete().isPersistent();
		renderJSON("1");
    }
    
    /**
     * 显示用户列表
     * @param id
     * @return
     * */
    private static void userList(){
    	List<User> users = User.find("order by id asc").fetch();
		renderJSON(users);
    }
    
    /**
     * 随机生成11位密码
     * @param
     * @return
     * */
	private static String GeneratePswd(){
		char[] c=new char[]{'1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
	  	Random r;
	  	int k;
	  	int count1=0,count2=0,count3=0;
	  	boolean flag=false;
	  	StringBuffer result=new StringBuffer();
	  	while(!flag){
	  		result.setLength(0);
	  		for(int i=0;i<11;i++){
		  		r = new Random();
	    	    k = r.nextInt();
	    	    if(c[Math.abs(k % 62)]>='a' && c[Math.abs(k % 62)]<='z'){
	    	    	count1++;
	    	    }
	    	    if(c[Math.abs(k % 62)]>='A' && c[Math.abs(k % 62)]<='Z'){
	    	    	count2++;
	    	    }
	    	    if(c[Math.abs(k % 62)]>='0' && c[Math.abs(k % 62)]<='9'){
	    	    	count3++;
	    	    }
	    	    result.append(c[Math.abs(k % 62)]);
		    }
	  		if(count1==0 || count2==0 || count3==0){
	  			flag=false;
	  			count1=0;
	  			count2=0;
	  			count3=0;
	  		}else{
	  			flag=true;
	  		}
	  		
	  	}
	  	return result.toString();
	}
	
	
	private static void sendMail(String email){
		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", "smtp");
		props.put("mail.smtp.host", "smtp.163.com"); 
        props.put("mail.smtp.port", 25); 
        props.put("mail.smtp.auth", "true"); 
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        Session session = Session.getDefaultInstance(props, new Authenticator() { 
            protected PasswordAuthentication getPasswordAuthentication() { 
            // 登陆邮件发送服务器的用户名和密码 
                return new PasswordAuthentication("xxxx", "xxxx"); 
            }
        });
        Transport ts = null;
		try {
			ts = session.getTransport();
			ts.connect("smtp.163.com", "xxxx", "xxxx");
			MimeMessage message = new MimeMessage(session);
			
			// 设置发件人 
			message.setFrom(new InternetAddress("xxxx@163.com"));
			// 设置邮件主题 
			message.setSubject("使用发送简单文本邮件");
			// 设置收件人 
			message.setRecipient(RecipientType.TO, new InternetAddress("xxxx@qq.com"));
			// 设置发送时间 
			message.setSentDate(new Date());
			// 设置纯文本内容为邮件正文 
			message.setText("This is an email sent by <b>JavaMail</b> api.");
			// 保存并生成最终的邮件内容 
			message.saveChanges();
			
			ts.sendMessage(message, message.getAllRecipients());
			ts.close();
		} catch (NoSuchProviderException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
}
