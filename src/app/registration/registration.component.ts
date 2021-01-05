import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public userRegistrationForm: FormGroup;
  submitted = false;
  isInvalidForm: boolean;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.userRegistrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      ext: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userRegistrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userRegistrationForm.invalid) {
      this.isInvalidForm = true;
      return;
    } else {
      this.isInvalidForm = false;
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userRegistrationForm.value, null, 4));
      this.router.navigate(['/thankyou']);
    }
  }
}
