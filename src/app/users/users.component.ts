import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from './users.model';
import * as _ from 'underscore';
import {MatSort, MatTableDataSource} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private usersService:UsersService, private router: ActivatedRoute) { }

  users:Users[];
  posts;
  albums;
  photos;
  userTable = [];

 

  displayedColumns: string[] = ['username', 'name', 'email',"city", "ride","days", "posts","albums","photos",'delete','id'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    

    try {
      this.usersService.getUsers().subscribe((users) => {
        this.users = users; 
        this.users = this.usersService.insertRideUsers(this.users);
        this.users = this.usersService.insertDaysUsers(this.users);
        this.posts = this.usersService.getPosts().subscribe((posts) => {
          this.posts = posts;
          this.users.forEach(element => {
            element.posts = _.where(this.posts, {userId:element.id})
          });
        });
        this.albums = this.usersService.getAlbumns().subscribe((albums) => {
          this.albums = albums;
          this.users.forEach(element => {
            element.albums = _.where(this.albums, {userId:element.id});
            this.photos = this.usersService.gePhotos().subscribe((photos) => {
              this.photos = photos;             
              element.albums.forEach(element2 => {
                element2.photos = _.where(this.photos, {albumId:element.id})
              });
            });
          });
          this.arrangeElementsForTable();
        });        
      });

    } catch (error) {
      console.log('==== error ====');
      console.log(error);
    }
  }

  arrangeElementsForTable(){
    let totalPhotos = 0;    
    this.users.forEach(element => {      
      element.albums.forEach(element2 =>{
        if(element2.photos != undefined)
          totalPhotos += element2.photos.length
      });
      totalPhotos += 

      this.userTable.push({
        username:element.username,
        name:element.name,
        email:element.email,
        city:element.address.city,
        ride:element.ride,
        days:element.days,
        posts:element.posts == undefined ? 0 : element.posts.length,
        albums:element.albums.length,
        photos: totalPhotos,
        id:element.id
      });
     
    });
    
    var day='';
    var days = {
      "0":"Sun",
      "1":"Mon",
      "2":"Tue",
      "3":"Wed",
      "4":"Thur",
      "5":"Fri",
      "6":"Sat",
    }
   
    var newUser = JSON.parse(localStorage.getItem("newUser"));   
    if(newUser != null){
      newUser.forEach(element => {
        day = '';
        if(element.days[0] == true && 
          element.days[6] == true  &&
          element.days[1] == false  &&
          element.days[2] == false  &&
          element.days[3] == false  &&
          element.days[4] == false  &&
          element.days[5] == false ){
            day = 'Weekends'
          }          
        else if(element.days[0] == true && 
          element.days[6] == true  &&
          element.days[1] == true  &&
          element.days[2] == true  &&
          element.days[3] == true  &&
          element.days[4] == true  &&
          element.days[5] == true )
          day = 'Everyday'
        else if(element.days[0] == false && 
          element.days[6] == false  &&
          element.days[1] == true  &&
          element.days[2] == true  &&
          element.days[3] == true  &&
          element.days[4] == true  &&
          element.days[5] == true )
          day = 'Weekdays'
        else{
          element.days.forEach((element2,i) => {
            if(element2 == true){          
                day+= days[i] + ', ';
            }
          });
          day = day.slice(0,-2);
        }
          
        this.userTable.push({
          username:element.username,
          name:element.name,
          email:element.email,
          city:element.city,
          ride:element.ride, 
          days:day, 
          id:element.id,    
          posts:Math.floor(Math.random()*9),
          albums:Math.floor(Math.random()*11),
          photos: Math.floor(Math.random()*13)
        });
      });
    }
    
    
    
   

    this.dataSource = new MatTableDataSource(this.userTable);
    this.dataSource.sort = this.sort;    

    this.dataSource.filterPredicate = (data, filter) => (data.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 || data.username.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
  }

  
  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeRow(element){
    var local = JSON.parse(localStorage.getItem('newUser'));
    var index;
    var indexLocal;
    if(local !=null){     
      indexLocal = _.findIndex(local, {id:element.id});
    }
     index = _.findIndex(this.dataSource._data._value, {id:element.id});    
    var r = confirm("Are you sure you want to delete the user " + element.name + '?')
    if(r){
      if(local != null && indexLocal != -1 && indexLocal != undefined){
        local.splice(indexLocal,1);
        localStorage.setItem('newUser',JSON.stringify(local));
      }
      this.dataSource._data._value.splice(index,1);
      this.dataSource._updateChangeSubscription();
      
      
      
    }
    
  }

}
