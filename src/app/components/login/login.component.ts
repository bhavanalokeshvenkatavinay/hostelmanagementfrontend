import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';
  isForgotPasswordMode = false;
  resetEmail = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        const role = this.authService.getRole();
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/student-dashboard']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 0) {
          this.error = 'Connection failed. Possible CORS issue or backend unreachable.';
        } else if (err.status === 401 || err.status === 403) {
          this.error = 'Invalid Credentials';
        } else {
          this.error = `Login failed: ${err.statusText || 'Unknown error'}`;
        }
      }
    });
  }

  toggleForgotPasswordMode() {
    this.isForgotPasswordMode = !this.isForgotPasswordMode;
    this.error = '';
    this.successMessage = '';
    this.resetEmail = '';
  }

  requestPasswordReset() {
    if (!this.resetEmail) {
      this.error = 'Please enter your email address.';
      return;
    }

    this.authService.forgotPassword(this.resetEmail).subscribe({
      next: (res: any) => {
        if (res.debug_link) {
          console.log('DEBUG LINK:', res.debug_link); // Log to console for developer access
          this.successMessage = 'Password reset link has been sent to your email.';
        } else {
          this.successMessage = res.message || 'Password reset link has been sent to your email.';
        }
        this.error = '';
      },
      error: (err) => {
        console.error('Password reset error:', err);
        this.error = 'Failed to send reset link. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
