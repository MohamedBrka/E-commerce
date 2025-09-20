import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  step: number = 1;
  veryfiyEmail!: FormGroup;
  veryfiyCode!: FormGroup;
  resetPassword!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.veryfiyEmail = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
    });

    this.veryfiyCode = this.fb.group({
      resetCode: [null, [Validators.required,]],
    });

    this.resetPassword = this.fb.group({
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?_])[A-Za-z\d!@#$%^&*?_]{12,}$/
          ),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
    });
  }

  step1(): void {
    if (this.veryfiyEmail.valid) {
      this.authService.submitVeryfiyEmail(this.veryfiyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  step2(): void {
    if (this.veryfiyCode) {
      this.authService.submitVeryfiyCode(this.veryfiyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  step3(): void {
    if (this.resetPassword.valid) {
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
