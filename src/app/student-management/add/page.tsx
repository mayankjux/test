'use client';
//💡Message from Mayank: Currently there are some issues that I am planning to resolve later as currently it will affect the delivery time. Please consider these while developing this form: 
//1. The county input field is meant to show countries list with flags. tried one library but faced some isseus. Will fix late.
//2. according to the country selected, user should get options for state, city fields. phone number will also include country code (for example: +91)
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  User,
  Phone,
  Users,
  GraduationCap,
  CreditCard,
  Stethoscope,
  Bus,
  FileText,
  Calendar,
  Upload as UploadIcon,
  X,
  Plus,
  Check,
  MoreVertical,
  Lock,
  Mail,
  Car,
  Footprints,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import React from 'react';
import { CountrySelect } from '@/components/CountrySelect';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Guardian {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  countryCode: string;
  address: string; // Changed from complex object to simple string
}

interface VaccinationRecord {
  vaccineName: string;
  date: string;
  status: 'Completed' | 'Pending';
}

interface HealthIncident {
  date: string;
  description: string;
  actionTaken?: string;
}

interface UploadedFile {
  file: File;
  name: string;
  type?: string;
  status: 'uploaded' | 'pending' | 'error';
}

interface UploadStatus {
  type: 'success' | 'error';
  message: string;
}

interface TransportPerson {
  name: string;
  relationship: string;
  phone: string;
  isGuardian: boolean;
  guardianId?: number;
}

interface StudentFormData {
  // Personal Details
  firstName: string;
  middleName?: string;
  lastName: string;
  enrollmentNumber: string;
  rollNumber?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
  aadhaarNumber?: string;
  apaarNumber?: string;
  profileImage?: File;

  // Contact Information
  residentialAddress: Address;
  permanentAddress: Address;
  useResidentialAsPermanent: boolean;
  contactNumber: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  // Guardian Details
  guardians: Guardian[];

  // Academic Details
  grade: string;
  section: string;
  stream?: string;
  subjects: string[];
  academicYear: string;

  // Fee Details
  feeStructure: {
    tuitionFee: number;
    transportFee: number;
    otherCharges: number;
    discounts?: number;
  };
  firstInstallmentDate: string;
  outstandingAmount: number;

  // Health Records
  medicalConditions?: string;
  allergies?: string;
  vaccinationRecords: VaccinationRecord[];
  healthIncidents: HealthIncident[];

  // Transport Details
  transportMode: 'School Bus' | 'Private' | 'Walking';
  route?: string;
  pickupPoint?: string;
  driverName?: string;
  driverContact?: string;

  // Documents
  documents: {
    birthCertificate?: File;
    previousSchoolRecords?: File;
    medicalCertificate?: File;
    otherDocuments: File[];
  };

  dropOffPoint?: string;
  transportPersons: TransportPerson[];
}

interface Stream {
  id: string;
  name: string;
  subjects: Subject[];
}

interface Subject {
  id: string;
  name: string;
  type: 'core' | 'elective';
}

const grades = [
  { id: 'nursery', name: 'Nursery' },
  { id: 'kg', name: 'Kindergarten' },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `grade${i + 1}`,
    name: `Grade ${i + 1}`
  }))
] as const;

const sections = ['A', 'B', 'C', 'D'] as const;

