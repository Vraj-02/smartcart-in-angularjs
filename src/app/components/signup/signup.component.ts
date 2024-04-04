import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,  private route: Router ) {
    signupForm: FormGroup;

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cnfPassword: ['', Validators.required]
    }, {
      validators: this.password
    });
  }

  password(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('cnfPassword');
    
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  // constructor()

  onSignUp() {
    if (this.signupForm.valid) {
      console.log('Form value:', this.signupForm.value);
      const cred = 
        {
          "username": this.signupForm.value.username,
          "email": this.signupForm.value.email,
          "password" : this.signupForm.value.password
         }
      this.authService.register(cred).subscribe
      ({
        next: (res: any) => {
          console.log(res);
          this.route.navigate(['/app-login']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    else {
       console.log('Form is invalid');
       this.signupForm.markAllAsTouched();
    }
  }
}






  // signupData={
  // name:  '',
  // email:'',
  // password: '',
  // }
  // userFormControl = new FormControl();

  // signup() {
  //   // Add your sign-up logic here
  //   console.log('Form submitted with data:', this.signupData);
  //   // console.log('Name:', this.name);
  //   // console.log('Email:', this.email);
  //   // console.log('Password:', this.password);
  // }




