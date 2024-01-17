import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signupForm: any = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    dob: ''
  };

  forgotPasswordForm: any = {
    email: ''
  };

  loginForm: any = {};
  showForgotPassword: boolean = false;
  linkSent: boolean = false;
  showAppHome: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // Subscribe to route changes
    this.route.url.subscribe(urlSegments => {
      // Check if the route is '/' (root) or 'reset-password'
      this.showAppHome = urlSegments.length === 0 || urlSegments[0].path === 'reset-password';
    });

    // If you want to handle NavigationEnd event
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the route is '/' (root) or 'reset-password'
        this.showAppHome = this.router.url === '/' || this.router.url === '/reset-password';
      }
    });
  }

  register() {
    const userData = {
      firstname: this.signupForm.firstname,
      lastname: this.signupForm.lastname,
      email: this.signupForm.email,
      mobile: this.signupForm.mobile,
      password: this.signupForm.password,
      confirm_password: this.signupForm.confirm_password,
      dob: this.datePipe.transform(this.signupForm.dob, 'yyyy/MM/dd'),
    };

    this.apiService.register(userData).subscribe(
      (response) => {
        console.log('Registration API response:', response);

        if (response.status === 'success') {
          alert('Registration successful!');
          window.location.reload();
        } else {
          alert(`Registration failed: ${response.message}`);
        }
      },
      (error) => {
        alert('An error occurred during registration. Please try again.');
        console.error('Registration error:', error);
      }
    );
  }

  login(event: Event) {
    event.preventDefault();

    const loginData = {
      identifier: this.loginForm.identifier,
      password: this.loginForm.password
    };

    this.apiService.login(loginData).subscribe(
      response => {
        console.log('Login API response:', response);

        if (response.status === 'success') {
          alert('Login successful!');
          window.location.reload();
        } else {
          alert(`Login failed: ${response.message}`);
          window.location.reload();
        }
      },
      error => {
        alert('An error occurred during login. Please try again.');
        console.error('Login error:', error);
      }
    );
  }

  sendResetLink() {
    // Ensure that forgotPasswordForm is defined
    if (this.forgotPasswordForm && this.forgotPasswordForm.email) {
        const forgotPasswordEmail = this.forgotPasswordForm.email.trim();

        if (this.isValidEmail(forgotPasswordEmail)) {
            this.apiService.sendResetLink(forgotPasswordEmail).subscribe(
                (response) => {
                    if (response.status === 'success') {
                        this.linkSent = true;
                        alert('Reset link sent successfully!');
                        
                        // Reset forgotPasswordForm
                        this.forgotPasswordForm = { email: '' };

                        // Hide the forgot password form
                        this.showForgotPassword = false;
                    } else {
                        alert(`Error sending reset link: ${response.message}`);
                    }
                },
                (error) => {
                    console.error('Error sending reset link:', error);
                    alert('An error occurred while sending the reset link. Please try again.');
                }
            );
        } else {
            alert('Please enter a valid email address.');
        }
    } else {
        console.error('Forgot password form or email is undefined.');
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goBackToLogin() {
    this.showForgotPassword = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleForgotPassword() {
    this.showForgotPassword = true;
  }

  hideForgotPassword() {
    this.showForgotPassword = false;
  }
}
