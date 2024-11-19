import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Float']['output'];
  bidVehicle?: Maybe<Vehicle>;
  bidVehicleId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type BidOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type BidWhereUniqueInput = {
  bidVehicleId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum ContactUsStatusType {
  Created = 'created',
  Solved = 'solved'
}

export type CreateBidInput = {
  amount: Scalars['Float']['input'];
};

export type CreateEmdupdateInput = {
  vehicleBuyingLimitIncrement?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateEnquiryInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  state: StateNames;
  status?: InputMaybe<ContactUsStatusType>;
};

export type CreateEventInput = {
  bidLock?: InputMaybe<EventBidLockType>;
  downloadableFile_filename?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  eventCategory: EventCategory;
  extraTime?: InputMaybe<Scalars['Float']['input']>;
  extraTimeTrigerIn?: InputMaybe<Scalars['Float']['input']>;
  firstVehicleEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  gapInBetweenVehicles?: InputMaybe<Scalars['Float']['input']>;
  noOfBids: Scalars['Float']['input'];
  pauseDate?: InputMaybe<Scalars['DateTime']['input']>;
  pausedTotalTime?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<EventStatusType>;
  termsAndConditions: Scalars['String']['input'];
  vehicleLiveTimeIn?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateExceluploadInput = {
  file_filename: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateLocationInput = {
  name: Scalars['String']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  paymentFor: PaymentType;
  status?: InputMaybe<PaymentStatusType>;
};

export type CreateRecentsoldInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  soldDate?: InputMaybe<Scalars['String']['input']>;
  vehicleName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSellerInput = {
  GSTNumber?: InputMaybe<Scalars['String']['input']>;
  billingContactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nationalHead?: InputMaybe<Scalars['String']['input']>;
};

export type CreateStateInput = {
  name: StateNames;
};

export type CreateStatusInput = {
  comment: Scalars['String']['input'];
  status: PaymentStatusTypes;
};

export type CreateUserInput = {
  BalanceEMDAmount?: InputMaybe<Scalars['Float']['input']>;
  aadharcard_back_image?: InputMaybe<Scalars['String']['input']>;
  aadharcard_front_image?: InputMaybe<Scalars['String']['input']>;
  accessToken?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  driving_license_back_image?: InputMaybe<Scalars['String']['input']>;
  driving_license_front_image?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  idProofNo?: InputMaybe<Scalars['String']['input']>;
  idProofType?: InputMaybe<UserIdProofTypeType>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  pancardNo: Scalars['String']['input'];
  pancard_image?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
  state?: InputMaybe<StateNames>;
  status?: InputMaybe<UserStatusType>;
  tempToken?: InputMaybe<Scalars['Float']['input']>;
  userCategory?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVehicleInput = {
  YOM?: InputMaybe<Scalars['Float']['input']>;
  additionalRemarks?: InputMaybe<Scalars['String']['input']>;
  approxParkingCharges?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  auctionManager?: InputMaybe<Scalars['String']['input']>;
  autobseContact?: InputMaybe<Scalars['String']['input']>;
  autobse_contact_person?: InputMaybe<Scalars['String']['input']>;
  bidAmountUpdate?: InputMaybe<Scalars['Float']['input']>;
  bidStatus?: InputMaybe<VehicleBidStatusType>;
  buyerFees?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  chassisNo?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  clientContactNo?: InputMaybe<Scalars['String']['input']>;
  clientContactPerson?: InputMaybe<Scalars['String']['input']>;
  climateControl?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  currentBidAmount?: InputMaybe<Scalars['Float']['input']>;
  dateOfRegistration?: InputMaybe<Scalars['String']['input']>;
  doorCount?: InputMaybe<Scalars['Float']['input']>;
  engineNo?: InputMaybe<Scalars['String']['input']>;
  fitness?: InputMaybe<Scalars['String']['input']>;
  fuel?: InputMaybe<Scalars['String']['input']>;
  gearBox?: InputMaybe<Scalars['String']['input']>;
  hypothication?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  inspectionLink?: InputMaybe<Scalars['String']['input']>;
  insurance?: InputMaybe<Scalars['String']['input']>;
  insuranceStatus?: InputMaybe<Scalars['String']['input']>;
  insuranceValidTill?: InputMaybe<Scalars['String']['input']>;
  kmReading?: InputMaybe<Scalars['Float']['input']>;
  loanAgreementNo: Scalars['String']['input'];
  lotNumber?: InputMaybe<Scalars['Float']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  mileage?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  ownership?: InputMaybe<Scalars['Float']['input']>;
  parkingCharges?: InputMaybe<Scalars['String']['input']>;
  parkingRate?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  permit?: InputMaybe<Scalars['String']['input']>;
  powerSteering?: InputMaybe<Scalars['String']['input']>;
  quoteIncreament?: InputMaybe<Scalars['Float']['input']>;
  rcStatus?: InputMaybe<Scalars['String']['input']>;
  registeredOwnerName?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  repoDt?: InputMaybe<Scalars['String']['input']>;
  reservePrice?: InputMaybe<Scalars['Float']['input']>;
  rtoFine?: InputMaybe<Scalars['String']['input']>;
  shape?: InputMaybe<Scalars['String']['input']>;
  startBidAmount?: InputMaybe<Scalars['Float']['input']>;
  startPrice?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tax?: InputMaybe<Scalars['String']['input']>;
  taxValidityDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  varient?: InputMaybe<Scalars['String']['input']>;
  vehicleCondition?: InputMaybe<Scalars['String']['input']>;
  vehicleRemarks?: InputMaybe<Scalars['String']['input']>;
  veicleLocation?: InputMaybe<Scalars['String']['input']>;
  yardLocation?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVehiclecategoryInput = {
  name: Scalars['String']['input'];
};

export type EmdUpdateWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Emdupdate = {
  __typename?: 'Emdupdate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  emdNo: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  payment?: Maybe<Payment>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  vehicleBuyingLimitIncrement?: Maybe<Scalars['Float']['output']>;
};

export type Enquiry = {
  __typename?: 'Enquiry';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  message: Scalars['String']['output'];
  mobile: Scalars['String']['output'];
  state: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EnquiryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Event = {
  __typename?: 'Event';
  CompletedEventCount?: Maybe<Scalars['Int']['output']>;
  LiveEventCount?: Maybe<Scalars['Int']['output']>;
  Report?: Maybe<Scalars['JSON']['output']>;
  bidLock?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  deletedVehiclesCount?: Maybe<Scalars['Int']['output']>;
  downloadableFile_filename?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  eventCategory: Scalars['String']['output'];
  eventNo: Scalars['Float']['output'];
  extraTime?: Maybe<Scalars['Float']['output']>;
  extraTimeTrigerIn?: Maybe<Scalars['Float']['output']>;
  firstVehicleEndDate: Scalars['DateTime']['output'];
  gapInBetweenVehicles?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Location>;
  locationId: Scalars['String']['output'];
  noOfBids: Scalars['Float']['output'];
  pauseDate?: Maybe<Scalars['DateTime']['output']>;
  pausedTotalTime?: Maybe<Scalars['Float']['output']>;
  seller?: Maybe<Seller>;
  sellerId: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status?: Maybe<Scalars['String']['output']>;
  termsAndConditions: Scalars['String']['output'];
  totalEventsCount?: Maybe<Scalars['Int']['output']>;
  upcomingEventCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vehicleCategory?: Maybe<VehicleCategory>;
  vehicleCategoryId: Scalars['String']['output'];
  vehicleLiveTimeIn?: Maybe<Scalars['Float']['output']>;
  vehicles?: Maybe<Array<Vehicle>>;
  vehiclesCount?: Maybe<Scalars['Int']['output']>;
  vehiclesLive: Array<Vehicle>;
  vehiclesTemp: Array<Vehicle>;
  watchedBy?: Maybe<Array<User>>;
};


export type EventVehiclesArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type EventVehiclesLiveArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type EventVehiclesTempArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  completedEventCount?: Maybe<Scalars['Int']['output']>;
  deletedVehiclesCount?: Maybe<Scalars['Int']['output']>;
  events?: Maybe<Array<Event>>;
  liveEventCount?: Maybe<Scalars['Int']['output']>;
  totalBids?: Maybe<Scalars['Int']['output']>;
  totalEventsCount?: Maybe<Scalars['Int']['output']>;
  upcomingEventCount?: Maybe<Scalars['Int']['output']>;
  vehiclesCount: Scalars['Int']['output'];
};

export type EventOrderByInput = {
  bidLock?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  endDate?: InputMaybe<OrderDirection>;
  eventCategory?: InputMaybe<OrderDirection>;
  eventNo?: InputMaybe<OrderDirection>;
  extraTime?: InputMaybe<OrderDirection>;
  extraTimeTrigerIn?: InputMaybe<OrderDirection>;
  firstVehicleBidTimeExpire?: InputMaybe<OrderDirection>;
  gapInBetweenVehicles?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isSpecialEvent?: InputMaybe<OrderDirection>;
  noOfBids?: InputMaybe<OrderDirection>;
  pauseDate?: InputMaybe<OrderDirection>;
  pausedTotalTime?: InputMaybe<OrderDirection>;
  startDate?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  termsAndConditions?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  vehicleLiveTimeIn?: InputMaybe<OrderDirection>;
};

export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ExcelWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Excelupload = {
  __typename?: 'Excelupload';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  file_filename: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Location = {
  __typename?: 'Location';
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  state?: Maybe<State>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type LoginUserInput = {
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DeleteUserHardDelete: User;
  createBid: Bid;
  createEmdupdate: Emdupdate;
  createEnquiry: Enquiry;
  createEvent: Event;
  createExcelupload: Excelupload;
  createLocation: Location;
  createPayment: Payment;
  createRecentsold: Recentsold;
  createSeller: Seller;
  createState: State;
  createStatus: Status;
  createUser: User;
  createVehicle: Vehicle;
  createVehiclecategory: VehicleCategory;
  deleteBid: Bid;
  deleteEmdupdate: Emdupdate;
  deleteEnquiry: Enquiry;
  deleteEvent: Event;
  deleteExcelupload: Excelupload;
  deleteLocation: Location;
  deletePayment: Payment;
  deleteRecentsold: Recentsold;
  deleteSeller: Seller;
  deleteSellerHardDelete: Seller;
  deleteState: State;
  deleteStatus: Status;
  deleteUser: User;
  deleteVehicle: Vehicle;
  deleteVehiclecategory: VehicleCategory;
  login: LoginResponse;
  restoreEnquiry: Enquiry;
  restoreEvent: Event;
  restoreExcelUpload: Excelupload;
  restoreLocation: Location;
  restorePayment: Payment;
  restoreSeller: Seller;
  restoreStatus: Status;
  restoreUser: User;
  restoreVehicleCategory: VehicleCategory;
  restorevehicle: Vehicle;
  sendOtp: SendOtpResponse;
  updateBid: Bid;
  updateEmdupdate: Emdupdate;
  updateEnquiry: Enquiry;
  updateEvent: Event;
  updateLocation: Location;
  updatePayment: Payment;
  updateRecentsold: Recentsold;
  updateSeller: Seller;
  updateState: State;
  updateStatus: Status;
  updateUser: User;
  updateVehicle: Vehicle;
  updateVehicleCategory: VehicleCategory;
  verifyOtp: VerifyOtpResponse;
};


export type MutationDeleteUserHardDeleteArgs = {
  where: UserWhereUniqueInput;
};


export type MutationCreateBidArgs = {
  bidVehicleId: Scalars['String']['input'];
  createBidInput: CreateBidInput;
  userUniqueInput?: InputMaybe<UserWhereUniqueInput>;
};


export type MutationCreateEmdupdateArgs = {
  createEmdupdateInput: CreateEmdupdateInput;
  paymentId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateEnquiryArgs = {
  createEnquiryInput: CreateEnquiryInput;
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
  locationId: Scalars['String']['input'];
  sellerId: Scalars['String']['input'];
  vehicleCategoryId: Scalars['String']['input'];
};


export type MutationCreateExceluploadArgs = {
  createExceluploadInput: CreateExceluploadInput;
  eventId: Scalars['String']['input'];
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
  stateId: Scalars['String']['input'];
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateRecentsoldArgs = {
  createRecentsoldInput: CreateRecentsoldInput;
};


export type MutationCreateSellerArgs = {
  createSellerInput: CreateSellerInput;
};


export type MutationCreateStateArgs = {
  createStateInput: CreateStateInput;
};


export type MutationCreateStatusArgs = {
  createStatusInput: CreateStatusInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleInput;
  eventId: Scalars['String']['input'];
};


export type MutationCreateVehiclecategoryArgs = {
  createVehiclecategoryInput: CreateVehiclecategoryInput;
};


export type MutationDeleteBidArgs = {
  where: BidWhereUniqueInput;
};


export type MutationDeleteEmdupdateArgs = {
  where: EmdUpdateWhereUniqueInput;
};


export type MutationDeleteEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};


export type MutationDeleteEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteExceluploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type MutationDeleteLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationDeleteRecentsoldArgs = {
  where: RecentsoldWhereUniqueInput;
};


export type MutationDeleteSellerArgs = {
  where: SellerWhereUniqueInput;
};


export type MutationDeleteSellerHardDeleteArgs = {
  where: SellerWhereUniqueInput;
};


export type MutationDeleteStateArgs = {
  where: StateWhereUniqueInput;
};


export type MutationDeleteStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type MutationDeleteVehiclecategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type MutationLoginArgs = {
  loginInput: LoginUserInput;
};


export type MutationRestoreEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};


export type MutationRestoreEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationRestoreExcelUploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type MutationRestoreLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type MutationRestorePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationRestoreSellerArgs = {
  where: SellerWhereUniqueInput;
};


export type MutationRestoreStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type MutationRestoreUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationRestoreVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type MutationRestorevehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type MutationSendOtpArgs = {
  sendOtpDto: SendOtpDto;
};


export type MutationUpdateBidArgs = {
  updateBidInput: UpdateBidInput;
  where: BidWhereUniqueInput;
};


export type MutationUpdateEmdupdateArgs = {
  updateEmdupdateInput: UpdateEmdupdateInput;
  where: EmdUpdateWhereUniqueInput;
};


export type MutationUpdateEnquiryArgs = {
  updateEnquiryInput: UpdateEnquiryInput;
  where: EnquiryWhereUniqueInput;
};


export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput;
  where: LocationWhereUniqueInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
  where: PaymentWhereUniqueInput;
};


export type MutationUpdateRecentsoldArgs = {
  updateRecentsoldInput: UpdateRecentsoldInput;
  where: RecentsoldWhereUniqueInput;
};


export type MutationUpdateSellerArgs = {
  updateSellerInput: UpdateSellerInput;
  where: SellerWhereUniqueInput;
};


export type MutationUpdateStateArgs = {
  updateStateInput: UpdateStateInput;
  where: StateWhereUniqueInput;
};


export type MutationUpdateStatusArgs = {
  updateStatusInput: UpdateStatusInput;
  where: StatusWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateVehicleArgs = {
  updateVehicleInput: UpdateVehicleInput;
  where: VehicleWhereUniqueInput;
};


export type MutationUpdateVehicleCategoryArgs = {
  updateVehiclecategoryInput: UpdateVehiclecategoryInput;
  where: VehicleCategoryWhereUniqueInput;
};


export type MutationVerifyOtpArgs = {
  verfiyOtpDto: VerfiyOtpDto;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OtpMessageDataDto = {
  __typename?: 'OtpMessageDataDto';
  messageid: Scalars['String']['output'];
  totalcredit: Scalars['String']['output'];
  totnumber: Scalars['String']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  emdUpdate?: Maybe<Array<Emdupdate>>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  paymentFor?: Maybe<Scalars['String']['output']>;
  refNo?: Maybe<Scalars['Float']['output']>;
  registrationExpire?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum PaymentStatusType {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum PaymentStatusTypes {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum PaymentType {
  Emd = 'emd',
  OpenBids = 'openBids',
  Registrations = 'registrations'
}

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  Bid: Bid;
  Bids: Array<Bid>;
  Enquiries: Array<Enquiry>;
  Enquiry: Enquiry;
  State: State;
  States: Array<State>;
  completedEvents?: Maybe<Array<Event>>;
  deletedEnquiries: Array<Enquiry>;
  deletedEvent: Event;
  deletedEvents: Array<Event>;
  deletedLocation: Location;
  deletedLocations: Array<Location>;
  deletedPayment: Payment;
  deletedPayments: Array<Payment>;
  deletedSeller: Seller;
  deletedSellers: Array<Seller>;
  deletedState: State;
  deletedStates: Array<State>;
  deletedStatus: Status;
  deletedStatuses: Array<Status>;
  deletedUser?: Maybe<User>;
  deletedUserCount: Scalars['Int']['output'];
  deletedUsers: Array<Maybe<User>>;
  deletedVehicle: Vehicle;
  deletedVehicleCategories: Array<VehicleCategory>;
  deletedVehicleCategory: VehicleCategory;
  deletedVehicles: Array<Vehicle>;
  emdUpdate: Emdupdate;
  emdUpdates: Array<Emdupdate>;
  event: Event;
  events?: Maybe<EventListResponse>;
  eventsCount: Scalars['Int']['output'];
  excelUpload: Excelupload;
  excelUploads: Array<Excelupload>;
  getAcr?: Maybe<Scalars['JSON']['output']>;
  liveEvents?: Maybe<Array<Event>>;
  location: Location;
  locations: Array<Location>;
  locationsCount: Scalars['Int']['output'];
  payment: Payment;
  payments: Array<Payment>;
  paymentsCount: Scalars['Int']['output'];
  recentSold: Recentsold;
  recentSolds: Array<Recentsold>;
  restoreState: State;
  seller: Seller;
  sellers: Array<Seller>;
  sellersCount: Scalars['Int']['output'];
  status: Status;
  statuses: Array<Status>;
  time: Scalars['String']['output'];
  upcomingEvents?: Maybe<Array<Event>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount: Scalars['Int']['output'];
  vehicle: Vehicle;
  vehicleCategories: Array<VehicleCategory>;
  vehicleCategory: VehicleCategory;
  vehicleCategoryCount: Scalars['Int']['output'];
  vehicles?: Maybe<VehicleListResponse>;
  vehiclsCount: Scalars['Int']['output'];
};


export type QueryBidArgs = {
  where: BidWhereUniqueInput;
};


export type QueryBidsArgs = {
  where: BidWhereUniqueInput;
};


export type QueryEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};


export type QueryStateArgs = {
  where: StateWhereUniqueInput;
};


export type QueryCompletedEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryDeletedEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryDeletedLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryDeletedPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryDeletedSellerArgs = {
  where: SellerWhereUniqueInput;
};


export type QueryDeletedStateArgs = {
  where: StateWhereUniqueInput;
};


export type QueryDeletedStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type QueryDeletedUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryDeletedVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryDeletedVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type QueryEmdUpdateArgs = {
  where: EmdUpdateWhereUniqueInput;
};


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryEventsArgs = {
  options?: InputMaybe<QueryOptionsType>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryExcelUploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type QueryGetAcrArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryLiveEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryRecentSoldArgs = {
  where: RecentsoldWhereUniqueInput;
};


export type QueryRestoreStateArgs = {
  where: StateWhereUniqueInput;
};


export type QuerySellerArgs = {
  where: SellerWhereUniqueInput;
};


export type QueryStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type QueryUpcomingEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryUserArgs = {
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereUniqueInput>;
};


export type QueryVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type QueryVehiclesArgs = {
  orderBy?: InputMaybe<Array<BidOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  vehiclesOrderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  where?: InputMaybe<VehicleWhereUniqueInput>;
};

export type QueryOptionsType = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Recentsold = {
  __typename?: 'Recentsold';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  soldDate?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vehicleName?: Maybe<Scalars['String']['output']>;
};

export type RecentsoldWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Seller = {
  __typename?: 'Seller';
  GSTNumber: Scalars['String']['output'];
  billingContactPerson: Scalars['String']['output'];
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  mobile: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nationalHead: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SellerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SendOtpDto = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  pancardNo?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<StateNames>;
};

export type SendOtpResponse = {
  __typename?: 'SendOtpResponse';
  code: Scalars['String']['output'];
  data?: Maybe<OtpMessageDataDto>;
  description: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type State = {
  __typename?: 'State';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Array<Location>>;
  name: StateNames;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum StateNames {
  AndhraPradesh = 'Andhra_Pradesh',
  ArunachalPradesh = 'Arunachal_Pradesh',
  Assam = 'Assam',
  Bihar = 'Bihar',
  Chhattisgarh = 'Chhattisgarh',
  Delhi = 'Delhi',
  Goa = 'Goa',
  Gujarat = 'Gujarat',
  Haryana = 'Haryana',
  HimachalPradesh = 'Himachal_Pradesh',
  JammuAndKashmir = 'Jammu_and_Kashmir',
  Jharkhand = 'Jharkhand',
  Karnataka = 'Karnataka',
  Kerala = 'Kerala',
  MadhyaPradesh = 'Madhya_Pradesh',
  Maharashtra = 'Maharashtra',
  Manipur = 'Manipur',
  Meghalaya = 'Meghalaya',
  Mizoram = 'Mizoram',
  Nagaland = 'Nagaland',
  Odisha = 'Odisha',
  Punjab = 'Punjab',
  Rajasthan = 'Rajasthan',
  Sikkim = 'Sikkim',
  TamilNadu = 'TamilNadu',
  Telangana = 'Telangana',
  Tripura = 'Tripura',
  UttarPradesh = 'Uttar_Pradesh',
  Uttarakhand = 'Uttarakhand',
  WestBengal = 'West_Bengal'
}

export type StateWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Status = {
  __typename?: 'Status';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StatusWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  subscriptionBidCreation: Bid;
  subscriptionEventUpdates: Event;
  subscriptionUserUpdates: User;
  subscriptionVehicleUpdates: Vehicle;
};

export type UpdateBidInput = {
  amount: Scalars['Float']['input'];
};

export type UpdateEmdupdateInput = {
  paymentId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  vehicleBuyingLimitIncrement?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateEnquiryInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<StateNames>;
  status?: InputMaybe<ContactUsStatusType>;
};

export type UpdateEventInput = {
  bidLock: EventBidLockType;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  downloadableFile_filename?: InputMaybe<Scalars['String']['input']>;
  downloadableFile_filesize?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  eventCategory: EventCategory;
  extraTime?: InputMaybe<Scalars['Float']['input']>;
  extraTimeTrigerIn?: InputMaybe<Scalars['Float']['input']>;
  firstVehicleEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  gapInBetweenVehicles?: InputMaybe<Scalars['Float']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  noOfBids?: InputMaybe<Scalars['Float']['input']>;
  pauseDate?: InputMaybe<Scalars['DateTime']['input']>;
  pausedTotalTime?: InputMaybe<Scalars['Float']['input']>;
  sellerId?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: EventStatusType;
  termsAndConditions?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  vehicleCategoryId?: InputMaybe<Scalars['String']['input']>;
  vehicleLiveTimeIn?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateLocationInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  paymentFor: PaymentType;
  registrationExpire?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<PaymentStatusType>;
};

export type UpdateRecentsoldInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  soldDate?: InputMaybe<Scalars['String']['input']>;
  vehicleName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSellerInput = {
  GSTNumber?: InputMaybe<Scalars['String']['input']>;
  billingContactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationalHead?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStateInput = {
  createdById?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StateNames>;
};

export type UpdateStatusInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  status: PaymentStatusTypes;
};

export type UpdateUserInput = {
  BalanceEMDAmount?: InputMaybe<Scalars['Float']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  idProofNo?: InputMaybe<Scalars['String']['input']>;
  idProofType?: InputMaybe<UserIdProofTypeType>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  pancardNo?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
  state?: InputMaybe<StateNames>;
  states?: InputMaybe<Array<StateNames>>;
  status?: InputMaybe<UserStatusType>;
  tempToken?: InputMaybe<Scalars['Float']['input']>;
  userCategory?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  watchList?: InputMaybe<WatchListUpdateInput>;
};

export type UpdateVehicleInput = {
  YOM?: InputMaybe<Scalars['Float']['input']>;
  additionalRemarks?: InputMaybe<Scalars['String']['input']>;
  approxParkingCharges?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  auctionManager?: InputMaybe<Scalars['String']['input']>;
  autobseContact?: InputMaybe<Scalars['String']['input']>;
  autobse_contact_person?: InputMaybe<Scalars['String']['input']>;
  bidAmountUpdate?: InputMaybe<Scalars['Float']['input']>;
  bidStartTime?: InputMaybe<Scalars['String']['input']>;
  bidStatus?: InputMaybe<VehicleBidStatusType>;
  bidTimeExpire?: InputMaybe<Scalars['String']['input']>;
  buyerFees?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  chassisNo?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  clientContactNo?: InputMaybe<Scalars['String']['input']>;
  clientContactPerson?: InputMaybe<Scalars['String']['input']>;
  climateControl?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  currentBidAmount?: InputMaybe<Scalars['Float']['input']>;
  dateOfRegistration?: InputMaybe<Scalars['String']['input']>;
  doorCount?: InputMaybe<Scalars['Float']['input']>;
  engineNo?: InputMaybe<Scalars['String']['input']>;
  fitness?: InputMaybe<Scalars['String']['input']>;
  fuel?: InputMaybe<Scalars['String']['input']>;
  gearBox?: InputMaybe<Scalars['String']['input']>;
  hypothication?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  inspectionLink?: InputMaybe<Scalars['String']['input']>;
  insurance?: InputMaybe<Scalars['String']['input']>;
  insuranceStatus?: InputMaybe<Scalars['String']['input']>;
  insuranceValidTill?: InputMaybe<Scalars['String']['input']>;
  kmReading?: InputMaybe<Scalars['Float']['input']>;
  loanAgreementNo?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['Float']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  mileage?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  ownership?: InputMaybe<Scalars['Float']['input']>;
  parkingCharges?: InputMaybe<Scalars['String']['input']>;
  parkingRate?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  permit?: InputMaybe<Scalars['String']['input']>;
  powerSteering?: InputMaybe<Scalars['String']['input']>;
  quoteIncreament?: InputMaybe<Scalars['Float']['input']>;
  rcStatus?: InputMaybe<Scalars['String']['input']>;
  registeredOwnerName?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  repoDt?: InputMaybe<Scalars['String']['input']>;
  reservePrice?: InputMaybe<Scalars['Float']['input']>;
  rtoFine?: InputMaybe<Scalars['String']['input']>;
  shape?: InputMaybe<Scalars['String']['input']>;
  startBidAmount?: InputMaybe<Scalars['Float']['input']>;
  startPrice?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tax?: InputMaybe<Scalars['String']['input']>;
  taxValidityDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  varient?: InputMaybe<Scalars['String']['input']>;
  vehicleCondition?: InputMaybe<Scalars['String']['input']>;
  vehicleEventStatus?: InputMaybe<VehicleEventStatus>;
  vehicleRemarks?: InputMaybe<Scalars['String']['input']>;
  veicleLocation?: InputMaybe<Scalars['String']['input']>;
  yardLocation?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVehiclecategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  BalanceEMDAmount?: Maybe<Scalars['Float']['output']>;
  aadharcard_back_image?: Maybe<Scalars['String']['output']>;
  aadharcard_front_image?: Maybe<Scalars['String']['output']>;
  activeBids?: Maybe<Array<Vehicle>>;
  bid?: Maybe<Array<Bid>>;
  businessName: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  driving_license_back_image?: Maybe<Scalars['String']['output']>;
  driving_license_front_image?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emdUpdates?: Maybe<Array<Emdupdate>>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  idNo: Scalars['Float']['output'];
  idProofNo: Scalars['String']['output'];
  idProofType: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  mobile: Scalars['String']['output'];
  pancardNo: Scalars['String']['output'];
  pancard_image?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']['output']>;
  role: Scalars['String']['output'];
  state: Scalars['String']['output'];
  states?: Maybe<Array<State>>;
  status: Scalars['String']['output'];
  tempToken?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userCategory: Scalars['String']['output'];
  username: Scalars['String']['output'];
  vehicleBuyingLimit?: Maybe<Scalars['Int']['output']>;
  watchList?: Maybe<Array<Vehicle>>;
};

export enum UserIdProofTypeType {
  Aadhar = 'Aadhar',
  DrivingLicense = 'DrivingLicense',
  Passport = 'Passport'
}

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  idNo?: InputMaybe<OrderDirection>;
};

export enum UserRoleType {
  Admin = 'admin',
  Dealer = 'dealer',
  Seller = 'seller',
  Staff = 'staff'
}

export enum UserStatusType {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive',
  Pending = 'pending'
}

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  idNo?: InputMaybe<Scalars['Float']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  pancardNo?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
  state?: InputMaybe<StateNames>;
  tempToken?: InputMaybe<Scalars['Float']['input']>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  YOM?: Maybe<Scalars['Float']['output']>;
  additionalRemarks?: Maybe<Scalars['String']['output']>;
  approxParkingCharges?: Maybe<Scalars['String']['output']>;
  area?: Maybe<Scalars['String']['output']>;
  auctionManager?: Maybe<Scalars['String']['output']>;
  autobseContact?: Maybe<Scalars['String']['output']>;
  autobse_contact_person?: Maybe<Scalars['String']['output']>;
  bidAmountUpdate?: Maybe<Scalars['Float']['output']>;
  bidStartTime: Scalars['DateTime']['output'];
  bidStatus?: Maybe<Scalars['String']['output']>;
  bidTimeExpire: Scalars['DateTime']['output'];
  buyerFees?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  chassisNo?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clientContactNo?: Maybe<Scalars['String']['output']>;
  clientContactPerson?: Maybe<Scalars['String']['output']>;
  climateControl?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  currentBidAmount?: Maybe<Scalars['Float']['output']>;
  currentBidUser?: Maybe<User>;
  dateOfRegistration?: Maybe<Scalars['String']['output']>;
  doorCount?: Maybe<Scalars['Float']['output']>;
  engineNo?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Event>;
  fitness?: Maybe<Scalars['String']['output']>;
  fuel?: Maybe<Scalars['String']['output']>;
  gearBox?: Maybe<Scalars['String']['output']>;
  hypothication?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  inspectionLink?: Maybe<Scalars['String']['output']>;
  insurance?: Maybe<Scalars['String']['output']>;
  insuranceStatus?: Maybe<Scalars['String']['output']>;
  insuranceValidTill?: Maybe<Scalars['String']['output']>;
  kmReading?: Maybe<Scalars['Float']['output']>;
  loanAgreementNo: Scalars['String']['output'];
  lotNumber?: Maybe<Scalars['Float']['output']>;
  make?: Maybe<Scalars['String']['output']>;
  mileage?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  myBidRank?: Maybe<Scalars['Int']['output']>;
  ownership?: Maybe<Scalars['Float']['output']>;
  parkingCharges?: Maybe<Scalars['String']['output']>;
  parkingRate?: Maybe<Scalars['String']['output']>;
  paymentTerms?: Maybe<Scalars['String']['output']>;
  permit?: Maybe<Scalars['String']['output']>;
  powerSteering?: Maybe<Scalars['String']['output']>;
  quoteIncreament?: Maybe<Scalars['Float']['output']>;
  rcStatus?: Maybe<Scalars['String']['output']>;
  registeredOwnerName?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  repoDt?: Maybe<Scalars['String']['output']>;
  reservePrice?: Maybe<Scalars['Float']['output']>;
  rtoFine?: Maybe<Scalars['String']['output']>;
  shape?: Maybe<Scalars['String']['output']>;
  startBidAmount?: Maybe<Scalars['Float']['output']>;
  startPrice?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  tax?: Maybe<Scalars['String']['output']>;
  taxValidityDate?: Maybe<Scalars['String']['output']>;
  totalBids?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userVehicleBids?: Maybe<Array<Bid>>;
  userVehicleBidsCount?: Maybe<Scalars['Int']['output']>;
  varient?: Maybe<Scalars['String']['output']>;
  vehicleCondition?: Maybe<Scalars['String']['output']>;
  vehicleEventStatus?: Maybe<VehicleEventStatus>;
  vehicleIndexNo: Scalars['Float']['output'];
  vehicleRemarks?: Maybe<Scalars['String']['output']>;
  veicleLocation?: Maybe<Scalars['String']['output']>;
  watchedBy?: Maybe<Array<User>>;
  watchedByCount?: Maybe<Scalars['Int']['output']>;
  yardLocation?: Maybe<Scalars['String']['output']>;
};

export enum VehicleBidStatusType {
  Approved = 'approved',
  Declined = 'declined',
  Fulfilled = 'fulfilled',
  Pending = 'pending'
}

export type VehicleCategory = {
  __typename?: 'VehicleCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleCategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VehicleListResponse = {
  __typename?: 'VehicleListResponse';
  vehicles: Array<Vehicle>;
  vehiclesCount: Scalars['Int']['output'];
};

export type VehicleOrderByInput = {
  bidTimeExpire?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type VehicleWhereUniqueInput = {
  bidTimeExpire?: InputMaybe<IdFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  userVehicleBids?: InputMaybe<BidWhereUniqueInput>;
};

export type VerfiyOtpDto = {
  mobile: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type VerifyOtpResponse = {
  __typename?: 'VerifyOtpResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type WatchListUpdateInput = {
  connect?: InputMaybe<Array<VehicleWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<VehicleWhereUniqueInput>>;
};

export enum EventBidLockType {
  Locked = 'Locked',
  Unlocked = 'Unlocked'
}

export enum EventCategory {
  Online = 'online',
  Open = 'open'
}

export enum EventStatusType {
  Active = 'Active',
  Blocked = 'Blocked',
  Inactive = 'Inactive',
  Pause = 'Pause',
  Pending = 'Pending',
  Stop = 'Stop'
}

export enum VehicleEventStatus {
  Abnormal = 'abnormal',
  Completed = 'completed',
  Live = 'live',
  Upcoming = 'upcoming'
}

export type DeletedVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type DeletedVehiclesQuery = { __typename?: 'Query', deletedVehicles: Array<{ __typename?: 'Vehicle', id: string, lotNumber?: number | null, registrationNumber: string, bidStatus?: string | null, bidTimeExpire: any, loanAgreementNo: string, quoteIncreament?: number | null, make?: string | null, model?: string | null, varient?: string | null, type?: string | null, rcStatus?: string | null, yardLocation?: string | null, reservePrice?: number | null, repoDt?: string | null, veicleLocation?: string | null, vehicleRemarks?: string | null, auctionManager?: string | null, parkingCharges?: string | null, insuranceValidTill?: string | null, tax?: string | null, totalBids?: number | null, engineNo?: string | null, color?: string | null, city?: string | null, area?: string | null, state?: string | null, dateOfRegistration?: string | null }> };

export type DeletedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type DeletedUsersQuery = { __typename?: 'Query', deletedUsers: Array<{ __typename?: 'User', id: string, idNo: number, email: string, username: string, role: string, firstName: string, lastName: string, mobile: string, city: string, state: string, paymentsCount?: number | null } | null> };

export type ActiveBidsPerUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type ActiveBidsPerUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, states?: Array<{ __typename?: 'State', id: string, name: StateNames }> | null, activeBids?: Array<{ __typename?: 'Vehicle', vehicleIndexNo: number, make?: string | null, bidAmountUpdate?: number | null, startBidAmount?: number | null, currentBidAmount?: number | null, id: string, registrationNumber: string, bidStatus?: string | null, bidTimeExpire: any, totalBids?: number | null, userVehicleBidsCount?: number | null, currentBidUser?: { __typename?: 'User', username: string, firstName: string, lastName: string, pancardNo: string, mobile: string } | null, event?: { __typename?: 'Event', seller?: { __typename?: 'Seller', name: string } | null } | null }> | null } | null };

export type CreateSellerMutationVariables = Exact<{
  createSellerInput: CreateSellerInput;
}>;


export type CreateSellerMutation = { __typename?: 'Mutation', createSeller: { __typename?: 'Seller', name: string, contactPerson?: string | null, GSTNumber: string, billingContactPerson: string, mobile: string, nationalHead: string, logo: string } };

export type AddUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, username: string, role: string, firstName: string, lastName: string, mobile: string, status: string, city: string, pancardNo: string, BalanceEMDAmount?: number | null } };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', id: string, name: string, createdAt?: any | null, updatedAt?: any | null, country?: string | null, createdById?: string | null, state?: { __typename?: 'State', name: StateNames } | null }> };

export type LoginMutationVariables = Exact<{
  loginInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, role: string, firstName: string } } };

export type BidDetailsPerVehicleQueryVariables = Exact<{
  where: VehicleWhereUniqueInput;
}>;


export type BidDetailsPerVehicleQuery = { __typename?: 'Query', vehicle: { __typename?: 'Vehicle', id: string, lotNumber?: number | null, yardLocation?: string | null, totalBids?: number | null, registrationNumber: string, bidStatus?: string | null, userVehicleBidsCount?: number | null, currentBidUser?: { __typename?: 'User', firstName: string, lastName: string, mobile: string } | null, event?: { __typename?: 'Event', seller?: { __typename?: 'Seller', name: string } | null } | null, userVehicleBids?: Array<{ __typename?: 'Bid', createdAt?: any | null, id: string, amount: number, bidVehicleId: string, userId: string, user?: { __typename?: 'User', firstName: string, mobile: string, lastName: string } | null }> | null } };

export type BidDetailsQueryVariables = Exact<{
  where: BidWhereUniqueInput;
}>;


export type BidDetailsQuery = { __typename?: 'Query', Bids: Array<{ __typename?: 'Bid', createdAt?: any | null, id: string, amount: number, bidVehicleId: string, userId: string, bidVehicle?: { __typename?: 'Vehicle', lotNumber?: number | null, yardLocation?: string | null, totalBids?: number | null, registrationNumber: string, bidStatus?: string | null, userVehicleBidsCount?: number | null, currentBidUser?: { __typename?: 'User', firstName: string, lastName: string, mobile: string } | null, event?: { __typename?: 'Event', seller?: { __typename?: 'Seller', name: string } | null } | null } | null, user?: { __typename?: 'User', firstName: string, mobile: string, lastName: string } | null }> };

export type BuyingLimitQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type BuyingLimitQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, emdUpdates?: Array<{ __typename?: 'Emdupdate', id: string, emdNo: number, vehicleBuyingLimitIncrement?: number | null, createdAt?: any | null, createdById?: string | null, payment?: { __typename?: 'Payment', amount?: number | null, id: string } | null, createdBy?: { __typename?: 'User', id: string, firstName: string } | null }> | null } | null };

export type CountsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountsQuery = { __typename?: 'Query', usersCount: number, locationsCount: number, vehicleCategoryCount: number, sellersCount: number, vehiclsCount: number, eventsCount: number, paymentsCount: number };

export type CreateEventMutationVariables = Exact<{
  vehicleCategoryId: Scalars['String']['input'];
  locationId: Scalars['String']['input'];
  createEventInput: CreateEventInput;
  sellerId: Scalars['String']['input'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, createdById?: string | null, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, gapInBetweenVehicles?: number | null, id: string, locationId: string, noOfBids: number, pausedTotalTime?: number | null, pauseDate?: any | null, sellerId: string, startDate: any, status?: string | null, termsAndConditions: string, updatedAt?: any | null, vehicleCategoryId: string, vehicleLiveTimeIn?: number | null } };

export type CreateEmdupdateMutationVariables = Exact<{
  paymentId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  createEmdupdateInput: CreateEmdupdateInput;
}>;


export type CreateEmdupdateMutation = { __typename?: 'Mutation', createEmdupdate: { __typename?: 'Emdupdate', id: string, vehicleBuyingLimitIncrement?: number | null, createdAt?: any | null, user?: { __typename?: 'User', firstName: string, lastName: string, username: string } | null, payment?: { __typename?: 'Payment', amount?: number | null, paymentFor?: string | null } | null, createdBy?: { __typename?: 'User', email: string } | null } };

export type EmdTableQueryVariables = Exact<{
  where: PaymentWhereUniqueInput;
}>;


export type EmdTableQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: string, paymentFor?: string | null, emdUpdate?: Array<{ __typename?: 'Emdupdate', id: string, createdAt?: any | null, emdNo: number, vehicleBuyingLimitIncrement?: number | null, createdBy?: { __typename?: 'User', firstName: string, id: string } | null, payment?: { __typename?: 'Payment', amount?: number | null } | null }> | null } };

export type CreateLocationMutationVariables = Exact<{
  createLocationInput: CreateLocationInput;
  stateId: Scalars['String']['input'];
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'Location', id: string, name: string, state?: { __typename?: 'State', name: StateNames } | null } };

export type CreateVehicleMutationVariables = Exact<{
  eventId: Scalars['String']['input'];
  createVehicleInput: CreateVehicleInput;
}>;


export type CreateVehicleMutation = { __typename?: 'Mutation', createVehicle: { __typename?: 'Vehicle', id: string, vehicleIndexNo: number, registrationNumber: string, bidTimeExpire: any, bidStartTime: any, bidAmountUpdate?: number | null, currentBidAmount?: number | null, startBidAmount?: number | null, loanAgreementNo: string, registeredOwnerName?: string | null, quoteIncreament?: number | null, make?: string | null, model?: string | null, varient?: string | null, category?: string | null, fuel?: string | null, type?: string | null, rcStatus?: string | null, YOM?: number | null, ownership?: number | null, mileage?: number | null, kmReading?: number | null, insuranceStatus?: string | null, yardLocation?: string | null, startPrice?: number | null, reservePrice?: number | null, repoDt?: string | null, veicleLocation?: string | null, vehicleRemarks?: string | null, auctionManager?: string | null, parkingCharges?: string | null, insurance?: string | null, insuranceValidTill?: string | null, tax?: string | null, taxValidityDate?: string | null, fitness?: string | null, permit?: string | null, engineNo?: string | null, chassisNo?: string | null, image?: string | null, inspectionLink?: string | null, autobseContact?: string | null, autobse_contact_person?: string | null, vehicleCondition?: string | null, powerSteering?: string | null, shape?: string | null, color?: string | null, city?: string | null, area?: string | null, paymentTerms?: string | null, dateOfRegistration?: string | null, hypothication?: string | null, climateControl?: string | null, doorCount?: number | null, gearBox?: string | null, buyerFees?: string | null, rtoFine?: string | null, parkingRate?: string | null, approxParkingCharges?: string | null, clientContactPerson?: string | null, clientContactNo?: string | null, additionalRemarks?: string | null, lotNumber?: number | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null } };

export type CreateBidMutationVariables = Exact<{
  createBidInput: CreateBidInput;
  bidVehicleId: Scalars['String']['input'];
  userUniqueInput?: InputMaybe<UserWhereUniqueInput>;
}>;


export type CreateBidMutation = { __typename?: 'Mutation', createBid: { __typename?: 'Bid', id: string, name: string } };

export type UpdateEventMutationVariables = Exact<{
  where: EventWhereUniqueInput;
  updateEventInput: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: string, eventNo: number } };

