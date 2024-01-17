import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordChanged = false;
  new_password: string = '';  // Variable to bind to the input field
  userId: number | null = null;  // Variable to store the user ID

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? +id : null;
      if (this.userId === null) {
        console.error("User ID is null. Unable to reset the password.");
      }
    });

    // Subscribe to query parameter changes
    this.route.queryParamMap.subscribe(queryParams => {
      const idFromQuery = queryParams.get('id');
      if (idFromQuery && !this.userId) {
        // Use the ID from the query string if the route parameter is not present
        this.userId = +idFromQuery;
      }
    });
  }

  // Method to handle form submission
  submitForm(): void {
    if (this.userId !== null) {
      const newPassword = this.new_password;

      this.apiService.resetPassword(this.userId, newPassword)
        .subscribe(
          response => {
            console.log(response);
            alert('Password changed successfully!');
            // Redirect to the home page after a successful password reset
            window.location.href = '/';
          },
          error => {
            console.error(error);
            alert('Failed to reset the password. Please try again.');
          }
        );
    } else {
      console.error("User ID is null. Unable to reset the password.");
    }
  }
}
