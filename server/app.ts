var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var karthicklogin = require('karthicklogin')
//karthicklogin take cares of all your auth routings

var app = express();
app.set('port', process.env.PORT || 3009); // don't change this port because client angualar 4 app using this port for restfull api
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
var config = {
  dbServer: {
    protocol: 'http://',
    host: 'localhost:5984',
    user: '',
    password: '',
    userDB: 'sl-users',
    couchAuthDB: '_users'
  },
  mailer: {
    fromEmail: '', //your mail id
    options: {
      service: 'Gmail',
        auth: {
          user: '', //your username
          pass: ''  //your password
        }
    }
  },
  security: {
    maxFailedLogins: 3,
    lockoutTime: 600,
    tokenLife: 86400,
    loginOnRegistration: true,
  },
  userDBs: {
    defaultDBs: {
      private: ['supertest']
    }
  },
  providers: { 
    local: true
  }
}
 
// Initialize karthicklogin 
var karthicklogin = new karthicklogin(config);
 
// Mount karthicklogin's routes to our app 
app.use('/auth', karthicklogin.router);

 
app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));