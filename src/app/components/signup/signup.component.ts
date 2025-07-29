import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  
  constructor(private authService: AuthenticationService, private router: Router){
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
    })
  }

  signup(){
    this.authService.singup(this.signupForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
