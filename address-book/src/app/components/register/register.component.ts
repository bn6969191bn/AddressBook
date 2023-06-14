import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        console.log('Rejestracja zakończona sukcesem');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Błąd rejestracji', error);
      }
    );
  }
}
