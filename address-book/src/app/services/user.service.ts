import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { username, password };
    return this.http.post(url, body);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }
}
