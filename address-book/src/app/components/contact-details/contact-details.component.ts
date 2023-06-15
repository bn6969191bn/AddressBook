import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.loadContact();
  }

  loadContact() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.contactService.getContact(contactId).subscribe(
        (contact) => {
          this.contact = contact;
        },
        (error) => {
          console.error('Błąd podczas pobierania kontaktu', error);
        }
      );
    }
  }
}