export type SingleEventQueryVariables = Exact<{
  where: EventWhereUniqueInput;
}>;


export type SingleEventQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: string, eventNo: number, eventCategory: string, startDate: any, endDate: any, firstVehicleEndDate: any, pauseDate?: any | null, pausedTotalTime?: number | null, sellerId: string, vehicleCategoryId: string, locationId: string, noOfBids: number, downloadableFile_filename?: string | null, termsAndConditions: string, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, extraTimeTrigerIn?: number | null, extraTime?: number | null, vehicleLiveTimeIn?: number | null, gapInBetweenVehicles?: number | null, status?: string | null, bidLock?: string | null, vehiclesCount?: number | null, Report?: any | null } };

export type UpdateLocationMutationVariables = Exact<{
  where: LocationWhereUniqueInput;
  updateLocationInput: UpdateLocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'Location', id: string, name: string, state?: { __typename?: 'State', name: StateNames } | null } };

export type PaymentQueryVariables = Exact<{
  where: PaymentWhereUniqueInput;
}>;


export type PaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: string, refNo?: number | null, amount?: number | null, description?: string | null, status?: string | null, userId?: string | null, image?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, registrationExpire?: any | null, paymentFor?: string | null, user?: { __typename?: 'User', firstName: string, username: string } | null } };

