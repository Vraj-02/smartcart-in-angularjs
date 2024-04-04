import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  navs=[
    {
      name: 'Home',
      path: 'app-home'
    },
    {
      name: 'Login',
      path: 'app-login'
    },
    {
      name: 'Sign Up',
      path: 'app-signup'
    }
  ]
  constructor(private route: Router) {}

  logoutUser() {
    localStorage.clear();
    this.route.navigate(['/app-login']);
  }
}
