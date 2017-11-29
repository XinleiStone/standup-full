package controllers;

import java.util.Date;
import java.util.List;

import models.Note;
import models.User;
import play.mvc.Controller;

/**
 * 博客类
 * @author songxk88
 * @version 1.0
 * @date 2016-08-13
 * */
public class BlogController extends Controller{
	/**
	  * 添加博客
	  * @param title
	  * @param content
	  * @return
	  * */
   public static void addNote(String title,String content){
	   String username=session.get("username");
	   User user = User.find("username = ?", username).first();
		if(user==null){
			user = User.find("email = ?", username).first();
		}
		Note note=new Note();
		note.title=title;
		note.content=content;
		note.time=new Date();
		note.userId=user.id;
		note.save().isPersistent();
		renderJSON(note);
   }
   
   /**
	  * 显示博客列表
	  * @param
	  * @return
	  * */
	 public static void noteList(){
		 String username=session.get("username");
		 User user = User.find("username = ?", username).first();
		 if(user==null){
			 user = User.find("email = ?", username).first();
		 }
		 long id =user.id;
		 List<Note> notes=Note.find("userId = ? order by time desc",id).fetch();
		 renderJSON(notes);
	 }
	 
	 /**
	  * 显示博客
	  * @param
	  * @return
	  * */
	 public static void getNote(String id){
		 Note note=Note.findById(Long.parseLong(id));
		 renderJSON(note);
	 }
	 /**
	  * 删除博客
	  * @param id
	  * @return
	  * */
	 public static void deleteNote(String id){
		 Note note=Note.findById(Long.parseLong(id));
		 note.delete().isPersistent();
	     renderJSON("1");
	 }
	 /**
	  * 修改博客
	  * @param id
	  * @param title
	  * @param content
	  * @return
	  * */
	 public static void editNote(String id,String title,String content){
		 Note note=Note.findById(Long.parseLong(id));
		 note.title=title;
		 note.content=content;
		 note.time=new Date();
		 note.save().isPersistent();
	     renderJSON("1");
	 }
}