export type UpdatePaymentMutationVariables = Exact<{
  where: PaymentWhereUniqueInput;
  updatePaymentInput: UpdatePaymentInput;
}>;


export type UpdatePaymentMutation = { __typename?: 'Mutation', updatePayment: { __typename?: 'Payment', id: string, refNo?: number | null, amount?: number | null, description?: string | null, status?: string | null, userId?: string | null, image?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, registrationExpire?: any | null, paymentFor?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', email: string, username: string, role: string, firstName: string, lastName: string, businessName: string, mobile: string, BalanceEMDAmount?: number | null, pancardNo: string, idProofNo: string, country: string, city: string, userCategory: string, tempToken?: number | null, status: string, id: string } };

export type DeleteUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, role: string, firstName: string } };

export type RestoreUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type RestoreUserMutation = { __typename?: 'Mutation', restoreUser: { __typename?: 'User', id: string, email: string, firstName: string } };

export type EmdUpdatesPerPaymentQueryVariables = Exact<{
  where: PaymentWhereUniqueInput;
}>;


export type EmdUpdatesPerPaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', emdUpdate?: Array<{ __typename?: 'Emdupdate', emdNo: number, id: string, vehicleBuyingLimitIncrement?: number | null, payment?: { __typename?: 'Payment', id: string, amount?: number | null } | null, user?: { __typename?: 'User', mobile: string, firstName: string, lastName: string } | null, createdBy?: { __typename?: 'User', id: string, firstName: string } | null }> | null } };

