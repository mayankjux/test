'use client';

import { useState } from 'react';
import { 
  Edit2, 
  MessageSquare, 
  FileText, 
  User, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Heart, 
  Bus, 
  AlertTriangle, 
  FileCheck,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  Download,
  Plus,
  Star,
  Trash2,
  Lock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface Guardian {
  name: string;
  email: string;
  contact: string;
  relation: string;
  isPrimaryGuardian: boolean;
}

interface StudentProfile {
  id: number;
  personalDetails: {
    fullName: string;
    enrollmentNumber: string;
    rollNumber: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    address: string;
    contactNumber: string;
    email: string;
    apaarNumber: string;
    guardians: Guardian[];
  };
  academicDetails: {
    grade: number;
    section: string;
    stream: string;
    subjects: string[];
    performance: {
      term: string;
      gpa: number;
      subjects: {
        name: string;
        grade: string;
        score: number;
      }[];
    }[];
  };
  attendanceRecords: {
    overall: number;
    monthly: {
      month: string;
      percentage: number;
      present: number;
      total: number;
    }[];
  };
  feeDetails: {
    structure: {
      type: string;
      amount: number;
      status: 'Paid' | 'Pending' | 'Overdue';
    }[];
    history: {
      date: string;
      amount: number;
      type: string;
      mode: string;
      status: 'Success' | 'Failed' | 'Pending';
    }[];
    outstanding: number;
  };
  healthRecords: {
    conditions: string[];
    allergies: string[];
    vaccinations: {
      name: string;
      date: string;
      status: 'Completed' | 'Pending' | 'Overdue';
    }[];
    incidents: {
      date: string;
      description: string;
      action: string;
    }[];
  };
  transportDetails: {
    mode: 'School Bus' | 'Private' | 'Walking';
    route?: string;
    pickupPoint?: string;
    dropPoint?: string;
    driverName?: string;
    driverContact?: string;
  };
  disciplinaryRecords: {
    date: string;
    type: string;
    description: string;
    action: string;
    status: 'Resolved' | 'Pending';
  }[];
  documents: {
    name: string;
    type: string;
    uploadDate: string;
    status: 'Verified' | 'Pending' | 'Rejected';
    url: string;
  }[];
}

type TabType = 'personal' | 'academic' | 'attendance' | 'fees' | 'health' | 'transport' | 'discipline' | 'documents';

const sampleStudentData: StudentProfile = {
  id: 1,
  personalDetails: {
    fullName: 'John Michael Doe',
    enrollmentNumber: 'EN2024001',
    rollNumber: '101',
    dateOfBirth: '2006-05-15',
    gender: 'Male',
    nationality: 'American',
    address: '123 Education Street, Academic City, ST 12345',
    contactNumber: '+1234567890',
    email: 'john.doe@student.edu',
    apaarNumber: 'AP2024001',
    guardians: [
      {
        name: 'Robert Doe',
        email: 'robert.doe@email.com',
        contact: '+1234567891',
        relation: 'Father',
        isPrimaryGuardian: true
      },
      {
        name: 'Sarah Doe',
        email: 'sarah.doe@email.com',
        contact: '+1234567892',
        relation: 'Mother',
        isPrimaryGuardian: false
      },
      {
        name: 'James Doe',
        email: 'james.doe@email.com',
        contact: '+1234567893',
        relation: 'Uncle',
        isPrimaryGuardian: false
      }
    ]
  },
  academicDetails: {
    grade: 10,
    section: 'A',
    stream: 'Science',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
    performance: [
      {
        term: 'First Term 2023',
        gpa: 3.8,
        subjects: [
          { name: 'Physics', grade: 'A', score: 92 },
          { name: 'Chemistry', grade: 'A-', score: 88 },
          { name: 'Mathematics', grade: 'A+', score: 95 },
          { name: 'English', grade: 'B+', score: 85 },
          { name: 'Computer Science', grade: 'A', score: 90 }
        ]
      }
    ]
  },
  attendanceRecords: {
    overall: 92,
    monthly: [
      { month: 'January 2024', percentage: 95, present: 19, total: 20 },
      { month: 'December 2023', percentage: 90, present: 18, total: 20 },
      { month: 'November 2023', percentage: 92, present: 22, total: 24 }
    ]
  },
  feeDetails: {
    structure: [
      { type: 'Tuition Fee', amount: 5000, status: 'Paid' },
      { type: 'Transport Fee', amount: 1000, status: 'Paid' },
      { type: 'Laboratory Fee', amount: 500, status: 'Pending' }
    ],
    history: [
      { date: '2024-01-15', amount: 6000, type: 'Tuition + Transport', mode: 'Online', status: 'Success' },
      { date: '2023-12-10', amount: 500, type: 'Laboratory Fee', mode: 'Cash', status: 'Success' }
    ],
    outstanding: 500
  },
  healthRecords: {
    conditions: ['Mild Asthma'],
    allergies: ['Peanuts'],
    vaccinations: [
      { name: 'MMR', date: '2020-05-10', status: 'Completed' },
      { name: 'Tdap', date: '2021-06-15', status: 'Completed' },
      { name: 'COVID-19', date: '2023-01-20', status: 'Completed' }
    ],
    incidents: [
      { date: '2023-09-15', description: 'Minor asthma attack during PE', action: 'Inhaler administered, parent notified' }
    ]
  },
  transportDetails: {
    mode: 'School Bus',
    route: 'Route 3A',
    pickupPoint: 'Central Park Station',
    dropPoint: 'Central Park Station',
    driverName: 'Michael Wilson',
    driverContact: '+1234567892'
  },
  disciplinaryRecords: [
    {
      date: '2023-11-20',
      type: 'Late Arrival',
      description: 'Arrived 20 minutes late to class',
      action: 'Verbal warning issued',
      status: 'Resolved'
    }
  ],
  documents: [
    {
      name: 'Birth Certificate',
      type: 'Identity',
      uploadDate: '2023-01-10',
      status: 'Verified',
      url: '/documents/birth-certificate.pdf'
    },
    {
      name: 'Previous School Records',
      type: 'Academic',
      uploadDate: '2023-01-10',
      status: 'Verified',
      url: '/documents/previous-records.pdf'
    },
    {
      name: 'Medical Certificate',
      type: 'Health',
      uploadDate: '2023-01-10',
      status: 'Verified',
      url: '/documents/medical-certificate.pdf'
    }
  ]
};

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  
  // Use the sample data
  const studentData = sampleStudentData;

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'academic', label: 'Academic Details', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { 
      id: 'fees', 
      label: 'Fee Details', 
      icon: CreditCard,
      locked: true,
      tooltip: 'This is a premium feature. Contact support@edumanage.com to unlock'
    },
    { 
      id: 'health', 
      label: 'Health Records', 
      icon: Heart,
      locked: true,
      tooltip: 'This is a premium feature. Contact support@edumanage.com to unlock'
    },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'discipline', label: 'Disciplinary Records', icon: AlertTriangle },
    { id: 'documents', label: 'Documents', icon: FileCheck },
  ];

  // Add this function to render the active tab content
  const renderTabContent = () => {
    // Add handling for locked tabs
    if (tabs.find(tab => tab.id === activeTab)?.locked) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-2xl p-6 border border-[#E4E8EA]">
          <Lock size={48} className="text-[#4D4F52] mb-4" />
          <h3 className="text-xl font-semibold text-[#0D373D] mb-2">Premium Feature</h3>
          <p className="text-[#4D4F52] text-center max-w-md">
            This feature is part of our premium package. Please contact support@edumanage.com to unlock access.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'personal':
        return (
          <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
            <h3 className="text-xl font-semibold text-[#0D373D] mb-6">Personal Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[#4D4F52] mb-2">Student Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#7A7D81]">Full Name</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81]">Date of Birth</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81]">Gender</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81]">Nationality</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81]">APAAR Number</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.apaarNumber}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[#4D4F52] mb-2">Contact Information</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#7A7D81]">Email</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81]">Phone</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81]">Address</p>
                    <p className="text-[#1D2125]">{studentData.personalDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-[#4D4F52]">Guardian Information</h4>
              </div>
              <div className="space-y-4">
                {studentData.personalDetails.guardians.map((guardian, index) => (
                  <div 
                    key={index} 
                    className="bg-[#F5F8F9] rounded-xl p-4"
                  >
                    <div className="flex items-center mb-4">
                      {guardian.isPrimaryGuardian && (
                        <span className="px-3 py-1 bg-[#E2FDCB] text-[#0D373D] rounded-lg text-sm">
                          Primary Guardian
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#7A7D81]">Name</p>
                        <p className="text-[#1D2125]">{guardian.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#7A7D81]">Relation</p>
                        <p className="text-[#1D2125]">{guardian.relation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#7A7D81]">Contact</p>
                        <p className="text-[#1D2125]">{guardian.contact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#7A7D81]">Email</p>
                        <p className="text-[#1D2125]">{guardian.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'academic':
        return (
          <div className="space-y-6 w-full">
            {/* Current Academic Info */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <h3 className="text-xl font-semibold text-[#0D373D] mb-6">Current Academic Information</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-[#7A7D81]">Grade & Section</p>
                  <p className="text-[#1D2125] font-medium">
                    Grade {studentData.academicDetails.grade}-{studentData.academicDetails.section}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#7A7D81]">Academic Stream</p>
                  <p className="text-[#1D2125] font-medium">{studentData.academicDetails.stream}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7A7D81]">Current GPA</p>
                  <p className="text-[#1D2125] font-medium">
                    {studentData.academicDetails.performance[0]?.gpa.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-[#4D4F52] mb-4">Enrolled Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {studentData.academicDetails.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#F5F8F9] text-[#0D373D] rounded-lg text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Records */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#0D373D]">Performance Records</h3>
                <select className="bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-2 text-sm">
                  {studentData.academicDetails.performance.map((term, index) => (
                    <option key={index} value={term.term}>
                      {term.term}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5F8F9]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Score</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Grade</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E8EA]">
                    {studentData.academicDetails.performance[0]?.subjects.map((subject, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-[#1D2125]">{subject.name}</td>
                        <td className="px-6 py-4 text-sm text-[#1D2125]">{subject.score}%</td>
                        <td className="px-6 py-4 text-sm text-[#1D2125]">{subject.grade}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            subject.score >= 90 
                              ? 'bg-[#E7F5E8] text-[#2E7D32]' 
                              : subject.score >= 75 
                              ? 'bg-[#FFF4E5] text-[#B76E00]' 
                              : 'bg-[#FFEAEA] text-[#D32F2F]'
                          }`}>
                            {subject.score >= 90 ? 'Excellent' : subject.score >= 75 ? 'Good' : 'Needs Improvement'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <h3 className="text-xl font-semibold text-[#0D373D] mb-6">Performance Trends</h3>
              <div className="h-[400px]">
                <Bar
                  data={{
                    labels: studentData.academicDetails.performance[0].subjects.map(s => s.name),
                    datasets: [
                      {
                        label: 'Student Score',
                        data: studentData.academicDetails.performance[0].subjects.map(s => s.score),
                        backgroundColor: '#E2FDCB',
                        borderColor: '#0D373D',
                        borderWidth: 1,
                        borderRadius: 6,
                        barThickness: 32,
                      },
                      {
                        label: 'Class Average',
                        data: studentData.academicDetails.performance[0].subjects.map(() => 75), // Mock class average
                        backgroundColor: '#F5F8F9',
                        borderColor: '#4D4F52',
                        borderWidth: 1,
                        borderRadius: 6,
                        barThickness: 32,
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        align: 'end' as const,
                        labels: {
                          boxWidth: 16,
                          boxHeight: 16,
                          useBorderRadius: true,
                          borderRadius: 4,
                          color: '#4D4F52',
                          font: {
                            size: 12,
                            family: "'Inter', sans-serif",
                          },
                          padding: 16,
                        }
                      },
                      tooltip: {
                        backgroundColor: '#0D373D',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: {
                          size: 14,
                          family: "'Inter', sans-serif",
                          weight: '600',
                        },
                        bodyFont: {
                          size: 12,
                          family: "'Inter', sans-serif",
                        },
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          color: '#4D4F52',
                          font: {
                            size: 12,
                            family: "'Inter', sans-serif",
                          }
                        }
                      },
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          color: '#E4E8EA',
                        },
                        border: {
                          dash: [4, 4],
                        },
                        ticks: {
                          color: '#4D4F52',
                          font: {
                            size: 12,
                            family: "'Inter', sans-serif",
                          },
                          callback: function(value) {
                            return value + '%';
                          }
                        }
                      }
                    },
                    layout: {
                      padding: {
                        top: 16,
                        right: 16,
                        bottom: 16,
                        left: 16
                      }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.9,
                  }}
                />
              </div>
              <div className="mt-6 flex items-center justify-between p-4 bg-[#F5F8F9] rounded-xl">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-sm text-[#7A7D81] mb-1">Highest Score</p>
                    <p className="text-lg font-medium text-[#2E7D32]">
                      {Math.max(...studentData.academicDetails.performance[0].subjects.map(s => s.score))}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81] mb-1">Lowest Score</p>
                    <p className="text-lg font-medium text-[#D32F2F]">
                      {Math.min(...studentData.academicDetails.performance[0].subjects.map(s => s.score))}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A7D81] mb-1">Average Score</p>
                    <p className="text-lg font-medium text-[#0D373D]">
                      {(studentData.academicDetails.performance[0].subjects.reduce((acc, curr) => acc + curr.score, 0) / 
                        studentData.academicDetails.performance[0].subjects.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <select className="bg-white border border-[#E4E8EA] rounded-xl px-4 py-2 text-sm">
                  <option>All Subjects</option>
                  {studentData.academicDetails.subjects.map((subject, index) => (
                    <option key={index}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Academic Actions */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]">
                <FileText size={18} />
                Download Report Card
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]">
                <MessageSquare size={18} />
                Schedule Parent Meeting
              </button>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="space-y-6 w-full">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#0D373D]">Attendance Details</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]">
                  <Calendar size={18} />
                  Mark Attendance
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]">
                  <FileText size={18} />
                  Download Report
                </button>
              </div>
            </div>

            {/* Key Metrics Summary */}
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  label: 'Overall Attendance',
                  value: `${studentData.attendanceRecords.overall}%`,
                  icon: <Calendar size={24} className="text-[#0D373D]" />,
                  color: 'bg-white'
                },
                {
                  label: 'Days Present',
                  value: '156 days',
                  icon: <FileCheck size={24} className="text-[#2E7D32]" />,
                  color: 'bg-white'
                },
                {
                  label: 'Days Absent',
                  value: '24 days',
                  icon: <User size={24} className="text-[#D32F2F]" />,
                  color: 'bg-white'
                },
                {
                  label: 'Pending Leave Applications',
                  value: '12 days',
                  icon: <Clock size={24} className="text-[#B76E00]" />,
                  color: 'bg-white'
                }
              ].map((metric, index) => (
                <div 
                  key={index}
                  className={`${metric.color} rounded-xl p-6 border border-[#E4E8EA] flex flex-col gap-4`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#7A7D81]">{metric.label}</p>
                    {metric.icon}
                  </div>
                  <p className="text-2xl font-semibold text-[#0D373D]">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Attendance Calendar */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-[#4D4F52]">Attendance Calendar</h4>
                <select className="bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-2 text-sm">
                  <option>January 2024</option>
                  <option>December 2023</option>
                  <option>November 2023</option>
                </select>
              </div>
              <div className="h-[300px] bg-[#F5F8F9] rounded-xl flex items-center justify-center">
                <p className="text-[#4D4F52]">Calendar view will be implemented here</p>
              </div>
            </div>

            {/* Monthly Attendance Trend */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <h4 className="font-medium text-[#4D4F52] mb-4">Monthly Attendance Trend</h4>
              <div className="space-y-4">
                {studentData.attendanceRecords.monthly.map((month, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm text-[#4D4F52]">{month.month}</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-full bg-[#F5F8F9] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#E2FDCB]" 
                          style={{ width: `${month.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-32 text-right">
                      <p className="text-sm font-medium text-[#0D373D]">
                        {month.present}/{month.total} days ({month.percentage}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Logs */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-[#4D4F52]">Attendance Logs</h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-[#F5F8F9] text-[#0D373D] rounded-lg">
                    This Month
                  </button>
                  <button className="px-3 py-1 text-sm bg-[#F5F8F9] text-[#0D373D] rounded-lg">
                    Last Month
                  </button>
                  <button className="px-3 py-1 text-sm bg-[#F5F8F9] text-[#0D373D] rounded-lg">
                    Custom Range
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5F8F9]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Reason</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1D2125]">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E8EA]">
                    {[
                      { date: '01-Jan-2024', status: 'Present', reason: '-', remarks: '-' },
                      { date: '02-Jan-2024', status: 'Absent', reason: 'Sick Leave', remarks: 'Approved by Admin' },
                      { date: '03-Jan-2024', status: 'Present', reason: '-', remarks: '-' },
                    ].map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-[#1D2125]">{record.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            record.status === 'Present' 
                              ? 'bg-[#E2FDCB] text-[#2E7D32]' 
                              : 'bg-[#FFEAEA] text-[#D32F2F]'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1D2125]">{record.reason}</td>
                        <td className="px-6 py-4 text-sm text-[#1D2125]">{record.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Leave Management */}
            <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-[#4D4F52]">Leave Management</h4>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    dates: '15-20 Jan 2024',
                    reason: 'Family vacation',
                    status: 'Pending',
                    documents: 'application.pdf'
                  },
                  {
                    dates: '05-06 Jan 2024',
                    reason: 'Medical appointment',
                    status: 'Approved',
                    documents: 'medical_cert.pdf'
                  }
                ].map((leave, index) => (
                  <div 
                    key={index}
                    className="bg-[#F5F8F9] rounded-xl p-4"
                  >
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-[#7A7D81]">Dates</p>
                        <p className="text-[#1D2125]">{leave.dates}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#7A7D81]">Reason</p>
                        <p className="text-[#1D2125]">{leave.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#7A7D81]">Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          leave.status === 'Approved' 
                            ? 'bg-[#E2FDCB] text-[#2E7D32]' 
                            : leave.status === 'Rejected'
                            ? 'bg-[#FFEAEA] text-[#D32F2F]'
                            : 'bg-[#FFF4E5] text-[#B76E00]'
                        }`}>
                          {leave.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-[#7A7D81]">Documents</p>
                        <button className="text-[#0D373D] hover:underline">
                          {leave.documents}
                        </button>
                      </div>
                    </div>
                    {leave.status === 'Pending' && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-[#E4E8EA]">
                        <button 
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E2FDCB] hover:bg-[#d0eeb9] transition-colors text-[#0D373D]"
                          onClick={() => {
                            // Handle approve action
                          }}
                        >
                          <FileCheck size={18} />
                          Approve Request
                        </button>
                        <button 
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFEAEA] hover:bg-[#ffd7d7] transition-colors text-[#D32F2F]"
                          onClick={() => {
                            // Handle reject action
                          }}
                        >
                          <AlertTriangle size={18} />
                          Reject Request
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      // ... I'll continue with other tab contents in the next message
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F8F9]">
        <div className="max-w-[1600px] mx-auto p-6 space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#E2FDCB] flex items-center justify-center">
                {studentData.personalDetails.profileImage ? (
                  <img 
                    src={studentData.personalDetails.profileImage} 
                    alt={studentData.personalDetails.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-[#0D373D]" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0D373D]">
                  {studentData.personalDetails.fullName}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-[#4D4F52]">
                  <span>Grade {studentData.academicDetails.grade}-{studentData.academicDetails.section}</span>
                  <span>•</span>
                  <span>Roll No: {studentData.personalDetails.rollNumber}</span>
                  <span>•</span>
                  <span>{studentData.personalDetails.enrollmentNumber}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]">
                <Edit2 size={18} />
                Edit Profile
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]">
                <MessageSquare size={18} />
                Communicate
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D373D] text-white hover:bg-[#1F4D54] transition-colors">
                <FileText size={18} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-[#E4E8EA]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <div key={tab.id} className="relative group">
                  <button
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                      tab.locked 
                        ? 'text-[#4D4F52] opacity-50 cursor-not-allowed'
                        : activeTab === tab.id
                        ? 'text-[#0D373D] border-b-2 border-[#0D373D]'
                        : 'text-[#4D4F52] hover:text-[#0D373D]'
                    }`}
                    onClick={() => !tab.locked && setActiveTab(tab.id as TabType)}
                  >
                    <Icon size={18} />
                    {tab.label}
                    {tab.locked && <Lock size={14} className="ml-2" />}
                  </button>
                  {tab.locked && (
                    <div className="absolute hidden group-hover:block w-64 p-2 bg-[#0D373D] text-white text-sm rounded-lg -bottom-12 left-1/2 transform -translate-x-1/2 z-10 shadow-lg">
                      <div className="relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#0D373D]" />
                        {tab.tooltip}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Content Area */}
          <div className={`${
            activeTab === 'personal' 
              ? 'grid grid-cols-3 gap-8' 
              : 'w-full'
          }`}>
            <div className={`${
              activeTab === 'personal' 
                ? 'col-span-2 space-y-6' 
                : 'w-full space-y-6'
            }`}>
              {renderTabContent()}
            </div>

            {/* Sidebar - Only show for personal tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-2xl p-6 border border-[#E4E8EA]">
                  <h3 className="text-lg font-semibold text-[#0D373D] mb-4">Quick Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[#7A7D81]">Attendance</p>
                      <p className="text-lg font-medium text-[#1D2125]">{studentData.attendanceRecords.overall}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7A7D81]">Outstanding Fees</p>
                      <p className="text-lg font-medium text-[#1D2125]">${studentData.feeDetails.outstanding}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7A7D81]">Current GPA</p>
                      <p className="text-lg font-medium text-[#1D2125]">
                        {studentData.academicDetails.performance[0]?.gpa || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfilePage; 