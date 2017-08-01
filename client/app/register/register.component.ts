import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import {Router, RouterModule} from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router,public http: Http, public database:DatabaseService) { }

  ngOnInit() {
  }

    register(){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let user = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
 
      this.http.post('http://localhost:3009/auth/register', JSON.stringify(user), {headers: headers})
        .subscribe(res => {
          this.database.init(res.json());
          this.router.navigateByUrl('/login');
        }, (err) => {
          console.log(err);
        }); 
 
  }

}