export type EventsQueryVariables = Exact<{
  where?: InputMaybe<EventWhereUniqueInput>;
  orderBy?: InputMaybe<Array<EventOrderByInput> | EventOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventListResponse', events?: Array<{ __typename?: 'Event', bidLock?: string | null, deletedVehiclesCount?: number | null, id: string, eventNo: number, Report?: any | null, eventCategory: string, startDate: any, endDate: any, pauseDate?: any | null, pausedTotalTime?: number | null, sellerId: string, vehicleCategoryId: string, noOfBids: number, downloadableFile_filename?: string | null, termsAndConditions: string, createdAt?: any | null, updatedAt?: any | null, extraTimeTrigerIn?: number | null, extraTime?: number | null, vehicleLiveTimeIn?: number | null, gapInBetweenVehicles?: number | null, status?: string | null, vehiclesCount?: number | null, seller?: { __typename?: 'Seller', name: string } | null, location?: { __typename?: 'Location', name: string } | null }> | null } | null };

export type EventQueryVariables = Exact<{
  where: EventWhereUniqueInput;
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: string, eventNo: number, eventCategory: string, startDate: any, endDate: any, pauseDate?: any | null, pausedTotalTime?: number | null, sellerId: string, vehicleCategoryId: string, locationId: string, noOfBids: number, downloadableFile_filename?: string | null, termsAndConditions: string, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, extraTimeTrigerIn?: number | null, extraTime?: number | null, vehicleLiveTimeIn?: number | null, gapInBetweenVehicles?: number | null, status?: string | null, bidLock?: string | null } };

export type EventVehiclesQueryVariables = Exact<{
  where: EventWhereUniqueInput;
  orderBy?: InputMaybe<Array<VehicleOrderByInput> | VehicleOrderByInput>;
}>;


export type EventVehiclesQuery = { __typename?: 'Query', event: { __typename?: 'Event', eventNo: number, seller?: { __typename?: 'Seller', name: string } | null, vehiclesLive: Array<{ __typename?: 'Vehicle', lotNumber?: number | null, state?: string | null, id: string, bidStatus?: string | null, vehicleIndexNo: number, registrationNumber: string, bidTimeExpire: any, bidStartTime: any, bidAmountUpdate?: number | null, currentBidAmount?: number | null, startBidAmount?: number | null, loanAgreementNo: string, registeredOwnerName?: string | null, quoteIncreament?: number | null, make?: string | null, model?: string | null, varient?: string | null, category?: string | null, createdById?: string | null, ownership?: number | null, insuranceStatus?: string | null, yardLocation?: string | null, startPrice?: number | null, reservePrice?: number | null, veicleLocation?: string | null, parkingCharges?: string | null, insuranceValidTill?: string | null, tax?: string | null, taxValidityDate?: string | null, city?: string | null, area?: string | null, paymentTerms?: string | null, dateOfRegistration?: string | null, hypothication?: string | null, totalBids?: number | null, createdAt?: any | null, updatedAt?: any | null, userVehicleBids?: Array<{ __typename?: 'Bid', amount: number }> | null, event?: { __typename?: 'Event', deletedVehiclesCount?: number | null, seller?: { __typename?: 'Seller', name: string } | null } | null, currentBidUser?: { __typename?: 'User', firstName: string, lastName: string } | null }> } };

export type CreateExceluploadMutationVariables = Exact<{
  eventId: Scalars['String']['input'];
  createExceluploadInput: CreateExceluploadInput;
}>;


export type CreateExceluploadMutation = { __typename?: 'Mutation', createExcelupload: { __typename?: 'Excelupload', id: string, name?: string | null, file_filename: string, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null } };

export type SellerQueryVariables = Exact<{
  where: SellerWhereUniqueInput;
}>;


export type SellerQuery = { __typename?: 'Query', seller: { __typename?: 'Seller', name: string, contactPerson?: string | null, GSTNumber: string, billingContactPerson: string, mobile: string, nationalHead: string, logo: string, updatedAt: any, createdAt: any, createdById?: string | null, id: string } };

export type UpdateSellerMutationVariables = Exact<{
  where: SellerWhereUniqueInput;
  updateSellerInput: UpdateSellerInput;
}>;


export type UpdateSellerMutation = { __typename?: 'Mutation', updateSeller: { __typename?: 'Seller', name: string, contactPerson?: string | null, GSTNumber: string, billingContactPerson: string, mobile: string, nationalHead: string, logo: string, createdAt: any, updatedAt: any, createdById?: string | null, id: string } };

export type LocationQueryVariables = Exact<{
  where: LocationWhereUniqueInput;
}>;


export type LocationQuery = { __typename?: 'Query', location: { __typename?: 'Location', id: string, name: string, createdAt?: any | null, updatedAt?: any | null, country?: string | null, createdById?: string | null } };

export type SendOtpMutationVariables = Exact<{
  sendOtpDto: SendOtpDto;
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'SendOtpResponse', code: string, status: string, description: string, data?: { __typename?: 'OtpMessageDataDto', messageid: string, totnumber: string, totalcredit: string } | null } };

export type VerifyOtpMutationVariables = Exact<{
  verfiyOtpDto: VerfiyOtpDto;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'VerifyOtpResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, role: string, firstName: string } } };

export type PaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentsQuery = { __typename?: 'Query', payments: Array<{ __typename?: 'Payment', id: string, refNo?: number | null, amount?: number | null, description?: string | null, status?: string | null, userId?: string | null, image?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, registrationExpire?: any | null, paymentFor?: string | null, user?: { __typename?: 'User', firstName: string, mobile: string } | null }> };

export type CreatePaymentMutationVariables = Exact<{
  createPaymentInput: CreatePaymentInput;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: string, refNo?: number | null, amount?: number | null, description?: string | null, status?: string | null, userId?: string | null, image?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, registrationExpire?: any | null, paymentFor?: string | null } };

export type UserPaymentsQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type UserPaymentsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, payments?: Array<{ __typename?: 'Payment', refNo?: number | null, amount?: number | null, description?: string | null, id: string, status?: string | null, userId?: string | null, image?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, registrationExpire?: any | null, paymentFor?: string | null }> | null } | null };

export type SellersQueryVariables = Exact<{ [key: string]: never; }>;


export type SellersQuery = { __typename?: 'Query', sellers: Array<{ __typename?: 'Seller', id: string, name: string, contactPerson?: string | null, GSTNumber: string, billingContactPerson: string, mobile: string, nationalHead: string, logo: string, createdAt: any, updatedAt: any, createdById?: string | null }> };

export type CreateStateMutationVariables = Exact<{
  createStateInput: CreateStateInput;
}>;


export type CreateStateMutation = { __typename?: 'Mutation', createState: { __typename?: 'State', id: string, name: StateNames } };

export type StatesQueryVariables = Exact<{ [key: string]: never; }>;


export type StatesQuery = { __typename?: 'Query', States: Array<{ __typename?: 'State', id: string, name: StateNames, createdAt?: any | null }> };

export type UpdateStateMutationVariables = Exact<{
  where: StateWhereUniqueInput;
  updateStateInput: UpdateStateInput;
}>;


export type UpdateStateMutation = { __typename?: 'Mutation', updateState: { __typename?: 'State', id: string, name: StateNames, createdAt?: any | null } };

export type SubscriptionBidCreationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionBidCreationSubscription = { __typename?: 'Subscription', subscriptionBidCreation: { __typename?: 'Bid', id: string } };

export type SubscriptionUserUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionUserUpdatesSubscription = { __typename?: 'Subscription', subscriptionUserUpdates: { __typename?: 'User', id: string } };

export type ViewUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type ViewUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, idNo: number, email: string, vehicleBuyingLimit?: number | null, username: string, role: string, state: string, firstName: string, lastName: string, businessName: string, mobile: string, BalanceEMDAmount?: number | null, pancardNo: string, idProofNo: string, country: string, city: string, userCategory: string, paymentsCount?: number | null, status: string, tempToken?: number | null, aadharcard_front_image?: string | null, aadharcard_back_image?: string | null, driving_license_front_image?: string | null, driving_license_back_image?: string | null, pancard_image?: string | null, states?: Array<{ __typename?: 'State', id: string, name: StateNames }> | null, activeBids?: Array<{ __typename?: 'Vehicle', id: string }> | null } | null };

export type UsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderByInput> | UserOrderByInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, email: string, role: string, firstName: string, BalanceEMDAmount?: number | null, country: string, state: string, city: string, userCategory: string, status: string, vehicleBuyingLimit?: number | null, paymentsCount?: number | null, idNo: number, mobile: string, lastName: string, activeBids?: Array<{ __typename?: 'Vehicle', id: string }> | null, states?: Array<{ __typename?: 'State', id: string, name: StateNames }> | null }> | null };

export type UsersByStateQueryVariables = Exact<{
  where?: InputMaybe<UserWhereUniqueInput>;
}>;


export type UsersByStateQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, email: string, role: string, firstName: string, BalanceEMDAmount?: number | null, country: string, city: string, userCategory: string, status: string, vehicleBuyingLimit?: number | null, paymentsCount?: number | null, idNo: number, mobile: string, lastName: string, states?: Array<{ __typename?: 'State', id: string, name: StateNames }> | null }> | null };

export type CreateVehiclecategoryMutationVariables = Exact<{
  createVehiclecategoryInput: CreateVehiclecategoryInput;
}>;


export type CreateVehiclecategoryMutation = { __typename?: 'Mutation', createVehiclecategory: { __typename?: 'VehicleCategory', createdAt?: any | null, createdById?: string | null, id: string, name: string, updatedAt?: any | null } };

export type VehicleCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type VehicleCategoriesQuery = { __typename?: 'Query', vehicleCategories: Array<{ __typename?: 'VehicleCategory', createdAt?: any | null, createdById?: string | null, id: string, name: string, updatedAt?: any | null }> };

export type VehicleCategoryQueryVariables = Exact<{
  where: VehicleCategoryWhereUniqueInput;
}>;


export type VehicleCategoryQuery = { __typename?: 'Query', vehicleCategory: { __typename?: 'VehicleCategory', createdAt?: any | null, createdById?: string | null, id: string, name: string, updatedAt?: any | null } };

export type UpdateVehicleCategoryMutationVariables = Exact<{
  where: VehicleCategoryWhereUniqueInput;
  updateVehiclecategoryInput: UpdateVehiclecategoryInput;
}>;


export type UpdateVehicleCategoryMutation = { __typename?: 'Mutation', updateVehicleCategory: { __typename?: 'VehicleCategory', id: string } };

export type SubscriptionVehicleUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionVehicleUpdatesSubscription = { __typename?: 'Subscription', subscriptionVehicleUpdates: { __typename?: 'Vehicle', id: string } };

export type VehicleQueryVariables = Exact<{
  where: VehicleWhereUniqueInput;
}>;


export type VehicleQuery = { __typename?: 'Query', vehicle: { __typename?: 'Vehicle', id: string, vehicleIndexNo: number, registrationNumber: string, bidTimeExpire: any, bidStartTime: any, bidAmountUpdate?: number | null, currentBidAmount?: number | null, startBidAmount?: number | null, loanAgreementNo: string, registeredOwnerName?: string | null, quoteIncreament?: number | null, make?: string | null, model?: string | null, varient?: string | null, category?: string | null, fuel?: string | null, type?: string | null, rcStatus?: string | null, YOM?: number | null, ownership?: number | null, mileage?: number | null, kmReading?: number | null, insuranceStatus?: string | null, yardLocation?: string | null, startPrice?: number | null, reservePrice?: number | null, repoDt?: string | null, veicleLocation?: string | null, vehicleRemarks?: string | null, auctionManager?: string | null, parkingCharges?: string | null, insurance?: string | null, insuranceValidTill?: string | null, tax?: string | null, taxValidityDate?: string | null, fitness?: string | null, permit?: string | null, engineNo?: string | null, chassisNo?: string | null, image?: string | null, inspectionLink?: string | null, autobseContact?: string | null, autobse_contact_person?: string | null, vehicleCondition?: string | null, powerSteering?: string | null, shape?: string | null, color?: string | null, city?: string | null, area?: string | null, paymentTerms?: string | null, dateOfRegistration?: string | null, hypothication?: string | null, climateControl?: string | null, doorCount?: number | null, gearBox?: string | null, buyerFees?: string | null, rtoFine?: string | null, parkingRate?: string | null, approxParkingCharges?: string | null, clientContactPerson?: string | null, clientContactNo?: string | null, additionalRemarks?: string | null, lotNumber?: number | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null } };

export type UpdateVehicleMutationVariables = Exact<{
  where: VehicleWhereUniqueInput;
  updateVehicleInput: UpdateVehicleInput;
}>;


export type UpdateVehicleMutation = { __typename?: 'Mutation', updateVehicle: { __typename?: 'Vehicle', id: string, vehicleIndexNo: number, registrationNumber: string, bidTimeExpire: any, bidStartTime: any, bidAmountUpdate?: number | null, currentBidAmount?: number | null, startBidAmount?: number | null, loanAgreementNo: string, registeredOwnerName?: string | null, quoteIncreament?: number | null, make?: string | null, model?: string | null, varient?: string | null, category?: string | null, fuel?: string | null, type?: string | null, rcStatus?: string | null, YOM?: number | null, ownership?: number | null, mileage?: number | null, kmReading?: number | null, insuranceStatus?: string | null, yardLocation?: string | null, startPrice?: number | null, reservePrice?: number | null, repoDt?: string | null, veicleLocation?: string | null, vehicleRemarks?: string | null, auctionManager?: string | null, parkingCharges?: string | null, insurance?: string | null, insuranceValidTill?: string | null, tax?: string | null, taxValidityDate?: string | null, fitness?: string | null, permit?: string | null, engineNo?: string | null, chassisNo?: string | null, image?: string | null, inspectionLink?: string | null, autobseContact?: string | null, autobse_contact_person?: string | null, vehicleCondition?: string | null, powerSteering?: string | null, shape?: string | null, color?: string | null, bidStatus?: string | null, city?: string | null, area?: string | null, paymentTerms?: string | null, dateOfRegistration?: string | null, hypothication?: string | null, climateControl?: string | null, doorCount?: number | null, gearBox?: string | null, buyerFees?: string | null, rtoFine?: string | null, parkingRate?: string | null, approxParkingCharges?: string | null, clientContactPerson?: string | null, clientContactNo?: string | null, additionalRemarks?: string | null, lotNumber?: number | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null } };

export type UpdateDateMutationVariables = Exact<{
  where: VehicleWhereUniqueInput;
  updateVehicleInput: UpdateVehicleInput;
}>;


export type UpdateDateMutation = { __typename?: 'Mutation', updateVehicle: { __typename?: 'Vehicle', id: string } };

export type DeleteVehicleMutationVariables = Exact<{
  where: VehicleWhereUniqueInput;
}>;


export type DeleteVehicleMutation = { __typename?: 'Mutation', deleteVehicle: { __typename?: 'Vehicle', id: string, registrationNumber: string, vehicleIndexNo: number } };

export type RestorevehicleMutationVariables = Exact<{
  where: VehicleWhereUniqueInput;
}>;


export type RestorevehicleMutation = { __typename?: 'Mutation', restorevehicle: { __typename?: 'Vehicle', id: string, vehicleIndexNo: number, registrationNumber: string } };


export const DeletedVehiclesDocument = gql`
    query DeletedVehicles {
  deletedVehicles {
    id
    lotNumber
    registrationNumber
    bidStatus
    bidTimeExpire
    loanAgreementNo
    quoteIncreament
    make
    model
    varient
    type
    rcStatus
    yardLocation
    reservePrice
    repoDt
    veicleLocation
    vehicleRemarks
    auctionManager
    parkingCharges
    insuranceValidTill
    tax
    totalBids
    engineNo
    color
    city
    area
    state
    dateOfRegistration
  }
}
    `;

