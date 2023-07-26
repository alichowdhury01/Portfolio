import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeaseService } from 'src/app/services/lease.service';

@Component({
  selector: 'app-lease-form',
  templateUrl: './lease-form.component.html',
  styleUrls: ['./lease-form.component.css'],
})
export class LeaseFormComponent implements OnInit {
  leaseForm: FormGroup;
  currentSection: number = 0;
  totalSections: number = 2;
  constructor(private formBuilder: FormBuilder, private leaseService: LeaseService) {}

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

        }),
        lessee: this.formBuilder.group({
          name: ['', Validators.required],
          addressNo: ['', Validators.required],
          streetAddress: ['', Validators.required],
          apt: [''],
          municipality: ['', Validators.required],
          postalCode: ['', Validators.required],
          telephoneNo: ['', Validators.required],
          otherTelephoneNo: [''],
          emailAddress: ['', Validators.required],
        }),
      }),
      sectionB: this.formBuilder.group({
        IleaseDestinationAndDescription: this.formBuilder.group({
          addressNo: ['', Validators.required],
          street: ['', Validators.required],
          apt: [''],
          municipality: ['', Validators.required],
          postalCode: ['', Validators.required],
          residentialOnly: [null],
          combinedPurposes: [null],
          unitUnderCoOwnership: [null, Validators.required],
          outdoorParking: [null, Validators.required],
          nbrOfOutdoorParkingPlaces: [''],
          outdoorParkingPlaceNbr: [''],
          indoorParking: [null, Validators.required],
          nbrOfIndoorParkingPlaces: [''],
          indoorParkingPlaceNbr: [''],
          lockerOrStorageSpace: [null, Validators.required],
          lockerOrStorageSpaceDesc: [''],
          otherAccessoriesOrDependenciesDesc: [''],
          furnitureIncluded: [null, Validators.required],
          appliances: this.formBuilder.group({
            stove: [null, Validators.required],
            microwaveOven: [null, Validators.required],              
            dishwasher: [null, Validators.required],
            refrigerator: [null, Validators.required],
            washer: [null, Validators.required],
            dryer: [null, Validators.required],         
          }),
          furniture: this.formBuilder.group({
            table: [null, Validators.required],
            tableNbr: [''],
            chairs: [null, Validators.required],
            chairsNbr: [''],
            chestOfDrawers: [null, Validators.required],
            chestOfDrawersNbr: [''],
            couch: [null, Validators.required],
            couchNbr: [''],
            armChair: [null, Validators.required],
            armChairNbr: [''],
            bed: [null, Validators.required],
            bedNbr: [''],
            bedSize: [''],
            otherFurniture: [null],
            otherFurnitureDesc: [''],
          }),
          smokeDetectorsRespectRegulations: this.formBuilder.group({
            lessorInitials: ['', Validators.required],
            lesseeInitials: ['', Validators.required],
            lessorDate: ['', Validators.required],
            lesseeDate: ['', Validators.required],
          })
        }),
      }),
    });
  }

  nextSection() {
    if (this.currentSection < this.totalSections - 1) {
      this.currentSection++;
    }
  }


  previousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
    }
  }

  isLastSection(): boolean {
    return this.currentSection === this.totalSections - 1;
  }

  onSubmit() {
    console.log(this.leaseForm.value);
    this.leaseService.createLease(this.leaseForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
