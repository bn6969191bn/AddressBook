import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
})
export class ContactAddComponent {
  contact: Contact = {
    id: this.generateUniqueId(),
    name: '',
    email: '',
    phone: '',
  };

  constructor(private contactService: ContactService, private router: Router) {}

  addContact() {
    this.contactService.addContact(this.contact).subscribe(
      (response) => {
        console.log('Kontakt został dodany');
        this.router.navigate(['/contacts']);
      },
      (error) => {
        console.error('Błąd podczas dodawania kontaktu', error);
      }
    );
  }

  generateUniqueId(): string {
    return Date.now().toString();
  }
}
