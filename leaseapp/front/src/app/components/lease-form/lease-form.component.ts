import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lease-form',
  templateUrl: './lease-form.component.html',
  styleUrls: ['./lease-form.component.css'],
})
export class LeaseFormComponent implements OnInit {
  leaseForm: FormGroup;
  showSectionA: boolean = true;
  showSectionB = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createLeaseForm();
  }

  createLeaseForm() {
    this.leaseForm = this.formBuilder.group({
      sectionA: this.formBuilder.group({
        lessor: this.formBuilder.group({
          name: ['', Validators.required],
          addressNo: ['', Validators.required],
          streetAddress: ['', Validators.required],
          apt: [''],
          municipality: ['', Validators.required],
          postalCode: ['', Validators.required],
          telephoneNo: ['', Validators.required],
          otherTelephoneNo: [''],
          emailAddress: ['', Validators.required],
          representedBy: ['']

        })
      })
    });
  }

  onSubmit() {
    console.log(this.leaseForm.value);
  }
}
