import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3001';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { username, password };
    return this.http.post(url, body);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response) => {
        console.log('Odpowiedź po zalogowaniu:', response);
        const token = response.token;
        this.setToken(token);
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
