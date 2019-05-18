import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, EmailValidator} from '@angular/forms';
import { Users } from '../users.model';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import * as _ from 'underscore';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  focusStateUsername:boolean;
  focusStateCity:boolean;
  focusStateName:boolean;
  focusStateEmail:boolean;
  newUser = new FormGroup({
   
 }); 

 days=[false,false,false,false,false,false,false]
 daysForm:FormArray;

  constructor(private usersService:UsersService, private router: Router, private formBuilder: FormBuilder) { 
    
  }

  
  

  ngOnInit() {
    this.newUser = this.formBuilder.group({
      username: ['',[Validators.required]],
      name: new FormControl(),
      city: new FormControl(),
      email:['',[Validators.required,Validators.email, EmailValidator]],
      ride: new FormControl(),  
      days:new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ])  
    });
  }

  

  onFormSubmit(){   
    var values = Object.entries(this.newUser.controls);
    var checkBoxValid = false;
    values.every(element => {
      if(element[1].errors != null){
        if(element[1].errors.required){
          alert('The field ' + element[0] + ' is mandatory');
          return false;
        }          
        if(element[1].errors.email){
          alert('The email is not valid');
          return false;
        }
          
      }
      return true;
    });
    if(this.newUser.controls.days.value.includes(true)){
      checkBoxValid = true;
    }
      
    if(this.newUser.status != 'INVALID'){
      if(checkBoxValid){
        this.usersService.insertNewUser(this.newUser);
        this.router.navigateByUrl('/users');
      }else{
        alert('Choose at least one day of the week');
      }
      
    }
    //

  }

  changeDays(index){
    this.days[index] = !this.days[index];
    this.newUser.get('days').value[index] = this.days[index];
  }

  discard(){
    this.newUser.reset();
    this.router.navigateByUrl('/users');
  }

}