/**
 * __useDeletedVehiclesQuery__
 *
 * To run a query within a React component, call `useDeletedVehiclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeletedVehiclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedVehiclesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDeletedVehiclesQuery(baseOptions?: Apollo.QueryHookOptions<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>(DeletedVehiclesDocument, options);
      }
export function useDeletedVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>(DeletedVehiclesDocument, options);
        }
export function useDeletedVehiclesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>(DeletedVehiclesDocument, options);
        }
export type DeletedVehiclesQueryHookResult = ReturnType<typeof useDeletedVehiclesQuery>;
export type DeletedVehiclesLazyQueryHookResult = ReturnType<typeof useDeletedVehiclesLazyQuery>;
export type DeletedVehiclesSuspenseQueryHookResult = ReturnType<typeof useDeletedVehiclesSuspenseQuery>;
export type DeletedVehiclesQueryResult = Apollo.QueryResult<DeletedVehiclesQuery, DeletedVehiclesQueryVariables>;
export const DeletedUsersDocument = gql`
    query DeletedUsers {
  deletedUsers {
    id
    idNo
    email
    username
    role
    firstName
    lastName
    mobile
    city
    state
    paymentsCount
  }
}
    `;

/**
 * __useDeletedUsersQuery__
 *
 * To run a query within a React component, call `useDeletedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeletedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useDeletedUsersQuery(baseOptions?: Apollo.QueryHookOptions<DeletedUsersQuery, DeletedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeletedUsersQuery, DeletedUsersQueryVariables>(DeletedUsersDocument, options);
      }
export function useDeletedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeletedUsersQuery, DeletedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeletedUsersQuery, DeletedUsersQueryVariables>(DeletedUsersDocument, options);
        }
export function useDeletedUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeletedUsersQuery, DeletedUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeletedUsersQuery, DeletedUsersQueryVariables>(DeletedUsersDocument, options);
        }
export type DeletedUsersQueryHookResult = ReturnType<typeof useDeletedUsersQuery>;
export type DeletedUsersLazyQueryHookResult = ReturnType<typeof useDeletedUsersLazyQuery>;
export type DeletedUsersSuspenseQueryHookResult = ReturnType<typeof useDeletedUsersSuspenseQuery>;
export type DeletedUsersQueryResult = Apollo.QueryResult<DeletedUsersQuery, DeletedUsersQueryVariables>;
export const ActiveBidsPerUserDocument = gql`
    query ActiveBidsPerUser($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    firstName
    lastName
    states {
      id
      name
    }
    activeBids {
      vehicleIndexNo
      make
      currentBidUser {
        username
        firstName
        lastName
        pancardNo
        mobile
      }
      event {
        seller {
          name
        }
      }
      bidAmountUpdate
      startBidAmount
      currentBidAmount
      id
      registrationNumber
      bidStatus
      bidTimeExpire
      vehicleIndexNo
      totalBids
      userVehicleBidsCount
    }
  }
}
    `;

/**
 * __useActiveBidsPerUserQuery__
 *
 * To run a query within a React component, call `useActiveBidsPerUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveBidsPerUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveBidsPerUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useActiveBidsPerUserQuery(baseOptions: Apollo.QueryHookOptions<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables> & ({ variables: ActiveBidsPerUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables>(ActiveBidsPerUserDocument, options);
      }
export function useActiveBidsPerUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables>(ActiveBidsPerUserDocument, options);
        }
export function useActiveBidsPerUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables>(ActiveBidsPerUserDocument, options);
        }
export type ActiveBidsPerUserQueryHookResult = ReturnType<typeof useActiveBidsPerUserQuery>;
export type ActiveBidsPerUserLazyQueryHookResult = ReturnType<typeof useActiveBidsPerUserLazyQuery>;
export type ActiveBidsPerUserSuspenseQueryHookResult = ReturnType<typeof useActiveBidsPerUserSuspenseQuery>;
export type ActiveBidsPerUserQueryResult = Apollo.QueryResult<ActiveBidsPerUserQuery, ActiveBidsPerUserQueryVariables>;
export const CreateSellerDocument = gql`
    mutation CreateSeller($createSellerInput: CreateSellerInput!) {
  createSeller(createSellerInput: $createSellerInput) {
    name
    contactPerson
    GSTNumber
    billingContactPerson
    mobile
    nationalHead
    logo
  }
}
    `;
export type CreateSellerMutationFn = Apollo.MutationFunction<CreateSellerMutation, CreateSellerMutationVariables>;

/**
 * __useCreateSellerMutation__
 *
 * To run a mutation, you first call `useCreateSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSellerMutation, { data, loading, error }] = useCreateSellerMutation({
 *   variables: {
 *      createSellerInput: // value for 'createSellerInput'
 *   },
 * });
 */
export function useCreateSellerMutation(baseOptions?: Apollo.MutationHookOptions<CreateSellerMutation, CreateSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSellerMutation, CreateSellerMutationVariables>(CreateSellerDocument, options);
      }
export type CreateSellerMutationHookResult = ReturnType<typeof useCreateSellerMutation>;
export type CreateSellerMutationResult = Apollo.MutationResult<CreateSellerMutation>;
export type CreateSellerMutationOptions = Apollo.BaseMutationOptions<CreateSellerMutation, CreateSellerMutationVariables>;
export const AddUserDocument = gql`
    mutation AddUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
    email
    username
    role
    firstName
    lastName
    mobile
    status
    city
    pancardNo
    BalanceEMDAmount
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const LocationsDocument = gql`
    query Locations {
  locations {
    id
    name
    state {
      name
    }
    createdAt
    updatedAt
    country
    createdById
  }
}
    `;

/**
 * __useLocationsQuery__
 *
 * To run a query within a React component, call `useLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationsQuery(baseOptions?: Apollo.QueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
      }
export function useLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
        }
export function useLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
        }
