package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
 
@Entity
public class NoteList extends Model {
 
    public String title;
    public String content;
    public String time;
    
    public NoteList(String title, String content, String time) {
        this.title = title;
        this.content = content;
        this.time = time;
    }
 
}