const streams: Stream[] = [
  {
    id: 'science',
    name: 'Science',
    subjects: [
      { id: 'physics', name: 'Physics', type: 'core' },
      { id: 'chemistry', name: 'Chemistry', type: 'core' },
      { id: 'biology', name: 'Biology', type: 'elective' },
      { id: 'mathematics', name: 'Mathematics', type: 'core' },
      { id: 'computer_science', name: 'Computer Science', type: 'elective' },
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    subjects: [
      { id: 'accountancy', name: 'Accountancy', type: 'core' },
      { id: 'business_studies', name: 'Business Studies', type: 'core' },
      { id: 'economics', name: 'Economics', type: 'core' },
      { id: 'mathematics', name: 'Mathematics', type: 'elective' },
      { id: 'computer_science', name: 'Computer Science', type: 'elective' },
    ]
  },
  {
    id: 'arts',
    name: 'Arts',
    subjects: [
      { id: 'history', name: 'History', type: 'core' },
      { id: 'political_science', name: 'Political Science', type: 'core' },
      { id: 'economics', name: 'Economics', type: 'core' },
      { id: 'psychology', name: 'Psychology', type: 'elective' },
      { id: 'sociology', name: 'Sociology', type: 'elective' },
    ]
  }
];

const commonSubjects: Subject[] = [
  { id: 'english', name: 'English', type: 'core' },
  { id: 'mathematics', name: 'Mathematics', type: 'core' },
  { id: 'science', name: 'Science', type: 'core' },
  { id: 'social_studies', name: 'Social Studies', type: 'core' },
  { id: 'language', name: 'Second Language', type: 'core' },
  { id: 'computer', name: 'Computer', type: 'elective' },
  { id: 'arts', name: 'Arts', type: 'elective' },
  { id: 'physical_education', name: 'Physical Education', type: 'elective' },
];

const steps = [
  { id: 'personal', title: 'Personal Details', icon: User, isPremium: false },
  { id: 'contact', title: 'Contact Information', icon: Phone, isPremium: false },
  { id: 'guardian', title: 'Guardian Details', icon: Users, isPremium: false },
  { id: 'academic', title: 'Academic Details', icon: GraduationCap, isPremium: false },
  { id: 'fee', title: 'Fee Details', icon: CreditCard, isPremium: true },
  { id: 'health', title: 'Health Records', icon: Stethoscope, isPremium: true },
  { id: 'transport', title: 'Transport Details', icon: Bus, isPremium: false },
  { id: 'documents', title: 'Documents Upload', icon: FileText, isPremium: false },
];

const relationshipOptions = [
  { id: 'parent', name: 'Parent' },
  { id: 'guardian', name: 'Guardian' },
  { id: 'sibling', name: 'Sibling' },
  { id: 'relative', name: 'Relative' },
  { id: 'friend', name: 'Friend' },
  { id: 'neighbor', name: 'Neighbor' },
  { id: 'other', name: 'Other' },
] as const;

const AddStudentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<StudentFormData>({
    // Initialize with default values
    firstName: '',
    middleName: '',
    lastName: '',
    enrollmentNumber: '',
    aadhaarNumber: '',
    dateOfBirth: '',
    gender: 'Male',
    nationality: '',
    residentialAddress: {
      line1: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    permanentAddress: {
      line1: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    useResidentialAsPermanent: false,
    contactNumber: '',
    email: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    guardians: [
      {
        name: '',
        relationship: '',
        phone: '',
        email: '',
        isPrimary: true,
        countryCode: 'IN',
        address: '' // Changed from object to string
      }
    ],
    grade: '',
    section: '',
    subjects: commonSubjects
      .filter(subject => subject.type === 'core')
      .map(subject => subject.id),
    academicYear: new Date().getFullYear().toString(),
    feeStructure: {
      tuitionFee: 0,
      transportFee: 0,
      otherCharges: 0,
    },
    firstInstallmentDate: '',
    outstandingAmount: 0,
    vaccinationRecords: [],
    healthIncidents: [],
    transportMode: 'Private',
    documents: {
      otherDocuments: [],
    },
    dropOffPoint: '',
    transportPersons: [],
  });

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuIndex !== null && !(event.target as Element).closest('.guardian-menu')) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuIndex]);

  const handleInputChange = (field: string, value: string | number | boolean | File | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (type: 'residential' | 'permanent', field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      console.log('Form submitted:', formData);
      // Handle final submission
    } else {
      handleNext();
    }
  };

  // Update the input field classes throughout the form
  const inputClasses = "w-full px-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/20 outline-none transition-all duration-200";

  const renderStepContent = (stepId: string) => {
    switch (stepId) {
      case 'personal':
        return (
          <div className="space-y-6">
            {/* Profile Image - Left aligned with vertically centered text */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#4D4F52] mb-4">
                Profile Image <span className="text-[#7A7D81]">(Optional)</span>
              </label>
              <div className="flex items-center gap-4">
                {formData.profileImage ? (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('profileImage', undefined)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-50"
                    >
                      <X size={16} className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-32 h-32 bg-[#F5F8F9] border-2 border-dashed border-[#E4E8EA] rounded-xl cursor-pointer hover:bg-[#E4E8EA]/50 transition-colors">
                    <UploadIcon size={24} className="text-[#7A7D81]" />
                    <span className="text-xs text-[#7A7D81] mt-2">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleInputChange('profileImage', file);
                        }
                      }}
                    />
                  </label>
                )}
                <div className="text-sm text-[#7A7D81] flex flex-col justify-center">
                  <p>Upload a profile picture (Max 5MB)</p>
                  <p>Supported formats: JPG, PNG</p>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Middle Name <span className="text-[#7A7D81]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Enrollment and Roll Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Enrollment Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.enrollmentNumber}
                  onChange={(e) => handleInputChange('enrollmentNumber', e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Roll Number <span className="text-[#7A7D81]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Date of Birth and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`${inputClasses} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                    required
                  />
                  <Calendar 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4D4F52] pointer-events-none" 
                    size={20} 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value as 'Male' | 'Female' | 'Other')}
                  className={inputClasses}
                  required
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Nationality, Aadhaar and APAAR Number */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  className={inputClasses}
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  APAAR Number <span className="text-[#7A7D81]">(If applicable)</span>
                </label>
                <input
                  type="text"
                  value={formData.apaarNumber}
                  onChange={(e) => handleInputChange('apaarNumber', e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            {/* Residential Address */}
            <div>
              <h3 className="text-lg font-semibold text-[#0D373D] mb-4">Residential Address</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.residentialAddress.line1}
                    onChange={(e) => handleAddressChange('residential', 'line1', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Address Line 2 <span className="text-[#7A7D81]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.residentialAddress.line2}
                    onChange={(e) => handleAddressChange('residential', 'line2', e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <CountrySelect
                      value={formData.residentialAddress.country}
                      onChange={(value) => handleAddressChange('residential', 'country', value)}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.residentialAddress.state}
                      onChange={(e) => handleAddressChange('residential', 'state', e.target.value)}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.residentialAddress.city}
                      onChange={(e) => handleAddressChange('residential', 'city', e.target.value)}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.residentialAddress.postalCode}
                      onChange={(e) => handleAddressChange('residential', 'postalCode', e.target.value)}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Permanent Address Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#0D373D] mb-2">Permanent Address</h3>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="sameAsResidential"
                  checked={formData.useResidentialAsPermanent}
                  onChange={(e) => {
                    handleInputChange('useResidentialAsPermanent', e.target.checked);
                    if (e.target.checked) {
                      Object.keys(formData.residentialAddress).forEach((key) => {
                        handleAddressChange('permanent', key as keyof Address, formData.residentialAddress[key as keyof Address] || '');
                      });
                    }
                  }}
                  className="rounded border-[#E4E8EA] text-[#0D373D] focus:ring-[#0D373D]"
                />
                <label htmlFor="sameAsResidential" className="ml-2 text-sm text-[#4D4F52]">
                  Same as Residential Address
                </label>
              </div>

              {!formData.useResidentialAsPermanent && (
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.permanentAddress.line1}
                      onChange={(e) => handleAddressChange('permanent', 'line1', e.target.value)}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Address Line 2 <span className="text-[#7A7D81]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.permanentAddress.line2}
                      onChange={(e) => handleAddressChange('permanent', 'line2', e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <CountrySelect
                        value={formData.permanentAddress.country}
                        onChange={(value) => handleAddressChange('permanent', 'country', value)}
                        className={inputClasses}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress.state}
                        onChange={(e) => handleAddressChange('permanent', 'state', e.target.value)}
                        className={inputClasses}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress.city}
                        onChange={(e) => handleAddressChange('permanent', 'city', e.target.value)}
                        className={inputClasses}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress.postalCode}
                        onChange={(e) => handleAddressChange('permanent', 'postalCode', e.target.value)}
                        className={inputClasses}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#0D373D] mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={inputClasses}
                    required
                  />
                  <p className="mt-2 text-sm text-[#7A7D81]">
                    Access credentials for the student account will be sent to this email address.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Contact Number <span className="text-[#7A7D81]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold text-[#0D373D] mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.emergencyContact.relationship}
                    onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                    className={inputClasses}
                    required
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'guardian':
        return (
          <div className="space-y-6">
            {formData.guardians.map((guardian, index) => (
              <div 
                key={index} 
                className="border-2 border-[#E4E8EA] rounded-xl p-6 space-y-6 relative hover:border-[#0D373D]/20 transition-colors"
              >
                {/* Header Section with Badge and Menu */}
                {guardian.isPrimary ? (
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-[#E2FDCB] text-[#0D373D]">
                      Primary
                    </span>

                    {formData.guardians.length > 1 && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuIndex(openMenuIndex === index ? null : index);
                          }}
                          className="p-2 hover:bg-[#F5F8F9] rounded-lg transition-colors"
                        >
                          <MoreVertical size={20} className="text-[#4D4F52]" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuIndex === index && (
                          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-[#E4E8EA] py-1 z-10">
                            <button
                              type="button"
                              onClick={() => {
                                const newGuardians = [...formData.guardians];
                                newGuardians.splice(index, 1);
                                // If removing primary guardian, make the first remaining guardian primary
                                if (guardian.isPrimary && newGuardians.length > 0) {
                                  newGuardians[0].isPrimary = true;
                                }
                                setFormData(prev => ({
                                  ...prev,
                                  guardians: newGuardians
                                }));
                                setOpenMenuIndex(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#FFEAEA] text-[#D32F2F] flex items-center gap-2"
                            >
                              <X size={16} />
                              Remove Guardian
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {formData.guardians.length > 1 && (
                      <div className="absolute top-3 right-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuIndex(openMenuIndex === index ? null : index);
                          }}
                          className="p-2 hover:bg-[#F5F8F9] rounded-lg transition-colors"
                        >
                          <MoreVertical size={20} className="text-[#4D4F52]" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuIndex === index && (
                          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-[#E4E8EA] py-1 z-10">
                            <button
                              type="button"
                              onClick={() => {
                                const newGuardians = formData.guardians.map((g, i) => ({
                                  ...g,
                                  isPrimary: i === index
                                }));
                                setFormData(prev => ({
                                  ...prev,
                                  guardians: newGuardians
                                }));
                                setOpenMenuIndex(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#F5F8F9] text-[#0D373D] flex items-center gap-2"
                            >
                              <Check size={16} />
                              Mark as Primary
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newGuardians = [...formData.guardians];
                                newGuardians.splice(index, 1);
                                setFormData(prev => ({
                                  ...prev,
                                  guardians: newGuardians
                                }));
                                setOpenMenuIndex(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#FFEAEA] text-[#D32F2F] flex items-center gap-2"
                            >
                              <X size={16} />
                              Remove Guardian
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Add padding-top to create space for the header */}
                <div className="pt-1">
                  {/* Guardian Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Guardian Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={guardian.name}
                        onChange={(e) => {
                          const newGuardians = [...formData.guardians];
                          newGuardians[index] = {
                            ...newGuardians[index],
                            name: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            guardians: newGuardians
                          }));
                        }}
                        className={inputClasses}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Relationship <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={guardian.relationship}
                        onChange={(e) => {
                          const newGuardians = [...formData.guardians];
                          newGuardians[index] = {
                            ...newGuardians[index],
                            relationship: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            guardians: newGuardians
                          }));
                        }}
                        className={inputClasses}
                        required
                      >
                        <option value="">Select relationship</option>
                        {relationshipOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={guardian.phone}
                        onChange={(e) => {
                          const newGuardians = [...formData.guardians];
                          newGuardians[index] = {
                            ...newGuardians[index],
                            phone: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            guardians: newGuardians
                          }));
                        }}
                        className={inputClasses}
                        required
                        placeholder="Phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={guardian.email}
                        onChange={(e) => {
                          const newGuardians = [...formData.guardians];
                          newGuardians[index] = {
                            ...newGuardians[index],
                            email: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            guardians: newGuardians
                          }));
                        }}
                        className={inputClasses}
                        required
                      />
                    </div>

                    {/* Address field moved to bottom and spans full width */}
                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={guardian.address || ''}
                        onChange={(e) => {
                          const newGuardians = [...formData.guardians];
                          newGuardians[index] = {
                            ...newGuardians[index],
                            address: e.target.value
                          };
                          setFormData(prev => ({
                            ...prev,
                            guardians: newGuardians
                          }));
                        }}
                        placeholder="Enter complete address"
                        className={`${inputClasses} min-h-[80px] resize-y`}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Guardian Button */}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  guardians: [
                    ...prev.guardians,
                    {
                      name: '',
                      relationship: '',
                      countryCode: 'IN',
                      phone: '',
                      email: '',
                      isPrimary: prev.guardians.length === 0
                    }
                  ]
                }));
              }}
              className="w-full py-3 border-2 border-dashed border-[#E4E8EA] rounded-xl text-[#4D4F52] hover:bg-[#F5F8F9] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Another Guardian
            </button>
          </div>
        );
      case 'academic':
        const selectedGrade = formData.grade;
        const isHigherGrade = selectedGrade.includes('grade') && 
          parseInt(selectedGrade.replace('grade', '')) >= 9;
        
        const availableSubjects = isHigherGrade && formData.stream
          ? streams.find(s => s.id === formData.stream)?.subjects || []
          : commonSubjects;

        return (
          <div className="space-y-8">
            {/* Grade and Academic Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Grade/Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => {
                    handleInputChange('grade', e.target.value);
                    // Reset stream and update subjects if switching to lower grade
                    if (!e.target.value.includes('grade') || 
                        parseInt(e.target.value.replace('grade', '')) < 9) {
                      handleInputChange('stream', '');
                      // Set all common core subjects
                      const coreSubjects = commonSubjects
                        .filter(subject => subject.type === 'core')
                        .map(subject => subject.id);
                      handleInputChange('subjects', coreSubjects);
                    }
                  }}
                  className={inputClasses}
                  required
                >
                  <option value="">Select grade</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.academicYear}
                  onChange={(e) => handleInputChange('academicYear', e.target.value)}
                  className={inputClasses}
                  required
                >
                  {[0, 1, 2].map((offset) => {
                    const year = new Date().getFullYear() + offset;
                    const academicYear = `${year}-${year + 1}`;
                    return (
                      <option key={year} value={academicYear}>
                        {academicYear}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Section */}
            <div>
              <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                Section <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sections.map(section => (
                  <label
                    key={section}
                    className={`
                      relative flex items-center justify-center p-4 cursor-pointer
                      rounded-xl border-2 transition-all duration-200
                      ${formData.section === section 
                        ? 'border-[#0D373D] bg-[#E2FDCB]' 
                        : 'border-[#E4E8EA] bg-[#F5F8F9] hover:bg-[#E4E8EA]/50'
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleInputChange('section', formData.section === section ? '' : section);
                    }}
                  >
                    <input
                      type="radio"
                      name="section"
                      value={section}
                      checked={formData.section === section}
                      onChange={() => {}} // Empty onChange to prevent React warning
                      className="absolute opacity-0"
                      required
                    />
                    <span className={`
                      text-base font-medium
                      ${formData.section === section ? 'text-[#0D373D]' : 'text-[#4D4F52]'}
                    `}>
                      Section {section}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stream (for higher grades only) */}
            {isHigherGrade && (
              <div>
                <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Stream <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.stream}
                  onChange={(e) => {
                    handleInputChange('stream', e.target.value);
                    // Get core subjects from selected stream
                    const selectedStream = streams.find(s => s.id === e.target.value);
                    const coreSubjects = selectedStream
                      ? selectedStream.subjects
                          .filter(subject => subject.type === 'core')
                          .map(subject => subject.id)
                      : [];
                    handleInputChange('subjects', coreSubjects);
                  }}
                  className={`${inputClasses} w-full md:w-1/2`}
                  required
                >
                  <option value="">Select stream</option>
                  {streams.map(stream => (
                    <option key={stream.id} value={stream.id}>
                      {stream.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                Subjects <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                {/* Core Subjects */}
                <div>
                  <h4 className="text-sm font-medium text-[#4D4F52] mb-3">Core Subjects</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableSubjects
                      .filter(subject => subject.type === 'core')
                      .map(subject => (
                        <label
                          key={subject.id}
                          className="flex items-center space-x-3 p-4 rounded-xl border border-[#E4E8EA] bg-[#F5F8F9]"
                        >
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject.id)}
                            onChange={(e) => {
                              const updatedSubjects = e.target.checked
                                ? [...formData.subjects, subject.id]
                                : formData.subjects.filter(id => id !== subject.id);
                              handleInputChange('subjects', updatedSubjects);
                            }}
                            className="rounded border-[#E4E8EA] text-[#0D373D] focus:ring-[#0D373D]"
                          />
                          <span>{subject.name}</span>
                        </label>
                      ))}
                  </div>
                </div>

                {/* Elective Subjects */}
                <div>
                  <h4 className="text-sm font-medium text-[#4D4F52] mb-3">
                    Elective Subjects <span className="text-[#7A7D81]">(Select up to 3)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableSubjects
                      .filter(subject => subject.type === 'elective')
                      .map(subject => (
                        <label
                          key={subject.id}
                          className="flex items-center space-x-3 p-4 rounded-xl border border-[#E4E8EA] bg-[#F5F8F9]"
                        >
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject.id)}
                            onChange={(e) => {
                              const currentElectives = formData.subjects.filter(id => 
                                availableSubjects.find(s => s.id === id)?.type === 'elective'
                              );
                              
                              if (e.target.checked && currentElectives.length >= 3) {
                                // Show error or notification about max electives
                                return;
                              }

                              const updatedSubjects = e.target.checked
                                ? [...formData.subjects, subject.id]
                                : formData.subjects.filter(id => id !== subject.id);
                              handleInputChange('subjects', updatedSubjects);
                            }}
                            className="rounded border-[#E4E8EA] text-[#0D373D] focus:ring-[#0D373D]"
                            disabled={
                              !formData.subjects.includes(subject.id) &&
                              formData.subjects.filter(id => 
                                availableSubjects.find(s => s.id === id)?.type === 'elective'
                              ).length >= 3
                            }
                          />
                          <span>{subject.name}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'fee':
        return (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center space-y-4">
              <Lock className="w-12 h-12 text-[#0D373D] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-[#0D373D]">
                  Fee Details is a Premium Feature
                </h3>
                <p className="text-[#7A7D81]">
                  Unlock powerful fee management features with our premium version:
                </p>
              </div>
              <div className="flex justify-center pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-left">
                  {[
                    'Custom Fee Structures',
                    'Discount Management',
                    'Real-Time Fee Insights',
                    'Recurring Payments Made Simple',
                    'Secure Payment Gateway'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#4D4F52]">
                      <Check size={16} className="text-[#0D373D] flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <a 
                href="mailto:support@example.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0D373D] text-white rounded-xl hover:bg-[#1F4D54] transition-colors mt-16"
              >
                <Mail size={20} />
                Contact Support
              </a>
            </div>
          </div>
        );
      case 'health':
        return (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center space-y-4">
              <Lock className="w-12 h-12 text-[#0D373D] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-[#0D373D]">
                  Health Records is a Premium Feature
                </h3>
                <p className="text-[#7A7D81]">
                  Unlock comprehensive health tracking features with our premium version:
                </p>
              </div>
              <div className="flex justify-center pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-left">
                  {[
                    'Medical History Tracking',
                    'Vaccination Records',
                    'Allergy Management',
                    'Health Incident Reports'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#4D4F52]">
                      <Check size={16} className="text-[#0D373D] flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <a 
                href="mailto:support@example.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0D373D] text-white rounded-xl hover:bg-[#1F4D54] transition-colors mt-16"
              >
                <Mail size={20} />
                Contact Support
              </a>
            </div>
          </div>
        );
      case 'transport':
        return (
          <div className="space-y-8">
            {/* Transport Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-[#4D4F52] mb-4">
                Transport Mode <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { mode: 'Private', icon: Footprints },
                  { mode: 'School Bus', icon: Bus }
                ].map(({ mode, icon: Icon }) => (
                  <label
                    key={mode}
                    className={`
                      relative flex items-center justify-center p-4 cursor-pointer
                      rounded-xl border-2 transition-all duration-200
                      ${formData.transportMode === mode 
                        ? 'border-[#0D373D] bg-[#E2FDCB]' 
                        : 'border-[#E4E8EA] bg-[#F5F8F9] hover:bg-[#E4E8EA]/50'
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleInputChange('transportMode', mode as 'School Bus' | 'Private');
                    }}
                  >
                    <input
                      type="radio"
                      name="transportMode"
                      value={mode}
                      checked={formData.transportMode === mode}
                      onChange={() => {}} // Empty onChange to prevent React warning
                      className="absolute opacity-0"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <Icon 
                        size={20} 
                        className={formData.transportMode === mode ? 'text-[#0D373D]' : 'text-[#4D4F52]'}
                      />
                      <span className={`
                        text-base font-medium
                        ${formData.transportMode === mode ? 'text-[#0D373D]' : 'text-[#4D4F52]'}
                      `}>
                        {mode}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Private Transport Details */}
            {formData.transportMode === 'Private' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-[#4D4F52]">
                      Authorized Persons for Drop/Receive
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          transportPersons: [
                            ...prev.transportPersons,
                            { name: '', relationship: '', phone: '', isGuardian: false }
                          ]
                        }));
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-[#E4E8EA] rounded-xl hover:bg-[#F5F8F9] transition-colors"
                    >
                      <Plus size={16} />
                      Add Person
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.transportPersons.map((person, index) => (
                      <div 
                        key={index}
                        className="border border-[#E4E8EA] rounded-xl p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-[#4D4F52]">
                            Person {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                transportPersons: prev.transportPersons.filter((_, i) => i !== index)
                              }));
                            }}
                            className="p-2 hover:bg-red-50 rounded-full"
                          >
                            <X size={16} className="text-red-500" />
                          </button>
                        </div>

                        {/* Select from Guardians or Add New */}
                        <div>
                          <label className="inline-flex items-center mb-4">
                            <input
                              type="checkbox"
                              checked={person.isGuardian}
                              onChange={(e) => {
                                const newPersons = [...formData.transportPersons];
                                newPersons[index] = {
                                  ...newPersons[index],
                                  isGuardian: e.target.checked
                                };
                                setFormData(prev => ({
                                  ...prev,
                                  transportPersons: newPersons
                                }));
                              }}
                              className="rounded border-[#E4E8EA] text-[#0D373D] focus:ring-[#0D373D]"
                            />
                            <span className="ml-2 text-sm text-[#4D4F52]">
                              Select from existing guardians
                            </span>
                          </label>

                          {person.isGuardian ? (
                            <select
                              value={person.guardianId}
                              onChange={(e) => {
                                const guardian = formData.guardians[parseInt(e.target.value)];
                                const newPersons = [...formData.transportPersons];
                                newPersons[index] = {
                                  name: guardian.name,
                                  relationship: guardian.relationship,
                                  phone: guardian.phone,
                                  isGuardian: true,
                                  guardianId: parseInt(e.target.value)
                                };
                                setFormData(prev => ({
                                  ...prev,
                                  transportPersons: newPersons
                                }));
                              }}
                              className={inputClasses}
                            >
                              <option value="">Select Guardian</option>
                              {formData.guardians.map((guardian, idx) => (
                                <option key={idx} value={idx}>
                                  {guardian.name} ({guardian.relationship})
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <input
                                  type="text"
                                  value={person.name}
                                  onChange={(e) => {
                                    const newPersons = [...formData.transportPersons];
                                    newPersons[index] = {
                                      ...newPersons[index],
                                      name: e.target.value
                                    };
                                    setFormData(prev => ({
                                      ...prev,
                                      transportPersons: newPersons
                                    }));
                                  }}
                                  placeholder="Name"
                                  className={inputClasses}
                                />
                              </div>
                              <div>
                                <select
                                  value={person.relationship}
                                  onChange={(e) => {
                                    const newPersons = [...formData.transportPersons];
                                    newPersons[index] = {
                                      ...newPersons[index],
                                      relationship: e.target.value
                                    };
                                    setFormData(prev => ({
                                      ...prev,
                                      transportPersons: newPersons
                                    }));
                                  }}
                                  className={inputClasses}
                                >
                                  <option value="">Select Relationship</option>
                                  {relationshipOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <input
                                  type="tel"
                                  value={person.phone}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || (/^\d+$/.test(value) && value.length <= 10)) {
                                      const newPersons = [...formData.transportPersons];
                                      newPersons[index] = {
                                        ...newPersons[index],
                                        phone: value
                                      };
                                      setFormData(prev => ({
                                        ...prev,
                                        transportPersons: newPersons
                                      }));
                                    }
                                  }}
                                  placeholder="Contact Number"
                                  className={inputClasses}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {formData.transportPersons.length === 0 && (
                      <p className="text-sm text-[#7A7D81] text-center py-4">
                        No authorized persons added yet. Click "Add Person" to add someone.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* School Bus Details */}
            {formData.transportMode === 'School Bus' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Bus Number */}
                <div>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Bus Number
                  </label>
                  <input
                    type="text"
                    value={formData.route || ''}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    placeholder="Enter bus number"
                    className={`${inputClasses} w-full md:w-1/2`}
                  />
                </div>

                {/* Pickup and Drop-off Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pickup Point */}
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Pickup Point
                    </label>
                    <input
                      type="text"
                      value={formData.pickupPoint || ''}
                      onChange={(e) => handleInputChange('pickupPoint', e.target.value)}
                      placeholder="Enter pickup location"
                      className={inputClasses}
                    />
                    <p className="mt-2 text-sm text-[#7A7D81]">
                      Specify a landmark or exact location
                    </p>
                  </div>

                  {/* Drop-off Point */}
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Drop-off Point
                    </label>
                    <input
                      type="text"
                      value={formData.dropOffPoint || ''}
                      onChange={(e) => handleInputChange('dropOffPoint', e.target.value)}
                      placeholder="Enter drop-off location"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Driver Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Driver Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Driver Name
                    </label>
                    <input
                      type="text"
                      value={formData.driverName || ''}
                      onChange={(e) => handleInputChange('driverName', e.target.value)}
                      placeholder="Enter driver's name"
                      className={inputClasses}
                    />
                  </div>

                  {/* Driver Contact */}
                  <div>
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      Driver Contact
                    </label>
                    <input
                      type="tel"
                      value={formData.driverContact || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers and limit to 10 digits
                        if (value === '' || (/^\d+$/.test(value) && value.length <= 10)) {
                          handleInputChange('driverContact', value);
                        }
                      }}
                      placeholder="Enter 10-digit phone number"
                      className={inputClasses}
                    />
                    {formData.driverContact && formData.driverContact.length !== 10 && (
                      <p className="mt-2 text-sm text-red-500">
                        Driver contact must be a 10-digit phone number
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#0D373D] mb-2">
                Upload Documents
              </h3>
              <p className="text-[#7A7D81]">
                Drag and drop your documents into the box below or click to select files for upload.
              </p>
            </div>

            {/* Drag and Drop Area */}
            <div 
              className={`
                border-2 border-dashed border-[#E4E8EA] rounded-xl p-8
                flex flex-col items-center justify-center
                min-h-[200px] cursor-pointer
                hover:bg-[#F5F8F9] transition-colors
                ${isDragging ? 'border-[#0D373D] bg-[#E2FDCB]' : ''}
              `}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload(files);
              }}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <UploadIcon size={32} className="text-[#7A7D81] mb-4" />
              <p className="text-[#4D4F52] mb-2">
                Drag and drop files here or click to upload
              </p>
              <p className="text-sm text-[#7A7D81]">
                Accepted formats: PDF, JPEG, PNG (Max 10MB)
              </p>
              <input
                id="fileInput"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleFileUpload(files);
                }}
                className="hidden"
              />
            </div>

            {/* Uploaded Documents List */}
            {uploadedFiles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[#4D4F52] mb-4">
                  Uploaded Documents
                </h4>
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index}
                      className="border border-[#E4E8EA] rounded-xl p-4 flex items-start gap-4"
                    >
                      <FileText className="text-[#7A7D81] flex-shrink-0 mt-1" size={24} />
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#4D4F52] truncate" title={file.name}>
                            {file.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="p-2 hover:bg-red-50 rounded-full ml-2 flex-shrink-0"
                          >
                            <X size={20} className="text-red-500" />
                          </button>
                        </div>
                        <select
                          value={file.type || ''}
                          onChange={(e) => handleDocumentTypeChange(index, e.target.value)}
                          className={`${inputClasses} mt-2`}
                          required
                        >
                          <option value="">Select Document Type</option>
                          <option value="birthCertificate">Birth Certificate</option>
                          <option value="academicRecords">Previous Academic Records</option>
                          <option value="addressProof">Address Proof</option>
                          <option value="medicalCertificate">Medical Certificate</option>
                          <option value="other">Other Supporting Documents</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Status Messages */}
            {uploadStatus && (
              <div className={`
                p-4 rounded-xl mt-4
                ${uploadStatus.type === 'success' ? 'bg-[#E2FDCB] text-[#0D373D]' : 'bg-red-50 text-red-500'}
              `}>
                {uploadStatus.message}
              </div>
            )}
          </div>
        );
      // Add cases for other steps
      default:
        return null;
    }
  };

  const handleFileUpload = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        setUploadStatus({
          type: 'error',
          message: 'Invalid file format. Please upload PDF, JPEG, or PNG files only.'
        });
        return false;
      }
      
      if (!isValidSize) {
        setUploadStatus({
          type: 'error',
          message: 'File size exceeds 10MB limit.'
        });
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        file,
        name: file.name,
        status: 'uploaded' as const
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);

      // Update success message based on total number of files
      const totalFiles = validFiles.length;
      const fileWord = totalFiles === 1 ? 'file' : 'files';
      setUploadStatus({
        type: 'success',
        message: `${totalFiles} ${fileWord} uploaded successfully.`
      });
    }
  };

  const handleDocumentTypeChange = (index: number, type: string) => {
    setUploadedFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, type } : file
    ));
  };

  const handleRemoveFile = (index: number) => {
    if (confirm('Are you sure you want to remove this document?')) {
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F8F9] pb-24">
        <div className="max-w-[1000px] mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#0D373D]">Add New Student</h1>
              <p className="text-[#7A7D81] mt-2">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2.5 border border-[#E4E8EA] rounded-xl hover:bg-[#F5F8F9] transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Progress Bar - Increased margin bottom from mb-8 to mb-20 */}
          <div className="mb-20">
            <div className="flex mb-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex-1 relative ${index < steps.length - 1 ? 'mr-2' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-full flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden
                          ${step.isPremium 
                            ? 'bg-[#F5F8F9] border-2 border-[#E4E8EA]' 
                            : index < currentStep 
                              ? 'bg-[#0D373D]' 
                              : 'bg-[#E4E8EA]'
                          }
                        `}
                      >
                        {step.isPremium ? (
                          <Lock size={16} className="text-[#7A7D81]" />
                        ) : (
                          <>
                            <div
                              className={`absolute inset-0 transition-transform duration-700 ease-out origin-center
                                ${index === currentStep ? 'scale-100' : 'scale-0'}
                                ${index < currentStep ? 'scale-100' : ''}
                              `}
                              style={{
                                background: '#0D373D',
                                borderRadius: '50%',
                              }}
                            />
                            
                            {index === currentStep && (
                              <div
                                className="absolute inset-[-4px] rounded-full transition-opacity duration-300 ease-out"
                                style={{
                                  background: '#E2FDCB',
                                  opacity: '1',
                                  transitionDelay: '700ms',
                                  zIndex: -1
                                }}
                              />
                            )}
                            
                            <div className={`relative z-10 transition-colors duration-700 ease-out
                              ${index <= currentStep ? 'text-white' : 'text-[#4D4F52]'}
                            `}>
                              {React.createElement(step.icon, { size: 20 })}
                            </div>
                          </>
                        )}
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className="flex-1 relative h-[2px] bg-[#E4E8EA]">
                          <div
                            className={`absolute inset-y-0 left-0 bg-[#0D373D] transition-all ease-out duration-700
                              ${index < currentStep ? 'w-full' : 'w-0'}
                            `}
                            style={{
                              transitionDelay: index === currentStep ? '700ms' : '0ms',
                              transitionDuration: '700ms'
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {index === currentStep && (
                      <span className="absolute top-12 text-sm font-medium text-[#0D373D] whitespace-nowrap">
                        {step.title}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form id="studentForm" onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] p-6">
              {renderStepContent(steps[currentStep].id)}
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Footer with Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4E8EA] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-[1000px] mx-auto px-4 py-4">
          <div className="grid grid-cols-3 items-center">
            <div>
              <button
                type="button"
                onClick={handlePrevious}
                className={`flex items-center gap-2 px-6 py-2.5 border border-[#E4E8EA] rounded-xl hover:bg-[#F5F8F9] transition-colors ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                <ArrowLeft size={20} />
                Previous
              </button>
            </div>
            
            <div className="flex justify-center">
              <span className="text-sm text-[#7A7D81]">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <div className="flex justify-end">
              <button
                type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                form="studentForm"
                onClick={currentStep === steps.length - 1 ? undefined : handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0D373D] text-white rounded-xl hover:bg-[#1F4D54] transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                {currentStep !== steps.length - 1 && <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudentPage; 