export type LocationsQueryHookResult = ReturnType<typeof useLocationsQuery>;
export type LocationsLazyQueryHookResult = ReturnType<typeof useLocationsLazyQuery>;
export type LocationsSuspenseQueryHookResult = ReturnType<typeof useLocationsSuspenseQuery>;
export type LocationsQueryResult = Apollo.QueryResult<LocationsQuery, LocationsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginUserInput!) {
  login(loginInput: $loginInput) {
    user {
      id
      email
      role
      firstName
    }
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const BidDetailsPerVehicleDocument = gql`
    query BidDetailsPerVehicle($where: VehicleWhereUniqueInput!) {
  vehicle(where: $where) {
    id
    lotNumber
    yardLocation
    totalBids
    registrationNumber
    bidStatus
    currentBidUser {
      firstName
      lastName
      mobile
    }
    event {
      seller {
        name
      }
    }
    userVehicleBidsCount
    userVehicleBids {
      createdAt
      id
      amount
      bidVehicleId
      userId
      user {
        firstName
        mobile
        lastName
      }
    }
  }
}
    `;

/**
 * __useBidDetailsPerVehicleQuery__
 *
 * To run a query within a React component, call `useBidDetailsPerVehicleQuery` and pass it any options that fit your needs.
 * When your component renders, `useBidDetailsPerVehicleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBidDetailsPerVehicleQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBidDetailsPerVehicleQuery(baseOptions: Apollo.QueryHookOptions<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables> & ({ variables: BidDetailsPerVehicleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables>(BidDetailsPerVehicleDocument, options);
      }
export function useBidDetailsPerVehicleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables>(BidDetailsPerVehicleDocument, options);
        }
export function useBidDetailsPerVehicleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables>(BidDetailsPerVehicleDocument, options);
        }
export type BidDetailsPerVehicleQueryHookResult = ReturnType<typeof useBidDetailsPerVehicleQuery>;
export type BidDetailsPerVehicleLazyQueryHookResult = ReturnType<typeof useBidDetailsPerVehicleLazyQuery>;
export type BidDetailsPerVehicleSuspenseQueryHookResult = ReturnType<typeof useBidDetailsPerVehicleSuspenseQuery>;
export type BidDetailsPerVehicleQueryResult = Apollo.QueryResult<BidDetailsPerVehicleQuery, BidDetailsPerVehicleQueryVariables>;
export const BidDetailsDocument = gql`
    query BidDetails($where: BidWhereUniqueInput!) {
  Bids(where: $where) {
    bidVehicle {
      lotNumber
      yardLocation
      totalBids
      registrationNumber
      bidStatus
      currentBidUser {
        firstName
        lastName
        mobile
      }
      event {
        seller {
          name
        }
      }
      userVehicleBidsCount
    }
    createdAt
    id
    amount
    bidVehicleId
    userId
    user {
      firstName
      mobile
      lastName
    }
  }
}
    `;

/**
 * __useBidDetailsQuery__
 *
 * To run a query within a React component, call `useBidDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBidDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBidDetailsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBidDetailsQuery(baseOptions: Apollo.QueryHookOptions<BidDetailsQuery, BidDetailsQueryVariables> & ({ variables: BidDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BidDetailsQuery, BidDetailsQueryVariables>(BidDetailsDocument, options);
      }
export function useBidDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BidDetailsQuery, BidDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BidDetailsQuery, BidDetailsQueryVariables>(BidDetailsDocument, options);
        }
export function useBidDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BidDetailsQuery, BidDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BidDetailsQuery, BidDetailsQueryVariables>(BidDetailsDocument, options);
        }
export type BidDetailsQueryHookResult = ReturnType<typeof useBidDetailsQuery>;
export type BidDetailsLazyQueryHookResult = ReturnType<typeof useBidDetailsLazyQuery>;
export type BidDetailsSuspenseQueryHookResult = ReturnType<typeof useBidDetailsSuspenseQuery>;
export type BidDetailsQueryResult = Apollo.QueryResult<BidDetailsQuery, BidDetailsQueryVariables>;
export const BuyingLimitDocument = gql`
    query buyingLimit($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    firstName
    lastName
    emdUpdates {
      id
      emdNo
      vehicleBuyingLimitIncrement
      payment {
        amount
        id
      }
      createdAt
      createdById
      createdBy {
        id
        firstName
      }
    }
  }
}
    `;

/**
 * __useBuyingLimitQuery__
 *
 * To run a query within a React component, call `useBuyingLimitQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyingLimitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyingLimitQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBuyingLimitQuery(baseOptions: Apollo.QueryHookOptions<BuyingLimitQuery, BuyingLimitQueryVariables> & ({ variables: BuyingLimitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuyingLimitQuery, BuyingLimitQueryVariables>(BuyingLimitDocument, options);
      }
export function useBuyingLimitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyingLimitQuery, BuyingLimitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuyingLimitQuery, BuyingLimitQueryVariables>(BuyingLimitDocument, options);
        }
export function useBuyingLimitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BuyingLimitQuery, BuyingLimitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BuyingLimitQuery, BuyingLimitQueryVariables>(BuyingLimitDocument, options);
        }
export type BuyingLimitQueryHookResult = ReturnType<typeof useBuyingLimitQuery>;
export type BuyingLimitLazyQueryHookResult = ReturnType<typeof useBuyingLimitLazyQuery>;
export type BuyingLimitSuspenseQueryHookResult = ReturnType<typeof useBuyingLimitSuspenseQuery>;
export type BuyingLimitQueryResult = Apollo.QueryResult<BuyingLimitQuery, BuyingLimitQueryVariables>;
export const CountsDocument = gql`
    query Counts {
  usersCount
  locationsCount
  vehicleCategoryCount
  sellersCount
  vehiclsCount
  eventsCount
  paymentsCount
}
    `;

/**
 * __useCountsQuery__
 *
 * To run a query within a React component, call `useCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountsQuery(baseOptions?: Apollo.QueryHookOptions<CountsQuery, CountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountsQuery, CountsQueryVariables>(CountsDocument, options);
      }
export function useCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountsQuery, CountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountsQuery, CountsQueryVariables>(CountsDocument, options);
        }
export function useCountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CountsQuery, CountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CountsQuery, CountsQueryVariables>(CountsDocument, options);
        }
export type CountsQueryHookResult = ReturnType<typeof useCountsQuery>;
export type CountsLazyQueryHookResult = ReturnType<typeof useCountsLazyQuery>;
export type CountsSuspenseQueryHookResult = ReturnType<typeof useCountsSuspenseQuery>;
export type CountsQueryResult = Apollo.QueryResult<CountsQuery, CountsQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($vehicleCategoryId: String!, $locationId: String!, $createEventInput: CreateEventInput!, $sellerId: String!) {
  createEvent(
    vehicleCategoryId: $vehicleCategoryId
    locationId: $locationId
    createEventInput: $createEventInput
    sellerId: $sellerId
  ) {
    bidLock
    createdAt
    createdById
    downloadableFile_filename
    endDate
    eventCategory
    eventNo
    extraTime
    extraTimeTrigerIn
    gapInBetweenVehicles
    id
    locationId
    noOfBids
    pausedTotalTime
    pauseDate
    sellerId
    startDate
    status
    termsAndConditions
    updatedAt
    vehicleCategoryId
    vehicleLiveTimeIn
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      vehicleCategoryId: // value for 'vehicleCategoryId'
 *      locationId: // value for 'locationId'
 *      createEventInput: // value for 'createEventInput'
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateEmdupdateDocument = gql`
    mutation CreateEmdupdate($paymentId: String!, $userId: String!, $createEmdupdateInput: CreateEmdupdateInput!) {
  createEmdupdate(
    paymentId: $paymentId
    userId: $userId
    createEmdupdateInput: $createEmdupdateInput
  ) {
    id
    vehicleBuyingLimitIncrement
    user {
      firstName
      lastName
      username
    }
    payment {
      amount
      paymentFor
    }
    createdAt
    createdBy {
      email
    }
  }
}
    `;
export type CreateEmdupdateMutationFn = Apollo.MutationFunction<CreateEmdupdateMutation, CreateEmdupdateMutationVariables>;

/**
 * __useCreateEmdupdateMutation__
 *
 * To run a mutation, you first call `useCreateEmdupdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmdupdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmdupdateMutation, { data, loading, error }] = useCreateEmdupdateMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *      userId: // value for 'userId'
 *      createEmdupdateInput: // value for 'createEmdupdateInput'
 *   },
 * });
 */
export function useCreateEmdupdateMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmdupdateMutation, CreateEmdupdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmdupdateMutation, CreateEmdupdateMutationVariables>(CreateEmdupdateDocument, options);
      }
export type CreateEmdupdateMutationHookResult = ReturnType<typeof useCreateEmdupdateMutation>;
export type CreateEmdupdateMutationResult = Apollo.MutationResult<CreateEmdupdateMutation>;
export type CreateEmdupdateMutationOptions = Apollo.BaseMutationOptions<CreateEmdupdateMutation, CreateEmdupdateMutationVariables>;
export const EmdTableDocument = gql`
    query EmdTable($where: PaymentWhereUniqueInput!) {
  payment(where: $where) {
    id
    emdUpdate {
      id
      createdBy {
        firstName
        id
      }
      createdAt
      emdNo
      vehicleBuyingLimitIncrement
      payment {
        amount
      }
    }
    paymentFor
  }
}
    `;

/**
 * __useEmdTableQuery__
 *
 * To run a query within a React component, call `useEmdTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmdTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmdTableQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEmdTableQuery(baseOptions: Apollo.QueryHookOptions<EmdTableQuery, EmdTableQueryVariables> & ({ variables: EmdTableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmdTableQuery, EmdTableQueryVariables>(EmdTableDocument, options);
      }
export function useEmdTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmdTableQuery, EmdTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmdTableQuery, EmdTableQueryVariables>(EmdTableDocument, options);
        }
export function useEmdTableSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EmdTableQuery, EmdTableQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EmdTableQuery, EmdTableQueryVariables>(EmdTableDocument, options);
        }
export type EmdTableQueryHookResult = ReturnType<typeof useEmdTableQuery>;
export type EmdTableLazyQueryHookResult = ReturnType<typeof useEmdTableLazyQuery>;
export type EmdTableSuspenseQueryHookResult = ReturnType<typeof useEmdTableSuspenseQuery>;
export type EmdTableQueryResult = Apollo.QueryResult<EmdTableQuery, EmdTableQueryVariables>;
export const CreateLocationDocument = gql`
    mutation CreateLocation($createLocationInput: CreateLocationInput!, $stateId: String!) {
  createLocation(createLocationInput: $createLocationInput, stateId: $stateId) {
    id
    name
    state {
      name
    }
  }
}
    `;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      createLocationInput: // value for 'createLocationInput'
 *      stateId: // value for 'stateId'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const CreateVehicleDocument = gql`
    mutation CreateVehicle($eventId: String!, $createVehicleInput: CreateVehicleInput!) {
  createVehicle(eventId: $eventId, createVehicleInput: $createVehicleInput) {
    id
    vehicleIndexNo
    registrationNumber
    bidTimeExpire
    bidStartTime
    bidAmountUpdate
    currentBidAmount
    startBidAmount
    loanAgreementNo
    registeredOwnerName
    quoteIncreament
    make
    model
    varient
    category
    fuel
    type
    rcStatus
    YOM
    ownership
    mileage
    kmReading
    insuranceStatus
    yardLocation
    startPrice
    reservePrice
    repoDt
    veicleLocation
    vehicleRemarks
    auctionManager
    parkingCharges
    insurance
    insuranceValidTill
    tax
    taxValidityDate
    fitness
    permit
    engineNo
    chassisNo
    image
    inspectionLink
    autobseContact
    autobse_contact_person
    vehicleCondition
    powerSteering
    shape
    color
    city
    area
    paymentTerms
    dateOfRegistration
    hypothication
    climateControl
    doorCount
    gearBox
    buyerFees
    rtoFine
    parkingRate
    approxParkingCharges
    clientContactPerson
    clientContactNo
    additionalRemarks
    lotNumber
    createdAt
    updatedAt
    createdById
  }
}
    `;
export type CreateVehicleMutationFn = Apollo.MutationFunction<CreateVehicleMutation, CreateVehicleMutationVariables>;

/**
 * __useCreateVehicleMutation__
 *
 * To run a mutation, you first call `useCreateVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVehicleMutation, { data, loading, error }] = useCreateVehicleMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      createVehicleInput: // value for 'createVehicleInput'
 *   },
 * });
 */
export function useCreateVehicleMutation(baseOptions?: Apollo.MutationHookOptions<CreateVehicleMutation, CreateVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVehicleMutation, CreateVehicleMutationVariables>(CreateVehicleDocument, options);
      }
export type CreateVehicleMutationHookResult = ReturnType<typeof useCreateVehicleMutation>;
export type CreateVehicleMutationResult = Apollo.MutationResult<CreateVehicleMutation>;
export type CreateVehicleMutationOptions = Apollo.BaseMutationOptions<CreateVehicleMutation, CreateVehicleMutationVariables>;
export const CreateBidDocument = gql`
    mutation CreateBid($createBidInput: CreateBidInput!, $bidVehicleId: String!, $userUniqueInput: UserWhereUniqueInput) {
  createBid(
    createBidInput: $createBidInput
    bidVehicleId: $bidVehicleId
    userUniqueInput: $userUniqueInput
  ) {
    id
    name
  }
}
    `;
export type CreateBidMutationFn = Apollo.MutationFunction<CreateBidMutation, CreateBidMutationVariables>;

/**
 * __useCreateBidMutation__
 *
 * To run a mutation, you first call `useCreateBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBidMutation, { data, loading, error }] = useCreateBidMutation({
 *   variables: {
 *      createBidInput: // value for 'createBidInput'
 *      bidVehicleId: // value for 'bidVehicleId'
 *      userUniqueInput: // value for 'userUniqueInput'
 *   },
 * });
 */
export function useCreateBidMutation(baseOptions?: Apollo.MutationHookOptions<CreateBidMutation, CreateBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBidMutation, CreateBidMutationVariables>(CreateBidDocument, options);
      }
export type CreateBidMutationHookResult = ReturnType<typeof useCreateBidMutation>;
export type CreateBidMutationResult = Apollo.MutationResult<CreateBidMutation>;
export type CreateBidMutationOptions = Apollo.BaseMutationOptions<CreateBidMutation, CreateBidMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($where: EventWhereUniqueInput!, $updateEventInput: UpdateEventInput!) {
  updateEvent(where: $where, updateEventInput: $updateEventInput) {
    id
    eventNo
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateEventInput: // value for 'updateEventInput'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const SingleEventDocument = gql`
    query singleEvent($where: EventWhereUniqueInput!) {
  event(where: $where) {
    id
    eventNo
    eventCategory
    startDate
    endDate
    firstVehicleEndDate
    pauseDate
    pausedTotalTime
    sellerId
    vehicleCategoryId
    locationId
    noOfBids
    downloadableFile_filename
    termsAndConditions
    createdAt
    updatedAt
    createdById
    extraTimeTrigerIn
    extraTime
    vehicleLiveTimeIn
    gapInBetweenVehicles
    status
    bidLock
    vehiclesCount
    Report
  }
}
    `;

/**
 * __useSingleEventQuery__
 *
 * To run a query within a React component, call `useSingleEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleEventQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSingleEventQuery(baseOptions: Apollo.QueryHookOptions<SingleEventQuery, SingleEventQueryVariables> & ({ variables: SingleEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleEventQuery, SingleEventQueryVariables>(SingleEventDocument, options);
      }
export function useSingleEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleEventQuery, SingleEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleEventQuery, SingleEventQueryVariables>(SingleEventDocument, options);
        }
export function useSingleEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SingleEventQuery, SingleEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SingleEventQuery, SingleEventQueryVariables>(SingleEventDocument, options);
        }
export type SingleEventQueryHookResult = ReturnType<typeof useSingleEventQuery>;
export type SingleEventLazyQueryHookResult = ReturnType<typeof useSingleEventLazyQuery>;
export type SingleEventSuspenseQueryHookResult = ReturnType<typeof useSingleEventSuspenseQuery>;
export type SingleEventQueryResult = Apollo.QueryResult<SingleEventQuery, SingleEventQueryVariables>;
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($where: LocationWhereUniqueInput!, $updateLocationInput: UpdateLocationInput!) {
  updateLocation(where: $where, updateLocationInput: $updateLocationInput) {
    id
    name
    state {
      name
    }
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateLocationInput: // value for 'updateLocationInput'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const PaymentDocument = gql`
    query Payment($where: PaymentWhereUniqueInput!) {
  payment(where: $where) {
    id
    user {
      firstName
      username
    }
    refNo
    amount
    description
    status
    userId
    image
    createdAt
    updatedAt
    createdById
    registrationExpire
    paymentFor
  }
}
    `;

/**
 * __usePaymentQuery__
 *
 * To run a query within a React component, call `usePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePaymentQuery(baseOptions: Apollo.QueryHookOptions<PaymentQuery, PaymentQueryVariables> & ({ variables: PaymentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
      }
export function usePaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
        }
export function usePaymentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PaymentQuery, PaymentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaymentQuery, PaymentQueryVariables>(PaymentDocument, options);
        }
export type PaymentQueryHookResult = ReturnType<typeof usePaymentQuery>;
export type PaymentLazyQueryHookResult = ReturnType<typeof usePaymentLazyQuery>;
export type PaymentSuspenseQueryHookResult = ReturnType<typeof usePaymentSuspenseQuery>;
export type PaymentQueryResult = Apollo.QueryResult<PaymentQuery, PaymentQueryVariables>;
export const UpdatePaymentDocument = gql`
    mutation UpdatePayment($where: PaymentWhereUniqueInput!, $updatePaymentInput: UpdatePaymentInput!) {
  updatePayment(where: $where, updatePaymentInput: $updatePaymentInput) {
    id
    refNo
    amount
    description
    status
    userId
    image
    createdAt
    updatedAt
    createdById
    registrationExpire
    paymentFor
  }
}
    `;
export type UpdatePaymentMutationFn = Apollo.MutationFunction<UpdatePaymentMutation, UpdatePaymentMutationVariables>;

/**
 * __useUpdatePaymentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMutation, { data, loading, error }] = useUpdatePaymentMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updatePaymentInput: // value for 'updatePaymentInput'
 *   },
 * });
 */
export function useUpdatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UpdatePaymentDocument, options);
      }
export type UpdatePaymentMutationHookResult = ReturnType<typeof useUpdatePaymentMutation>;
export type UpdatePaymentMutationResult = Apollo.MutationResult<UpdatePaymentMutation>;
export type UpdatePaymentMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    email
    username
    role
    firstName
    lastName
    businessName
    mobile
    BalanceEMDAmount
    pancardNo
    idProofNo
    country
    city
    userCategory
    tempToken
    status
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($where: UserWhereUniqueInput!) {
  deleteUser(where: $where) {
    id
    role
    firstName
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const RestoreUserDocument = gql`
    mutation RestoreUser($where: UserWhereUniqueInput!) {
  restoreUser(where: $where) {
    id
    email
    firstName
  }
}
    `;
export type RestoreUserMutationFn = Apollo.MutationFunction<RestoreUserMutation, RestoreUserMutationVariables>;

/**
 * __useRestoreUserMutation__
 *
 * To run a mutation, you first call `useRestoreUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreUserMutation, { data, loading, error }] = useRestoreUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRestoreUserMutation(baseOptions?: Apollo.MutationHookOptions<RestoreUserMutation, RestoreUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreUserMutation, RestoreUserMutationVariables>(RestoreUserDocument, options);
      }
export type RestoreUserMutationHookResult = ReturnType<typeof useRestoreUserMutation>;
export type RestoreUserMutationResult = Apollo.MutationResult<RestoreUserMutation>;
export type RestoreUserMutationOptions = Apollo.BaseMutationOptions<RestoreUserMutation, RestoreUserMutationVariables>;
export const EmdUpdatesPerPaymentDocument = gql`
    query EmdUpdatesPerPayment($where: PaymentWhereUniqueInput!) {
  payment(where: $where) {
    emdUpdate {
      emdNo
      id
      payment {
        id
        amount
      }
      user {
        mobile
        firstName
        lastName
      }
      vehicleBuyingLimitIncrement
      createdBy {
        id
        firstName
      }
    }
  }
}
    `;

/**
 * __useEmdUpdatesPerPaymentQuery__
 *
 * To run a query within a React component, call `useEmdUpdatesPerPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmdUpdatesPerPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmdUpdatesPerPaymentQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEmdUpdatesPerPaymentQuery(baseOptions: Apollo.QueryHookOptions<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables> & ({ variables: EmdUpdatesPerPaymentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables>(EmdUpdatesPerPaymentDocument, options);
      }
export function useEmdUpdatesPerPaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables>(EmdUpdatesPerPaymentDocument, options);
        }
export function useEmdUpdatesPerPaymentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables>(EmdUpdatesPerPaymentDocument, options);
        }
export type EmdUpdatesPerPaymentQueryHookResult = ReturnType<typeof useEmdUpdatesPerPaymentQuery>;
export type EmdUpdatesPerPaymentLazyQueryHookResult = ReturnType<typeof useEmdUpdatesPerPaymentLazyQuery>;
export type EmdUpdatesPerPaymentSuspenseQueryHookResult = ReturnType<typeof useEmdUpdatesPerPaymentSuspenseQuery>;
export type EmdUpdatesPerPaymentQueryResult = Apollo.QueryResult<EmdUpdatesPerPaymentQuery, EmdUpdatesPerPaymentQueryVariables>;
export const EventsDocument = gql`
    query Events($where: EventWhereUniqueInput, $orderBy: [EventOrderByInput!], $take: Int, $skip: Int) {
  events(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    events {
      bidLock
      deletedVehiclesCount
      id
      eventNo
      Report
      eventCategory
      startDate
      endDate
      pauseDate
      pausedTotalTime
      sellerId
      vehicleCategoryId
      noOfBids
      downloadableFile_filename
      termsAndConditions
      createdAt
      updatedAt
      extraTimeTrigerIn
      extraTime
      vehicleLiveTimeIn
      gapInBetweenVehicles
      status
      vehiclesCount
      seller {
        name
      }
      location {
        name
      }
    }
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export function useEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const EventDocument = gql`
    query Event($where: EventWhereUniqueInput!) {
  event(where: $where) {
    id
    eventNo
    eventCategory
    startDate
    endDate
    pauseDate
    pausedTotalTime
    sellerId
    vehicleCategoryId
    locationId
    noOfBids
    downloadableFile_filename
    termsAndConditions
    createdAt
    updatedAt
    createdById
    extraTimeTrigerIn
    extraTime
    vehicleLiveTimeIn
    gapInBetweenVehicles
    status
    bidLock
  }
}
    `;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables> & ({ variables: EventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export function useEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventSuspenseQueryHookResult = ReturnType<typeof useEventSuspenseQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventVehiclesDocument = gql`
    query EventVehicles($where: EventWhereUniqueInput!, $orderBy: [VehicleOrderByInput!]) {
  event(where: $where) {
    eventNo
    seller {
      name
    }
    vehiclesLive(orderBy: $orderBy) {
      userVehicleBids {
        amount
      }
      event {
        deletedVehiclesCount
        seller {
          name
        }
      }
      currentBidUser {
        firstName
        lastName
      }
      lotNumber
      state
      id
      bidStatus
      vehicleIndexNo
      registrationNumber
      bidTimeExpire
      bidStartTime
      bidAmountUpdate
      currentBidAmount
      startBidAmount
      loanAgreementNo
      registeredOwnerName
      quoteIncreament
      make
      model
      varient
      category
      createdById
      ownership
      insuranceStatus
      yardLocation
      startPrice
      reservePrice
      veicleLocation
      parkingCharges
      insuranceValidTill
      tax
      taxValidityDate
      city
      area
      paymentTerms
      dateOfRegistration
      hypothication
      totalBids
      createdAt
      updatedAt
      createdById
    }
  }
}
    `;

/**
 * __useEventVehiclesQuery__
 *
 * To run a query within a React component, call `useEventVehiclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventVehiclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventVehiclesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useEventVehiclesQuery(baseOptions: Apollo.QueryHookOptions<EventVehiclesQuery, EventVehiclesQueryVariables> & ({ variables: EventVehiclesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventVehiclesQuery, EventVehiclesQueryVariables>(EventVehiclesDocument, options);
      }
export function useEventVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventVehiclesQuery, EventVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventVehiclesQuery, EventVehiclesQueryVariables>(EventVehiclesDocument, options);
        }
export function useEventVehiclesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventVehiclesQuery, EventVehiclesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventVehiclesQuery, EventVehiclesQueryVariables>(EventVehiclesDocument, options);
        }
export type EventVehiclesQueryHookResult = ReturnType<typeof useEventVehiclesQuery>;
export type EventVehiclesLazyQueryHookResult = ReturnType<typeof useEventVehiclesLazyQuery>;
export type EventVehiclesSuspenseQueryHookResult = ReturnType<typeof useEventVehiclesSuspenseQuery>;
export type EventVehiclesQueryResult = Apollo.QueryResult<EventVehiclesQuery, EventVehiclesQueryVariables>;
export const CreateExceluploadDocument = gql`
    mutation CreateExcelupload($eventId: String!, $createExceluploadInput: CreateExceluploadInput!) {
  createExcelupload(
    eventId: $eventId
    createExceluploadInput: $createExceluploadInput
  ) {
    id
    name
    file_filename
    createdAt
    updatedAt
    createdById
  }
}
    `;
export type CreateExceluploadMutationFn = Apollo.MutationFunction<CreateExceluploadMutation, CreateExceluploadMutationVariables>;

/**
 * __useCreateExceluploadMutation__
 *
 * To run a mutation, you first call `useCreateExceluploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExceluploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExceluploadMutation, { data, loading, error }] = useCreateExceluploadMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      createExceluploadInput: // value for 'createExceluploadInput'
 *   },
 * });
 */
export function useCreateExceluploadMutation(baseOptions?: Apollo.MutationHookOptions<CreateExceluploadMutation, CreateExceluploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExceluploadMutation, CreateExceluploadMutationVariables>(CreateExceluploadDocument, options);
      }
export type CreateExceluploadMutationHookResult = ReturnType<typeof useCreateExceluploadMutation>;
export type CreateExceluploadMutationResult = Apollo.MutationResult<CreateExceluploadMutation>;
export type CreateExceluploadMutationOptions = Apollo.BaseMutationOptions<CreateExceluploadMutation, CreateExceluploadMutationVariables>;
export const SellerDocument = gql`
    query Seller($where: SellerWhereUniqueInput!) {
  seller(where: $where) {
    name
    contactPerson
    GSTNumber
    billingContactPerson
    mobile
    nationalHead
    logo
    updatedAt
    createdAt
    createdById
    id
  }
}
    `;

/**
 * __useSellerQuery__
 *
 * To run a query within a React component, call `useSellerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSellerQuery(baseOptions: Apollo.QueryHookOptions<SellerQuery, SellerQueryVariables> & ({ variables: SellerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellerQuery, SellerQueryVariables>(SellerDocument, options);
      }
export function useSellerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellerQuery, SellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellerQuery, SellerQueryVariables>(SellerDocument, options);
        }
export function useSellerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SellerQuery, SellerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SellerQuery, SellerQueryVariables>(SellerDocument, options);
        }
export type SellerQueryHookResult = ReturnType<typeof useSellerQuery>;
export type SellerLazyQueryHookResult = ReturnType<typeof useSellerLazyQuery>;
export type SellerSuspenseQueryHookResult = ReturnType<typeof useSellerSuspenseQuery>;
export type SellerQueryResult = Apollo.QueryResult<SellerQuery, SellerQueryVariables>;
export const UpdateSellerDocument = gql`
    mutation UpdateSeller($where: SellerWhereUniqueInput!, $updateSellerInput: UpdateSellerInput!) {
  updateSeller(where: $where, updateSellerInput: $updateSellerInput) {
    name
    contactPerson
    GSTNumber
    billingContactPerson
    mobile
    nationalHead
    logo
    createdAt
    updatedAt
    createdById
    id
  }
}
    `;
export type UpdateSellerMutationFn = Apollo.MutationFunction<UpdateSellerMutation, UpdateSellerMutationVariables>;

/**
 * __useUpdateSellerMutation__
 *
 * To run a mutation, you first call `useUpdateSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSellerMutation, { data, loading, error }] = useUpdateSellerMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateSellerInput: // value for 'updateSellerInput'
 *   },
 * });
 */
export function useUpdateSellerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSellerMutation, UpdateSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSellerMutation, UpdateSellerMutationVariables>(UpdateSellerDocument, options);
      }
export type UpdateSellerMutationHookResult = ReturnType<typeof useUpdateSellerMutation>;
export type UpdateSellerMutationResult = Apollo.MutationResult<UpdateSellerMutation>;
export type UpdateSellerMutationOptions = Apollo.BaseMutationOptions<UpdateSellerMutation, UpdateSellerMutationVariables>;
export const LocationDocument = gql`
    query Location($where: LocationWhereUniqueInput!) {
  location(where: $where) {
    id
    name
    createdAt
    updatedAt
    country
    createdById
  }
}
    `;

/**
 * __useLocationQuery__
 *
 * To run a query within a React component, call `useLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useLocationQuery(baseOptions: Apollo.QueryHookOptions<LocationQuery, LocationQueryVariables> & ({ variables: LocationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
      }
export function useLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationQuery, LocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
        }
export function useLocationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LocationQuery, LocationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
        }
export type LocationQueryHookResult = ReturnType<typeof useLocationQuery>;
export type LocationLazyQueryHookResult = ReturnType<typeof useLocationLazyQuery>;
export type LocationSuspenseQueryHookResult = ReturnType<typeof useLocationSuspenseQuery>;
export type LocationQueryResult = Apollo.QueryResult<LocationQuery, LocationQueryVariables>;
export const SendOtpDocument = gql`
    mutation SendOtp($sendOtpDto: SendOtpDto!) {
  sendOtp(sendOtpDto: $sendOtpDto) {
    code
    status
    description
    data {
      messageid
      totnumber
      totalcredit
    }
  }
}
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      sendOtpDto: // value for 'sendOtpDto'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOtp($verfiyOtpDto: VerfiyOtpDto!) {
  verifyOtp(verfiyOtpDto: $verfiyOtpDto) {
    access_token
    user {
      id
      email
      role
      firstName
    }
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      verfiyOtpDto: // value for 'verfiyOtpDto'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const PaymentsDocument = gql`
    query Payments {
  payments {
    id
    refNo
    amount
    description
    status
    userId
    image
    createdAt
    updatedAt
    createdById
    registrationExpire
    paymentFor
    user {
      firstName
      mobile
    }
  }
}
    `;

/**
 * __usePaymentsQuery__
 *
 * To run a query within a React component, call `usePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentsQuery(baseOptions?: Apollo.QueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
      }
export function usePaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
        }
export function usePaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
        }
export type PaymentsQueryHookResult = ReturnType<typeof usePaymentsQuery>;
export type PaymentsLazyQueryHookResult = ReturnType<typeof usePaymentsLazyQuery>;
export type PaymentsSuspenseQueryHookResult = ReturnType<typeof usePaymentsSuspenseQuery>;
export type PaymentsQueryResult = Apollo.QueryResult<PaymentsQuery, PaymentsQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($createPaymentInput: CreatePaymentInput!, $userId: String) {
  createPayment(createPaymentInput: $createPaymentInput, userId: $userId) {
    id
    refNo
    amount
    description
    status
    userId
    image
    createdAt
    updatedAt
    createdById
    registrationExpire
    paymentFor
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      createPaymentInput: // value for 'createPaymentInput'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const UserPaymentsDocument = gql`
    query UserPayments($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    firstName
    lastName
    payments {
      refNo
      amount
      description
      id
      status
      userId
      image
      createdAt
      updatedAt
      createdById
      registrationExpire
      paymentFor
    }
  }
}
    `;

/**
 * __useUserPaymentsQuery__
 *
 * To run a query within a React component, call `useUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPaymentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserPaymentsQuery(baseOptions: Apollo.QueryHookOptions<UserPaymentsQuery, UserPaymentsQueryVariables> & ({ variables: UserPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPaymentsQuery, UserPaymentsQueryVariables>(UserPaymentsDocument, options);
      }
export function useUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPaymentsQuery, UserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPaymentsQuery, UserPaymentsQueryVariables>(UserPaymentsDocument, options);
        }
export function useUserPaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserPaymentsQuery, UserPaymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserPaymentsQuery, UserPaymentsQueryVariables>(UserPaymentsDocument, options);
        }
export type UserPaymentsQueryHookResult = ReturnType<typeof useUserPaymentsQuery>;
export type UserPaymentsLazyQueryHookResult = ReturnType<typeof useUserPaymentsLazyQuery>;
export type UserPaymentsSuspenseQueryHookResult = ReturnType<typeof useUserPaymentsSuspenseQuery>;
export type UserPaymentsQueryResult = Apollo.QueryResult<UserPaymentsQuery, UserPaymentsQueryVariables>;
export const SellersDocument = gql`
    query Sellers {
  sellers {
    id
    name
    contactPerson
    GSTNumber
    billingContactPerson
    mobile
    nationalHead
    logo
    createdAt
    updatedAt
    createdById
  }
}
    `;

/**
 * __useSellersQuery__
 *
 * To run a query within a React component, call `useSellersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSellersQuery(baseOptions?: Apollo.QueryHookOptions<SellersQuery, SellersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellersQuery, SellersQueryVariables>(SellersDocument, options);
      }
export function useSellersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellersQuery, SellersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellersQuery, SellersQueryVariables>(SellersDocument, options);
        }
export function useSellersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SellersQuery, SellersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SellersQuery, SellersQueryVariables>(SellersDocument, options);
        }
export type SellersQueryHookResult = ReturnType<typeof useSellersQuery>;
export type SellersLazyQueryHookResult = ReturnType<typeof useSellersLazyQuery>;
export type SellersSuspenseQueryHookResult = ReturnType<typeof useSellersSuspenseQuery>;
export type SellersQueryResult = Apollo.QueryResult<SellersQuery, SellersQueryVariables>;
export const CreateStateDocument = gql`
    mutation CreateState($createStateInput: CreateStateInput!) {
  createState(createStateInput: $createStateInput) {
    id
    name
  }
}
    `;
export type CreateStateMutationFn = Apollo.MutationFunction<CreateStateMutation, CreateStateMutationVariables>;

/**
 * __useCreateStateMutation__
 *
 * To run a mutation, you first call `useCreateStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStateMutation, { data, loading, error }] = useCreateStateMutation({
 *   variables: {
 *      createStateInput: // value for 'createStateInput'
 *   },
 * });
 */
export function useCreateStateMutation(baseOptions?: Apollo.MutationHookOptions<CreateStateMutation, CreateStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStateMutation, CreateStateMutationVariables>(CreateStateDocument, options);
      }
export type CreateStateMutationHookResult = ReturnType<typeof useCreateStateMutation>;
export type CreateStateMutationResult = Apollo.MutationResult<CreateStateMutation>;
export type CreateStateMutationOptions = Apollo.BaseMutationOptions<CreateStateMutation, CreateStateMutationVariables>;
export const StatesDocument = gql`
    query States {
  States {
    id
    name
    createdAt
  }
}
    `;

/**
 * __useStatesQuery__
 *
 * To run a query within a React component, call `useStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatesQuery(baseOptions?: Apollo.QueryHookOptions<StatesQuery, StatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
      }
export function useStatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatesQuery, StatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
        }
export function useStatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatesQuery, StatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
        }
export type StatesQueryHookResult = ReturnType<typeof useStatesQuery>;
export type StatesLazyQueryHookResult = ReturnType<typeof useStatesLazyQuery>;
export type StatesSuspenseQueryHookResult = ReturnType<typeof useStatesSuspenseQuery>;
export type StatesQueryResult = Apollo.QueryResult<StatesQuery, StatesQueryVariables>;
export const UpdateStateDocument = gql`
    mutation UpdateState($where: StateWhereUniqueInput!, $updateStateInput: UpdateStateInput!) {
  updateState(where: $where, updateStateInput: $updateStateInput) {
    id
    name
    createdAt
  }
}
    `;
export type UpdateStateMutationFn = Apollo.MutationFunction<UpdateStateMutation, UpdateStateMutationVariables>;

/**
 * __useUpdateStateMutation__
 *
 * To run a mutation, you first call `useUpdateStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStateMutation, { data, loading, error }] = useUpdateStateMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateStateInput: // value for 'updateStateInput'
 *   },
 * });
 */
export function useUpdateStateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStateMutation, UpdateStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStateMutation, UpdateStateMutationVariables>(UpdateStateDocument, options);
      }
export type UpdateStateMutationHookResult = ReturnType<typeof useUpdateStateMutation>;
export type UpdateStateMutationResult = Apollo.MutationResult<UpdateStateMutation>;
export type UpdateStateMutationOptions = Apollo.BaseMutationOptions<UpdateStateMutation, UpdateStateMutationVariables>;
export const SubscriptionBidCreationDocument = gql`
    subscription SubscriptionBidCreation {
  subscriptionBidCreation {
    id
  }
}
    `;

/**
 * __useSubscriptionBidCreationSubscription__
 *
 * To run a query within a React component, call `useSubscriptionBidCreationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionBidCreationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionBidCreationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionBidCreationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptionBidCreationSubscription, SubscriptionBidCreationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptionBidCreationSubscription, SubscriptionBidCreationSubscriptionVariables>(SubscriptionBidCreationDocument, options);
      }
export type SubscriptionBidCreationSubscriptionHookResult = ReturnType<typeof useSubscriptionBidCreationSubscription>;
export type SubscriptionBidCreationSubscriptionResult = Apollo.SubscriptionResult<SubscriptionBidCreationSubscription>;
export const SubscriptionUserUpdatesDocument = gql`
    subscription SubscriptionUserUpdates {
  subscriptionUserUpdates {
    id
  }
}
    `;

/**
 * __useSubscriptionUserUpdatesSubscription__
 *
 * To run a query within a React component, call `useSubscriptionUserUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionUserUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionUserUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionUserUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptionUserUpdatesSubscription, SubscriptionUserUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptionUserUpdatesSubscription, SubscriptionUserUpdatesSubscriptionVariables>(SubscriptionUserUpdatesDocument, options);
      }
export type SubscriptionUserUpdatesSubscriptionHookResult = ReturnType<typeof useSubscriptionUserUpdatesSubscription>;
export type SubscriptionUserUpdatesSubscriptionResult = Apollo.SubscriptionResult<SubscriptionUserUpdatesSubscription>;
export const ViewUserDocument = gql`
    query viewUser($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    idNo
    email
    vehicleBuyingLimit
    username
    role
    state
    firstName
    lastName
    businessName
    mobile
    BalanceEMDAmount
    pancardNo
    idProofNo
    country
    city
    userCategory
    paymentsCount
    status
    states {
      id
      name
    }
    activeBids {
      id
    }
    tempToken
    aadharcard_front_image
    aadharcard_back_image
    driving_license_front_image
    driving_license_back_image
    pancard_image
  }
}
    `;

/**
 * __useViewUserQuery__
 *
 * To run a query within a React component, call `useViewUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useViewUserQuery(baseOptions: Apollo.QueryHookOptions<ViewUserQuery, ViewUserQueryVariables> & ({ variables: ViewUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, options);
      }
export function useViewUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewUserQuery, ViewUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, options);
        }
export function useViewUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewUserQuery, ViewUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, options);
        }
export type ViewUserQueryHookResult = ReturnType<typeof useViewUserQuery>;
export type ViewUserLazyQueryHookResult = ReturnType<typeof useViewUserLazyQuery>;
export type ViewUserSuspenseQueryHookResult = ReturnType<typeof useViewUserSuspenseQuery>;
export type ViewUserQueryResult = Apollo.QueryResult<ViewUserQuery, ViewUserQueryVariables>;
export const UsersDocument = gql`
    query Users($where: UserWhereUniqueInput, $take: Int, $skip: Int, $orderBy: [UserOrderByInput!]) {
  users(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
    id
    email
    role
    firstName
    BalanceEMDAmount
    country
    state
    city
    userCategory
    status
    vehicleBuyingLimit
    paymentsCount
    idNo
    activeBids {
      id
    }
    states {
      id
      name
    }
    mobile
    lastName
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersByStateDocument = gql`
    query UsersByState($where: UserWhereUniqueInput) {
  users(where: $where) {
    id
    email
    role
    firstName
    BalanceEMDAmount
    country
    city
    userCategory
    status
    vehicleBuyingLimit
    paymentsCount
    idNo
    states {
      id
      name
    }
    mobile
    lastName
  }
}
    `;

/**
 * __useUsersByStateQuery__
 *
 * To run a query within a React component, call `useUsersByStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByStateQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUsersByStateQuery(baseOptions?: Apollo.QueryHookOptions<UsersByStateQuery, UsersByStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByStateQuery, UsersByStateQueryVariables>(UsersByStateDocument, options);
      }
export function useUsersByStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByStateQuery, UsersByStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByStateQuery, UsersByStateQueryVariables>(UsersByStateDocument, options);
        }
export function useUsersByStateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersByStateQuery, UsersByStateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersByStateQuery, UsersByStateQueryVariables>(UsersByStateDocument, options);
        }
export type UsersByStateQueryHookResult = ReturnType<typeof useUsersByStateQuery>;
export type UsersByStateLazyQueryHookResult = ReturnType<typeof useUsersByStateLazyQuery>;
export type UsersByStateSuspenseQueryHookResult = ReturnType<typeof useUsersByStateSuspenseQuery>;
export type UsersByStateQueryResult = Apollo.QueryResult<UsersByStateQuery, UsersByStateQueryVariables>;
export const CreateVehiclecategoryDocument = gql`
    mutation CreateVehiclecategory($createVehiclecategoryInput: CreateVehiclecategoryInput!) {
  createVehiclecategory(createVehiclecategoryInput: $createVehiclecategoryInput) {
    createdAt
    createdById
    id
    name
    updatedAt
  }
}
    `;
export type CreateVehiclecategoryMutationFn = Apollo.MutationFunction<CreateVehiclecategoryMutation, CreateVehiclecategoryMutationVariables>;

/**
 * __useCreateVehiclecategoryMutation__
 *
 * To run a mutation, you first call `useCreateVehiclecategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVehiclecategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVehiclecategoryMutation, { data, loading, error }] = useCreateVehiclecategoryMutation({
 *   variables: {
 *      createVehiclecategoryInput: // value for 'createVehiclecategoryInput'
 *   },
 * });
 */
export function useCreateVehiclecategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateVehiclecategoryMutation, CreateVehiclecategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVehiclecategoryMutation, CreateVehiclecategoryMutationVariables>(CreateVehiclecategoryDocument, options);
      }
export type CreateVehiclecategoryMutationHookResult = ReturnType<typeof useCreateVehiclecategoryMutation>;
export type CreateVehiclecategoryMutationResult = Apollo.MutationResult<CreateVehiclecategoryMutation>;
export type CreateVehiclecategoryMutationOptions = Apollo.BaseMutationOptions<CreateVehiclecategoryMutation, CreateVehiclecategoryMutationVariables>;
export const VehicleCategoriesDocument = gql`
    query VehicleCategories {
  vehicleCategories {
    createdAt
    createdById
    id
    name
    updatedAt
  }
}
    `;

/**
 * __useVehicleCategoriesQuery__
 *
 * To run a query within a React component, call `useVehicleCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useVehicleCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>(VehicleCategoriesDocument, options);
      }
export function useVehicleCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>(VehicleCategoriesDocument, options);
        }
export function useVehicleCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>(VehicleCategoriesDocument, options);
        }
export type VehicleCategoriesQueryHookResult = ReturnType<typeof useVehicleCategoriesQuery>;
export type VehicleCategoriesLazyQueryHookResult = ReturnType<typeof useVehicleCategoriesLazyQuery>;
export type VehicleCategoriesSuspenseQueryHookResult = ReturnType<typeof useVehicleCategoriesSuspenseQuery>;
export type VehicleCategoriesQueryResult = Apollo.QueryResult<VehicleCategoriesQuery, VehicleCategoriesQueryVariables>;
export const VehicleCategoryDocument = gql`
    query VehicleCategory($where: VehicleCategoryWhereUniqueInput!) {
  vehicleCategory(where: $where) {
    createdAt
    createdById
    id
    name
    updatedAt
  }
}
    `;

/**
 * __useVehicleCategoryQuery__
 *
 * To run a query within a React component, call `useVehicleCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleCategoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVehicleCategoryQuery(baseOptions: Apollo.QueryHookOptions<VehicleCategoryQuery, VehicleCategoryQueryVariables> & ({ variables: VehicleCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleCategoryQuery, VehicleCategoryQueryVariables>(VehicleCategoryDocument, options);
      }
export function useVehicleCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleCategoryQuery, VehicleCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleCategoryQuery, VehicleCategoryQueryVariables>(VehicleCategoryDocument, options);
        }
export function useVehicleCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VehicleCategoryQuery, VehicleCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VehicleCategoryQuery, VehicleCategoryQueryVariables>(VehicleCategoryDocument, options);
        }
export type VehicleCategoryQueryHookResult = ReturnType<typeof useVehicleCategoryQuery>;
export type VehicleCategoryLazyQueryHookResult = ReturnType<typeof useVehicleCategoryLazyQuery>;
export type VehicleCategorySuspenseQueryHookResult = ReturnType<typeof useVehicleCategorySuspenseQuery>;
export type VehicleCategoryQueryResult = Apollo.QueryResult<VehicleCategoryQuery, VehicleCategoryQueryVariables>;
export const UpdateVehicleCategoryDocument = gql`
    mutation UpdateVehicleCategory($where: VehicleCategoryWhereUniqueInput!, $updateVehiclecategoryInput: UpdateVehiclecategoryInput!) {
  updateVehicleCategory(
    where: $where
    updateVehiclecategoryInput: $updateVehiclecategoryInput
  ) {
    id
  }
}
    `;
export type UpdateVehicleCategoryMutationFn = Apollo.MutationFunction<UpdateVehicleCategoryMutation, UpdateVehicleCategoryMutationVariables>;

/**
 * __useUpdateVehicleCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateVehicleCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVehicleCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVehicleCategoryMutation, { data, loading, error }] = useUpdateVehicleCategoryMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateVehiclecategoryInput: // value for 'updateVehiclecategoryInput'
 *   },
 * });
 */
export function useUpdateVehicleCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVehicleCategoryMutation, UpdateVehicleCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVehicleCategoryMutation, UpdateVehicleCategoryMutationVariables>(UpdateVehicleCategoryDocument, options);
      }
export type UpdateVehicleCategoryMutationHookResult = ReturnType<typeof useUpdateVehicleCategoryMutation>;
export type UpdateVehicleCategoryMutationResult = Apollo.MutationResult<UpdateVehicleCategoryMutation>;
export type UpdateVehicleCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateVehicleCategoryMutation, UpdateVehicleCategoryMutationVariables>;
export const SubscriptionVehicleUpdatesDocument = gql`
    subscription SubscriptionVehicleUpdates {
  subscriptionVehicleUpdates {
    id
  }
}
    `;

/**
 * __useSubscriptionVehicleUpdatesSubscription__
 *
 * To run a query within a React component, call `useSubscriptionVehicleUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionVehicleUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionVehicleUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionVehicleUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptionVehicleUpdatesSubscription, SubscriptionVehicleUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptionVehicleUpdatesSubscription, SubscriptionVehicleUpdatesSubscriptionVariables>(SubscriptionVehicleUpdatesDocument, options);
      }
export type SubscriptionVehicleUpdatesSubscriptionHookResult = ReturnType<typeof useSubscriptionVehicleUpdatesSubscription>;
export type SubscriptionVehicleUpdatesSubscriptionResult = Apollo.SubscriptionResult<SubscriptionVehicleUpdatesSubscription>;
export const VehicleDocument = gql`
    query Vehicle($where: VehicleWhereUniqueInput!) {
  vehicle(where: $where) {
    id
    vehicleIndexNo
    registrationNumber
    bidTimeExpire
    bidStartTime
    bidAmountUpdate
    currentBidAmount
    startBidAmount
    loanAgreementNo
    registeredOwnerName
    quoteIncreament
    make
    model
    varient
    category
    fuel
    type
    rcStatus
    YOM
    ownership
    mileage
    kmReading
    insuranceStatus
    yardLocation
    startPrice
    reservePrice
    repoDt
    veicleLocation
    vehicleRemarks
    auctionManager
    parkingCharges
    insurance
    insuranceValidTill
    tax
    taxValidityDate
    fitness
    permit
    engineNo
    chassisNo
    image
    inspectionLink
    autobseContact
    autobse_contact_person
    vehicleCondition
    powerSteering
    shape
    color
    city
    area
    paymentTerms
    dateOfRegistration
    hypothication
    climateControl
    doorCount
    gearBox
    buyerFees
    rtoFine
    parkingRate
    approxParkingCharges
    clientContactPerson
    clientContactNo
    additionalRemarks
    lotNumber
    createdAt
    updatedAt
    createdById
  }
}
    `;

/**
 * __useVehicleQuery__
 *
 * To run a query within a React component, call `useVehicleQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVehicleQuery(baseOptions: Apollo.QueryHookOptions<VehicleQuery, VehicleQueryVariables> & ({ variables: VehicleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleQuery, VehicleQueryVariables>(VehicleDocument, options);
      }
export function useVehicleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleQuery, VehicleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleQuery, VehicleQueryVariables>(VehicleDocument, options);
        }
export function useVehicleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VehicleQuery, VehicleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VehicleQuery, VehicleQueryVariables>(VehicleDocument, options);
        }
export type VehicleQueryHookResult = ReturnType<typeof useVehicleQuery>;
export type VehicleLazyQueryHookResult = ReturnType<typeof useVehicleLazyQuery>;
export type VehicleSuspenseQueryHookResult = ReturnType<typeof useVehicleSuspenseQuery>;
export type VehicleQueryResult = Apollo.QueryResult<VehicleQuery, VehicleQueryVariables>;
export const UpdateVehicleDocument = gql`
    mutation UpdateVehicle($where: VehicleWhereUniqueInput!, $updateVehicleInput: UpdateVehicleInput!) {
  updateVehicle(where: $where, updateVehicleInput: $updateVehicleInput) {
    id
    vehicleIndexNo
    registrationNumber
    bidTimeExpire
    bidStartTime
    bidAmountUpdate
    currentBidAmount
    startBidAmount
    loanAgreementNo
    registeredOwnerName
    quoteIncreament
    make
    model
    varient
    category
    fuel
    type
    rcStatus
    YOM
    ownership
    mileage
    kmReading
    insuranceStatus
    yardLocation
    startPrice
    reservePrice
    repoDt
    veicleLocation
    vehicleRemarks
    auctionManager
    parkingCharges
    insurance
    insuranceValidTill
    tax
    taxValidityDate
    fitness
    permit
    engineNo
    chassisNo
    image
    inspectionLink
    autobseContact
    autobse_contact_person
    vehicleCondition
    powerSteering
    shape
    color
    bidStatus
    city
    area
    paymentTerms
    dateOfRegistration
    hypothication
    climateControl
    doorCount
    gearBox
    buyerFees
    rtoFine
    parkingRate
    approxParkingCharges
    clientContactPerson
    clientContactNo
    additionalRemarks
    lotNumber
    createdAt
    updatedAt
    createdById
  }
}
    `;
export type UpdateVehicleMutationFn = Apollo.MutationFunction<UpdateVehicleMutation, UpdateVehicleMutationVariables>;

/**
 * __useUpdateVehicleMutation__
 *
 * To run a mutation, you first call `useUpdateVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVehicleMutation, { data, loading, error }] = useUpdateVehicleMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateVehicleInput: // value for 'updateVehicleInput'
 *   },
 * });
 */
export function useUpdateVehicleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVehicleMutation, UpdateVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVehicleMutation, UpdateVehicleMutationVariables>(UpdateVehicleDocument, options);
      }
