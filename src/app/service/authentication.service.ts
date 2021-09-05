import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //private baseUrl = 'http://10.60.30.61:8080/CSB_RestAPI';
 private baseUrl = environment.baseUrl;
 //
 //private baseUrl = 'http://10.60.30.61:8080/CSB_RestAPI';

  constructor(
    private httpClient:HttpClient
  ) { 
     }
     
     authenticate(email, password) {
      // console.log(email);
       //console.log(password);
      return this.httpClient.post<any>(`${this.baseUrl}/authenticate`,{email,password}).pipe(
       map(
         userData => {
        // console.log(email);
         //console.log(password);
         //console.log(userData,"User Data");
          sessionStorage.setItem('username',email);
          let tokenStr= 'Bearer '+userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
         }
       )
  
      );
    }
    getToken(): String {
     // debugger;
      //var currentUser = JSON.parse(sessionStorage.getItem('username'));
      var token =   sessionStorage.getItem('token');
      //console.log("token is"+ token);
      return token ? token : "";
    }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }
                                                                                  
  logOut() {
    sessionStorage.removeItem('username')
  }
}
