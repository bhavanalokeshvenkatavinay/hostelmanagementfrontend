import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    token: string = '';
    isLoading = false;
    message = '';
    isSuccess = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        privatefb: ToastService // Just in case
    ) {
        this.resetForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validator: this.passwordMatchValidator });
    }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token') || '';
        if (!this.token) {
            this.message = 'Invalid or missing token.';
        }
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('password')?.value === form.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.resetForm.invalid || !this.token) return;

        this.isLoading = true;
        const newPassword = this.resetForm.get('password')?.value;

        this.authService.resetPassword(this.token, newPassword).subscribe({
            next: (res) => {
                this.isLoading = false;
                this.isSuccess = true;
                this.message = 'Password reset successful! Redirecting to login...';
                setTimeout(() => this.router.navigate(['/login']), 3000);
            },
            error: (err) => {
                this.isLoading = false;
                this.isSuccess = false;
                this.message = err.error?.message || 'Failed to reset password. Link may be expired.';
            }
        });
    }
}
