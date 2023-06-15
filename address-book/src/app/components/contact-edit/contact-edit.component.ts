import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
          this.contact.id = contactId;
          this.contact = contact;
        },
        (error) => {
          console.error('Błąd podczas pobierania kontaktu', error);
        }
      );
    } else {
      console.error('Nieprawidłowy identyfikator kontaktu');
    }
  }

  updateContact() {
    this.contactService.updateContact(this.contact).subscribe(
      (response) => {
        console.log('Kontakt został zaktualizowany');
        this.router.navigate(['/contacts']);
      },
      (error) => {
        console.error('Błąd podczas aktualizacji kontaktu', error);
      }
    );
  }
}