export type UpdateVehicleMutationHookResult = ReturnType<typeof useUpdateVehicleMutation>;
export type UpdateVehicleMutationResult = Apollo.MutationResult<UpdateVehicleMutation>;
export type UpdateVehicleMutationOptions = Apollo.BaseMutationOptions<UpdateVehicleMutation, UpdateVehicleMutationVariables>;
export const UpdateDateDocument = gql`
    mutation UpdateDate($where: VehicleWhereUniqueInput!, $updateVehicleInput: UpdateVehicleInput!) {
  updateVehicle(where: $where, updateVehicleInput: $updateVehicleInput) {
    id
  }
}
    `;
export type UpdateDateMutationFn = Apollo.MutationFunction<UpdateDateMutation, UpdateDateMutationVariables>;

/**
 * __useUpdateDateMutation__
 *
 * To run a mutation, you first call `useUpdateDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDateMutation, { data, loading, error }] = useUpdateDateMutation({
 *   variables: {
 *      where: // value for 'where'
 *      updateVehicleInput: // value for 'updateVehicleInput'
 *   },
 * });
 */
export function useUpdateDateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDateMutation, UpdateDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDateMutation, UpdateDateMutationVariables>(UpdateDateDocument, options);
      }
export type UpdateDateMutationHookResult = ReturnType<typeof useUpdateDateMutation>;
export type UpdateDateMutationResult = Apollo.MutationResult<UpdateDateMutation>;
export type UpdateDateMutationOptions = Apollo.BaseMutationOptions<UpdateDateMutation, UpdateDateMutationVariables>;
export const DeleteVehicleDocument = gql`
    mutation DeleteVehicle($where: VehicleWhereUniqueInput!) {
  deleteVehicle(where: $where) {
    id
    registrationNumber
    vehicleIndexNo
  }
}
    `;
