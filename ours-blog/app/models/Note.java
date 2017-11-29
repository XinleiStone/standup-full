package models;
 
import java.util.*;

import javax.persistence.*;

import play.db.jpa.*;
 
@Entity
public class Note extends Model {
 
    public String title;
    public String content;
    public Date time;
    public long userId;
    
    public String toString() {
        return title+" "+content+" "+time;
    };
}