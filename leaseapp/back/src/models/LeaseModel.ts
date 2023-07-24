import mongoose, { Schema, Document } from 'mongoose';

interface ILessor extends Document {
  name: string;
  addressNo: string;
  streetAddress: string;
  apt: string;
  municipality: string;
  postalCode: string;
  telephoneNo: string;
  otherTelephoneNo: string;
  emailAddress: string;
  representedBy: string;
}

interface ILessee extends Document {
  name: string;
  addressNo: string;
  streetAddress: string;
  apt: string;
  municipality: string;
  postalCode: string;
  telephoneNo: string;
  otherTelephoneNo: string;
  emailAddress: string;
}

interface ISectionA extends Document {
  lessor: ILessor;
  lessee: ILessee;

}

interface IleaseDestinationAndDescription extends Document{
  addressNo: string;
  street: string;
  apt: string;
  municipality: string;
  postalCode: string;
  numberOfRooms: number;
  residentialOnly: boolean;
  combinedPurposes?: string; // Only used when residentialOnly is false
  unitUnderCoOwnership: boolean;
  outdoorParking: boolean;
  nbrOfOutdoorParkingPlaces?: number; // Only used when outdoorParking is true
  outdoorParkingPlaceNbr?: string; // Only used when outdoorParking is true
  indoorParking: boolean;
  nbrOfIndoorParkingPlaces?: number; // Only used when indoorParking is true
  indoorParkingPlaceNbr?: string; // Only used when indoorParking is true
  lockerOrStorageSpace: boolean;
  lockerOrStorageSpaceDesc?: string; // Only used when lockerOrStorageSpace is true
  otherAccessoriesOrDependenciesDesc: string; // Only used when otherAccessoriesOrDependencies is true
  furnitureIncluded: boolean;
  appliances?:{
      stove: boolean;
      microwaveOven: boolean;
      dishwasher: boolean;
      refrigerator: boolean;
      washer: boolean;
      dryer: boolean;
  };
  furniture?: {
      table: boolean;
      tableNbr?: number; // Only used when table is true
      Chairs: boolean;
      ChairsNbr?: number; // Only used when tableAndChairs is true
      chestOfDrawers: boolean;
      chestOfDrawersNbr?: number; // Only used when chestOfDrawers is true
      couch: boolean;
      couchNbr?: number; // Only used when couch is true
      armchair: boolean;
      armchairNbr?: number; // Only used when armchair is true
      bed: boolean;
      bedNbr?: number; // Only used when bed is true
      bedSize?: string; // Only used when bed is true
      otherFurniture: boolean;
      otherFurnitureDesc?: string; // Only used when otherFurniture is true
  };
  smokeDetectorsRespectRegulations:{
      lessorInitials: string
      lesseeInitials: string
      lessorDate: Date
      lesseeDate: Date  
  }

}


interface ISectionB extends Document {
  IleaseDestinationAndDescription: IleaseDestinationAndDescription;

}

interface ILease extends Document {
  sectionA: ISectionA;
  sectionB: ISectionB;
}

const lessorSchema = new Schema<ILessor>({
  name: { type: String, required: true },
  addressNo: { type: String, required: true },
  streetAddress: { type: String, required: true },
  apt: { type: String},
  municipality: { type: String, required: true },
  postalCode: { type: String, required: true },
  telephoneNo: { type: String, required: true },
  otherTelephoneNo: { type: String, required: true },
  emailAddress: { type: String, required: true },
  representedBy: { type: String }, // Optional field
});

const lesseeSchema = new Schema<ILessee>({
  name: { type: String, required: true },
  streetAddress: { type: String, required: true },
  apt: { type: String, required: true },
  municipality: { type: String, required: true },
  postalCode: { type: String, required: true },
  telephoneNo: { type: String, required: true },
  otherTelephoneNo: { type: String, required: true },
  emailAddress: { type: String, required: true },
});

const leaseDestinationAndDescriptionSchema = new Schema<IleaseDestinationAndDescription>({
  addressNo: { type: String, required: true },
  street: { type: String, required: true },
  apt: { type: String, required: true },
  municipality: { type: String, required: true },
  postalCode: { type: String, required: true },
  numberOfRooms: { type: Number, required: true },
  residentialOnly: { type: Boolean, required: true },
  combinedPurposes: { type: String, default: null, required: function () { return this.residentialOnly === false; } }, // Only used when residentialOnly is false
  unitUnderCoOwnership: { type: Boolean, required: true },
  outdoorParking: { type: Boolean, required: true },
  nbrOfOutdoorParkingPlaces: { type: Number, default: null, required: function () { return this.outdoorParking === true; } }, // Only used when outdoorParking is true
  outdoorParkingPlaceNbr: { type: String, default: null, required: function () { return this.outdoorParking === true; } }, // Only used when outdoorParking is true
  indoorParking: { type: Boolean, required: true },
  nbrOfIndoorParkingPlaces: { type: Number, default: null, required: function () { return this.indoorParking === true; } }, // Only used when indoorParking is true
  indoorParkingPlaceNbr: { type: String, default: null, required: function () { return this.indoorParking === true; } }, // Only used when indoorParking is true
  lockerOrStorageSpace: { type: Boolean, required: true },
  lockerOrStorageSpaceDesc: { type: String, default: null, required: function () { return this.lockerOrStorageSpace === true; } }, // Only used when lockerOrStorageSpace is true
  otherAccessoriesOrDependenciesDesc: { type: String, default: null }, 
  furnitureIncluded: { type: Boolean, required: true },
  appliances: { 
    stove: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    microwaveOven: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    dishwasher: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    refrigerator: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    washer: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    dryer: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
  },
  furniture: {
    table: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    tableNbr: { type: Number, default: null, required: function () { return this.table === true; } }, // Only used when table is true
    Chairs: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    ChairsNbr: { type: Number, default: null, required: function () { return this.Chairs === true; } }, // Only used when tableAndChairs is true
    chestOfDrawers: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    chestOfDrawersNbr: { type: Number, default: null, required: function () { return this.chestOfDrawers === true; } }, // Only used when chestOfDrawers is true
    couch: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    couchNbr: { type: Number, default: null, required: function () { return this.couch === true; } }, // Only used when couch is true
    armchair: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    armchairNbr: { type: Number, default: null, required: function () { return this.armchair === true; } }, // Only used when armchair is true
    bed: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    bedNbr: { type: Number, default: null, required: function () { return this.bed === true; } }, // Only used when bed is true
    bedSize: { type: String, default: null, required: function () { return this.bed === true; } }, // Only used when bed is true
    otherFurniture: { type: Boolean, default: false, required: function () { return this.furnitureIncluded === true; } },
    otherFurnitureDesc: { type: String, default: null, required: function () { return this.otherFurniture === true; } }, // Only used when otherFurniture is true
  },
  smokeDetectorsRespectRegulations: {
    lessorInitials: { type: String, required: true },
    lesseeInitials: { type: String, required: true },
    lessorDate: { type: Date, required: true },
    lesseeDate: { type: Date, required: true },
  },
});

const leaseSchema = new Schema<ILease>({

  sectionA: {
    lessor: lessorSchema,
    lessee: lesseeSchema,
  },
  sectionB: {
    leaseDestinationAndDescription: leaseDestinationAndDescriptionSchema,
  },
  
});


const LeaseModel = mongoose.model<ILease>('Lease', leaseSchema);

export { LeaseModel, ILease, ILessor, ILessee, ISectionA, ISectionB, IleaseDestinationAndDescription };
export default LeaseModel;


