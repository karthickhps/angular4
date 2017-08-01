import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes,RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AppComponent} from './app.component';
import {DialogComponent} from './dialog/dialog.component';

import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {DatabaseService} from './services/database.service';
import {AuthGuard} from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
    { 
      path: 'home', 
      component: HomeComponent},
 


      {
        path:'login',
        component:LoginComponent
      },
     {
        path:'register',
        component:RegisterComponent
      }
    ])
 
  ],
  providers: [
    DatabaseService,
    FormBuilder,
    AuthGuard,

  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

