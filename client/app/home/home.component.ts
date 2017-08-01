import { Component,OnInit } from '@angular/core';
import {MdIconRegistry, MdDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  users:any;
  myStorage:any;
  selectedUser:any;
  isDataAvailable:boolean = false;
  
  isDarkTheme = false;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog, private router: Router, public database:DatabaseService) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
    this.myStorage = window.localStorage;

  }

  ngOnInit() {

      this.database.getTodos().then((data) => {
      this.users = data;
      this.selectedUser = this.users[0];
      console.log(this.users);
      if(this.users[0]){
        this.isDataAvailable = true;
      }else{
         this.isDataAvailable = false;
      }
    
      });
  }

  private openAdminDialog() {
   let dialogRef =   this.dialog.open(DialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(user => {
        this.database.createTodo({_id:user.name,name: user.name,avatar:user.avatar,details:user.details,isChecked:false});
      setTimeout(() => 
      {
          this.ngOnInit();
      },
           1000);
        
      });
  }

  logout(){
    this.database.logout();
    this.database = null;
    this.myStorage.clear();
    this.router.navigateByUrl('/login');
  }

  delete(user){
      this.database.deleteTodo(user);
      setTimeout(() => 
      {
          this.ngOnInit();
      },
      1000);

  }

  update(userupdate){
          this.database.getTodobyid(userupdate._id).then((data) => {
           console.log(data);
            var updateduser = {
            name: data[0].name,avatar:data[0].avatar,details:data[0].details,isChecked:data[0].isChecked
            }
          let dialogRef = this.dialog.open(DialogComponent , {
          disableClose: true,
           data: updateduser
          });
        
          dialogRef.afterClosed()
          .filter(result => !!result)
          .subscribe(user => {
           var updateduser1 = {
            _id:data[0]._id, _rev:data[0]._rev, name: user.name,avatar:user.avatar,details:user.details,isChecked:data[0].isChecked
            }
            this.database.updateTodo(updateduser1);
            this.selectedUser = updateduser1;
            });       
           
          });

      
  }

  isChecked(user){
    console.log(user);
          this.database.getTodobyid(user._id).then((data) => {
            console.log(data);
           if(data[0].isChecked){
             this.selectedUser.isChecked = false;
           }else{
             this.selectedUser.isChecked  = true;

           }
           var updateduser1 = {
            _id:data[0]._id, _rev:data[0]._rev, name: data[0].name,avatar:data[0].avatar,details:data[0].details,isChecked: this.selectedUser.isChecked 
            };
            this.database.updateTodo(updateduser1);
            this.selectedUser = updateduser1;
            console.log(updateduser1);
            this.refresh();
            
            });       

  }

  refresh(){
      this.database.getTodos().then((data) => {
      this.users = data;
      console.log(data[0]);
      });
  }

}
