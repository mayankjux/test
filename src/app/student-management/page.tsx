'use client';

import { Search, Plus, Download, Upload, ChevronDown, Mail, Eye, Edit2, Bus, Car, PersonStanding } from 'lucide-react';

interface Student {
  id: number;
  enrollmentNo: string;
  firstName: string;
  lastName: string;
  grade: number;
  rollNo: number;
  guardianName: string;
  contact: string;
  transport: 'Bus' | 'Private' | 'Walking';
  performance: string;
  attendance: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
}

interface FilterOption {
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  { label: 'Grade', options: ['All', '9', '10', '11', '12'] },
  { label: 'Section', options: ['All', 'A', 'B', 'C'] },
  { label: 'Fee Status', options: ['All', 'Paid', 'Pending', 'Overdue'] },
  { label: 'Attendance', options: ['All', '> 75%', '50-75%', '< 50%'] },
  { label: 'Transport', options: ['All', 'Bus', 'Private', 'Walking'] },
];

const StudentManagementPage = () => {
  const sampleStudents: Student[] = [
    {
      id: 1,
      enrollmentNo: 'EN2024001',
      firstName: 'John',
      lastName: 'Doe',
      grade: 10,
      rollNo: 15,
      guardianName: 'Robert Doe',
      contact: '+1234567890',
      transport: 'Bus' as const,
      performance: 'A+',
      attendance: '95%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 2,
      enrollmentNo: 'EN2024002',
      firstName: 'Emma',
      lastName: 'Smith',
      grade: 11,
      rollNo: 7,
      guardianName: 'James Smith',
      contact: '+1234567891',
      transport: 'Private' as const,
      performance: 'A',
      attendance: '88%',
      feeStatus: 'Pending' as const,
    },
    {
      id: 3,
      enrollmentNo: 'EN2024003',
      firstName: 'Michael',
      lastName: 'Johnson',
      grade: 9,
      rollNo: 21,
      guardianName: 'Sarah Johnson',
      contact: '+1234567892',
      transport: 'Walking' as const,
      performance: 'B+',
      attendance: '78%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 4,
      enrollmentNo: 'EN2024004',
      firstName: 'Sophia',
      lastName: 'Williams',
      grade: 10,
      rollNo: 12,
      guardianName: 'David Williams',
      contact: '+1234567893',
      transport: 'Bus' as const,
      performance: 'A',
      attendance: '92%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 5,
      enrollmentNo: 'EN2024005',
      firstName: 'Oliver',
      lastName: 'Brown',
      grade: 11,
      rollNo: 9,
      guardianName: 'Mary Brown',
      contact: '+1234567894',
      transport: 'Private' as const,
      performance: 'A-',
      attendance: '45%',
      feeStatus: 'Overdue' as const,
    },
    {
      id: 6,
      enrollmentNo: 'EN2024006',
      firstName: 'Ava',
      lastName: 'Jones',
      grade: 9,
      rollNo: 16,
      guardianName: 'Michael Jones',
      contact: '+1234567895',
      transport: 'Bus' as const,
      performance: 'B',
      attendance: '82%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 7,
      enrollmentNo: 'EN2024007',
      firstName: 'William',
      lastName: 'Garcia',
      grade: 10,
      rollNo: 5,
      guardianName: 'Ana Garcia',
      contact: '+1234567896',
      transport: 'Walking' as const,
      performance: 'A+',
      attendance: '98%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 8,
      enrollmentNo: 'EN2024008',
      firstName: 'Isabella',
      lastName: 'Miller',
      grade: 11,
      rollNo: 14,
      guardianName: 'John Miller',
      contact: '+1234567897',
      transport: 'Private' as const,
      performance: 'B+',
      attendance: '65%',
      feeStatus: 'Pending' as const,
    },
    {
      id: 9,
      enrollmentNo: 'EN2024009',
      firstName: 'James',
      lastName: 'Davis',
      grade: 9,
      rollNo: 8,
      guardianName: 'Patricia Davis',
      contact: '+1234567898',
      transport: 'Bus' as const,
      performance: 'C+',
      attendance: '72%',
      feeStatus: 'Overdue' as const,
    },
    {
      id: 10,
      enrollmentNo: 'EN2024010',
      firstName: 'Charlotte',
      lastName: 'Rodriguez',
      grade: 10,
      rollNo: 19,
      guardianName: 'Luis Rodriguez',
      contact: '+1234567899',
      transport: 'Walking' as const,
      performance: 'A',
      attendance: '90%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 11,
      enrollmentNo: 'EN2024011',
      firstName: 'Benjamin',
      lastName: 'Martinez',
      grade: 11,
      rollNo: 3,
      guardianName: 'Carlos Martinez',
      contact: '+1234567900',
      transport: 'Bus' as const,
      performance: 'A-',
      attendance: '85%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 12,
      enrollmentNo: 'EN2024012',
      firstName: 'Mia',
      lastName: 'Anderson',
      grade: 9,
      rollNo: 11,
      guardianName: 'Emily Anderson',
      contact: '+1234567901',
      transport: 'Private' as const,
      performance: 'B',
      attendance: '48%',
      feeStatus: 'Overdue' as const,
    },
    {
      id: 13,
      enrollmentNo: 'EN2024013',
      firstName: 'Lucas',
      lastName: 'Taylor',
      grade: 10,
      rollNo: 17,
      guardianName: 'William Taylor',
      contact: '+1234567902',
      transport: 'Walking' as const,
      performance: 'A+',
      attendance: '94%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 14,
      enrollmentNo: 'EN2024014',
      firstName: 'Harper',
      lastName: 'Thomas',
      grade: 11,
      rollNo: 6,
      guardianName: 'Richard Thomas',
      contact: '+1234567903',
      transport: 'Bus' as const,
      performance: 'B+',
      attendance: '88%',
      feeStatus: 'Pending' as const,
    },
    {
      id: 15,
      enrollmentNo: 'EN2024015',
      firstName: 'Henry',
      lastName: 'Moore',
      grade: 9,
      rollNo: 13,
      guardianName: 'Jennifer Moore',
      contact: '+1234567904',
      transport: 'Private' as const,
      performance: 'A',
      attendance: '91%',
      feeStatus: 'Paid' as const,
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F8F9]">
      <div className="max-w-[1600px] mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#0D373D]">
              Student Management
            </h1>
            <p className="text-[#7A7D81] mt-2">
              Manage your students&apos; academic journey efficiently
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-[#0D373D] text-white px-6 py-2.5 rounded-xl hover:bg-[#1F4D54] transition-all shadow-sm">
              <Plus size={20} />
              Add New Student
            </button>
            <button className="flex items-center gap-2 bg-[#E2FDCB] text-[#0D373D] px-6 py-2.5 rounded-xl hover:bg-[#C1E9A5] transition-all border border-[#A3C17A]">
              <Download size={20} />
              Export
            </button>
            <button className="flex items-center gap-2 bg-[#F5F8F9] text-[#0D373D] border border-[#E4E8EA] px-6 py-2.5 rounded-xl hover:bg-[#E4E8EA] transition-all">
              <Upload size={20} />
              Import
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4D4F52]" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-12 pr-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none transition-all placeholder-[#4D4F52]"
              />
            </div>
            {filterOptions.map((filter) => (
              <div key={filter.label} className="relative">
                <select 
                  className="w-full appearance-none bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none transition-all text-[#1D2125]"
                  aria-label={filter.label}
                >
                  {filter.options.map((option) => (
                    <option key={option} className="text-[#1D2125]">{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4D4F52] pointer-events-none" size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F8F9]">
                  <th className="px-6 py-4 text-left">
                    <input type="checkbox" className="rounded-lg border-[#B3B5B8] text-[#0D373D] focus:ring-[#0D373D]" />
                  </th>
                  {[
                    'Enrollment No.',
                    'First Name',
                    'Last Name',
                    'Grade',
                    'Roll No.',
                    'Guardian Name',
                    'Contact',
                    'Transport',
                    'Performance',
                    'Attendance',
                    'Fee Status',
                    'Actions'
                  ].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-[#1D2125]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E8EA]">
                {sampleStudents.map((student) => (
                  <tr key={student.id} className="group hover:bg-[#F5F8F9] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded-lg border-[#B3B5B8] text-[#0D373D] focus:ring-[#0D373D]"
                        aria-label={`Select student ${student.enrollmentNo}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.enrollmentNo}</td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.firstName}</td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.lastName}</td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.grade}</td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.rollNo}</td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.guardianName}</td>
                    <td className="px-6 py-4 text-sm text-[#1D2125]">{student.contact}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.transport === 'Bus' && (
                          <Bus size={16} className="text-[#0D373D]" />
                        )}
                        {student.transport === 'Private' && (
                          <Car size={16} className="text-[#0D373D]" />
                        )}
                        {student.transport === 'Walking' && (
                          <PersonStanding size={16} className="text-[#0D373D]" />
                        )}
                        <span className="text-sm text-[#1D2125]">{student.transport}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#F5F8F9] border border-[#E4E8EA] text-[#1D2125]">
                        {student.performance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        parseInt(student.attendance) > 75 
                          ? 'bg-[#4CAF50] text-white' 
                          : parseInt(student.attendance) > 50 
                          ? 'bg-[#FFC107] text-[#1D2125]' 
                          : 'bg-[#F44336] text-white'
                      }`}>
                        {student.attendance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        student.feeStatus === 'Paid' 
                          ? 'bg-[#4CAF50] text-white' 
                          : student.feeStatus === 'Pending' 
                          ? 'bg-[#FFC107] text-[#1D2125]' 
                          : 'bg-[#F44336] text-white'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 opacity-100 group-hover:opacity-90 transition-opacity">
                        <button className="p-2 hover:bg-[#E2FDCB] rounded-xl transition-colors" aria-label="View student details">
                          <Eye size={18} className="text-[#0D373D]" />
                        </button>
                        <button className="p-2 hover:bg-[#F5F8F9] rounded-xl transition-colors" aria-label="Edit student">
                          <Edit2 size={18} className="text-[#0D373D]" />
                        </button>
                        <button className="p-2 hover:bg-[#E2FDCB] rounded-xl transition-colors" aria-label="Contact student">
                          <Mail size={18} className="text-[#0D373D]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl shadow-sm border border-[#E4E8EA] p-6">
          <div className="flex items-center gap-2">
            <select className="bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none transition-all text-[#1D2125]">
              <option className="text-[#1D2125]">10 rows</option>
              <option className="text-[#1D2125]">25 rows</option>
              <option className="text-[#1D2125]">50 rows</option>
              <option className="text-[#1D2125]">100 rows</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl hover:bg-[#E4E8EA] transition-colors text-[#1D2125]">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#0D373D] text-white rounded-xl hover:bg-[#1F4D54] transition-colors">
              1
            </button>
            <button className="px-4 py-2 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl hover:bg-[#E4E8EA] transition-colors text-[#1D2125]">
              2
            </button>
            <button className="px-4 py-2 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl hover:bg-[#E4E8EA] transition-colors text-[#1D2125]">
              3
            </button>
            <button className="px-4 py-2 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl hover:bg-[#E4E8EA] transition-colors text-[#1D2125]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementPage; 