export type DeleteVehicleMutationFn = Apollo.MutationFunction<DeleteVehicleMutation, DeleteVehicleMutationVariables>;

/**
 * __useDeleteVehicleMutation__
 *
 * To run a mutation, you first call `useDeleteVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVehicleMutation, { data, loading, error }] = useDeleteVehicleMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteVehicleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVehicleMutation, DeleteVehicleMutationVariables>(DeleteVehicleDocument, options);
      }
export type DeleteVehicleMutationHookResult = ReturnType<typeof useDeleteVehicleMutation>;
export type DeleteVehicleMutationResult = Apollo.MutationResult<DeleteVehicleMutation>;
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>;
export const RestorevehicleDocument = gql`
    mutation Restorevehicle($where: VehicleWhereUniqueInput!) {
  restorevehicle(where: $where) {
    id
    vehicleIndexNo
    registrationNumber
  }
}
    `;
export type RestorevehicleMutationFn = Apollo.MutationFunction<RestorevehicleMutation, RestorevehicleMutationVariables>;

/**
 * __useRestorevehicleMutation__
 *
 * To run a mutation, you first call `useRestorevehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestorevehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restorevehicleMutation, { data, loading, error }] = useRestorevehicleMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRestorevehicleMutation(baseOptions?: Apollo.MutationHookOptions<RestorevehicleMutation, RestorevehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestorevehicleMutation, RestorevehicleMutationVariables>(RestorevehicleDocument, options);
      }
export type RestorevehicleMutationHookResult = ReturnType<typeof useRestorevehicleMutation>;
export type RestorevehicleMutationResult = Apollo.MutationResult<RestorevehicleMutation>;
export type RestorevehicleMutationOptions = Apollo.BaseMutationOptions<RestorevehicleMutation, RestorevehicleMutationVariables>;