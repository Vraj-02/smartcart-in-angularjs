import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  // constructor(private authService: AuthService){}

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Form value:', this.loginForm.value);
      const cred = 
          {
            "identifier" :this.loginForm.value.email,
            "password":this.loginForm.value.password
          }
      console.log(cred);    
      this.authService.login(cred).subscribe
      ({
        next: (res: any) => {
          localStorage.setItem('token', JSON.stringify(res.jwt));
          localStorage.setItem('user_id', JSON.stringify(res.user.id));

          this.route.navigate(['']);

          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    else {
       console.log('Form is invalid');
       this.loginForm.markAllAsTouched();
    }
  }

}
