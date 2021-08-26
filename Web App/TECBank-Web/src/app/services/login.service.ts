import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:5000/users';
  private newUser:Observable<User[]>;

  constructor(private http:HttpClient) { }

  get_users():Observable<User[]>{

    return this.newUser = this.http.get<User[]>(this.apiURL);

    //return this.http.get<User>(this.apiURL + user.username + "/" + user.password)
  }

}