import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(
      (contacts) => {
        this.contacts = contacts;
      },
      (error) => {
        console.error('Błąd podczas pobierania kontaktów', error);
      }
    );
  }

  goToAddContact() {
    this.router.navigate(['/add-contact']);
  }

  editContact(contact: Contact) {
    this.router.navigate(['/edit-contact', contact.id]);
  }
}
