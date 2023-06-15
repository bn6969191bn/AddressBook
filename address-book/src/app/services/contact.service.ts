import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    const url = `${this.baseUrl}/contacts`;
    return this.http
      .get<any[]>(url)
      .pipe(
        map((contacts) =>
          contacts.map((contact) => ({ ...contact, id: contact._id }))
        )
      );
  }

  getContact(id: string): Observable<any> {
    const url = `${this.baseUrl}/contacts/${id}`;
    return this.http.get<any>(url);
  }

  addContact(contact: any): Observable<any> {
    const url = `${this.baseUrl}/contacts`;
    return this.http.post(url, contact);
  }

  updateContact(contact: any): Observable<any> {
    const url = `${this.baseUrl}/contacts/${contact._id}`;
    return this.http.put(url, contact);
  }

  deleteContact(contactId: string): Observable<any> {
    const url = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete(url);
  }
}
