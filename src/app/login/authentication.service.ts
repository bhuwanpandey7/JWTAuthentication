import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  authenticationUrl = `http://localhost:4200/users/authenticate`;
  logout() {
    localStorage.removeItem('currentUser');
  }

  login(user: User) {
    return this.httpClient.post(this.authenticationUrl, user)
      .pipe(map(loggedInUser => {
        if (loggedInUser && loggedInUser['token']) {
          localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        }
        return user;
      }));
  }

  constructor(private httpClient: HttpClient) { }
}
