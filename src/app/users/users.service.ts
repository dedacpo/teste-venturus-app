import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getMe(): Observable<User> {    
    return this.http.get<User>("./assets/json_models/user.json"); 
  }

  getMyInitials(name:string){
    let splited = name.split(" ");
    var initials = '';
    splited.forEach(element => {
      initials+=element.charAt(0);
    });
    return initials;
  }

  getUsers():Observable<Users[]>{   
    return this.http.get<Users[]>("https://jsonplaceholder.typicode.com/users");    
  }

  insertRideUsers(users:Users[]){
    let rides = ["Sometimes","Never","Always"];
    users.forEach(element => {
      element.ride = rides[ Math.floor(Math.random() * 3)];
    });
    return users;
  }

  insertDaysUsers(users:Users[]){
   let days = ["Every day","Weekdays","Weekends","Mon","Tue", "Wed","Fri","Sat","Sun"];
    users.forEach(element => {      
        element.days = days[Math.floor(Math.random() * 9)]; 
    });
    return users;
  }

  gePhotos(){
    return this.http.get<Users[]>("https://jsonplaceholder.typicode.com/photos"); 
  }

  getPosts(){
    return this.http.get<Users[]>("https://jsonplaceholder.typicode.com/posts"); 
  }

  getAlbumns(){
    return this.http.get<Users[]>("https://jsonplaceholder.typicode.com/albums"); 
  }

  insertNewUser(user){    
    user.value.id = Math.floor(Math.random() * 100000);
    let newUser = JSON.parse(localStorage.getItem('newUser'));
    if(newUser == null){
      localStorage.setItem("newUser",JSON.stringify([user.value]));  
    }else  {    
      newUser.push(user.value); {
      localStorage.setItem("newUser",JSON.stringify(newUser));  
    }
  }
    
    
  }

}
