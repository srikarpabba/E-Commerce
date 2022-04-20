import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, 
        [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]
      ],
      phoneNumber:  [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      password: [null, Validators.required],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
  }

  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  onSubmit() {    
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
               return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }

}