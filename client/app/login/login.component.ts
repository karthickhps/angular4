import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {DatabaseService} from '../services/database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 myStorage:any;
 username: string;
 password: string;
  color = 'accent';
  mode = 'determinate';
  show:any;
 

  constructor(private router: Router,public http: Http, public database:DatabaseService) { 
     this.myStorage = window.localStorage;
     
     if(this.myStorage.getItem('token')){
        // this.router.navigateByUrl('/register');
        this.mode="indeterminate";
        setTimeout(() => 
      {
           this.putToken();
      },
           500);
        
     }
  }

  ngOnInit() {
   
  }

    login(){
              setTimeout(() => 
      {

 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let credentials = {
        username: this.username,
        password: this.password
      };
      console.log(credentials);

 
      this.http.post('http://localhost:3009/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          this.database.init(res.json());
          this.getToken();
        }, (err) => {
          console.log(err);
        });

       },
           1200);
 
   }
   
   getToken(){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
         let users = {
        username: this.username,
        password: this.password
        };
      console.log(users);
        this.http.post('http://localhost:3009/auth/gtoken', JSON.stringify(users), {headers: headers}) .map(res => res.text())
        .subscribe(data => {
         this.myStorage.setItem('token', data);
         console.log(data);
         console.log(this.myStorage.getItem('token'));
         this.router.navigateByUrl('/home');
        }, (err) => {
          console.log(err);
        });

   }

      putToken(){
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
         var credentials = {
        token: this.myStorage.getItem('token'),
        };
      console.log(credentials);
        this.http.post('http://localhost:3009/auth/token', JSON.stringify(credentials), {headers: headers}) .map(res => res.json())
        .subscribe(data => {
         console.log(data.username);
         console.log(data.password);
         this.username = data.username;
         this.password = data.password;
         this.login();
         // this.router.navigateByUrl('/home');
        }, (err) => {
          console.log(err);
        });

   }

  launchSignup(){
    this.router.navigateByUrl('/register');
  }

}
