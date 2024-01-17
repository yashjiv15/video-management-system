import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';  // Update with your Flask API URL

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, data);
  }

  sendResetLink(email: string): Observable<any> {
    // Only pass the email in the request body
    return this.http.post(`${this.apiUrl}/forgotpassword/`, { email });
  }

  resetPassword(id: number, new_password: string): Observable<any> {
    console.log(`Calling resetPassword API with userId: ${id}`);
    return this.http.post(`${this.apiUrl}/reset-password?id=${id}`, { new_password });
  }
}
