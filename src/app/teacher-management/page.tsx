'use client';

import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { 
  Search, 
  Plus, 
  Download, 
  Upload, 
  ChevronDown, 
  Mail, 
  Eye, 
  Edit2, 
  Trash2,
  MoreHorizontal,
  Check,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Teacher {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  designation: string;
  subjects: string[];
  gradeSection: string[];
  contact: string;
  workload: string;
  feedback: string;
  payrollStatus: 'Paid' | 'Pending' | 'Overdue';
  leaveBalance: number;
}

interface FilterOption {
  label: string;
  options: string[];
}

interface Designation {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
}

interface GradeSection {
  id: string;
  name: string;
}

interface PayrollStatus {
  id: string;
  name: string;
}

const TeacherManagementPage = () => {
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDesignations, setSelectedDesignations] = useState<Designation[]>([]);
  const [designationQuery, setDesignationQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<GradeSection[]>([]);
  const [selectedPayrollStatuses, setSelectedPayrollStatuses] = useState<PayrollStatus[]>([]);
  const [subjectQuery, setSubjectQuery] = useState('');
  const [gradeQuery, setGradeQuery] = useState('');
  const [payrollQuery, setPayrollQuery] = useState('');

  const teachers: Teacher[] = [
    {
      id: 1,
      employeeId: 'T-1001',
      firstName: 'Sarah',
      lastName: 'Parker',
      designation: 'Head of Department',
      subjects: ['Mathematics', 'Physics'],
      gradeSection: ['11-A', '12-B'],
      contact: '+1234567890',
      workload: '24 hrs/week',
      feedback: '4.8/5.0',
      payrollStatus: 'Paid',
      leaveBalance: 12,
    },
    {
      id: 2,
      employeeId: 'T-1002',
      firstName: 'James',
      lastName: 'Wilson',
      designation: 'Senior Teacher',
      subjects: ['Chemistry', 'Biology'],
      gradeSection: ['10-A', '10-B'],
      contact: '+1234567891',
      workload: '20 hrs/week',
      feedback: '4.5/5.0',
      payrollStatus: 'Pending',
      leaveBalance: 8,
    },
    {
      id: 3,
      employeeId: 'T-1003',
      firstName: 'Emily',
      lastName: 'Brown',
      designation: 'Senior Teacher',
      subjects: ['English', 'History'],
      gradeSection: ['9-A', '9-C'],
      contact: '+1234567892',
      workload: '22 hrs/week',
      feedback: '4.7/5.0',
      payrollStatus: 'Paid',
      leaveBalance: 10,
    },
    {
      id: 4,
      employeeId: 'T-1004',
      firstName: 'Michael',
      lastName: 'Chen',
      designation: 'Teacher',
      subjects: ['Computer Science', 'Mathematics'],
      gradeSection: ['11-B', '12-A'],
      contact: '+1234567893',
      workload: '18 hrs/week',
      feedback: '4.2/5.0',
      payrollStatus: 'Overdue',
      leaveBalance: 5,
    },
    {
      id: 5,
      employeeId: 'T-1005',
      firstName: 'Sofia',
      lastName: 'Garcia',
      designation: 'Teacher',
      subjects: ['Geography', 'History'],
      gradeSection: ['10-C', '11-C'],
      contact: '+1234567894',
      workload: '20 hrs/week',
      feedback: '4.6/5.0',
      payrollStatus: 'Paid',
      leaveBalance: 15,
    }
  ];

  const designations: Designation[] = [
    { id: 'hod', name: 'Head of Department' },
    { id: 'senior', name: 'Senior Teacher' },
    { id: 'teacher', name: 'Teacher' },
    { id: 'assistant', name: 'Assistant Teacher' },
    { id: 'substitute', name: 'Substitute Teacher' },
  ];

  const subjects: Subject[] = [
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
    { id: 'cs', name: 'Computer Science' },
  ];

  const gradeSections: GradeSection[] = [
    { id: '9a', name: '9-A' },
    { id: '9b', name: '9-B' },
    { id: '9c', name: '9-C' },
    { id: '10a', name: '10-A' },
    { id: '10b', name: '10-B' },
    { id: '10c', name: '10-C' },
    { id: '11a', name: '11-A' },
    { id: '11b', name: '11-B' },
    { id: '11c', name: '11-C' },
    { id: '12a', name: '12-A' },
    { id: '12b', name: '12-B' },
    { id: '12c', name: '12-C' },
  ];

  const payrollStatuses: PayrollStatus[] = [
    { id: 'paid', name: 'Paid' },
    { id: 'pending', name: 'Pending' },
    { id: 'overdue', name: 'Overdue' },
  ];

  const filterOptions: FilterOption[] = [
    { 
      label: 'Designation', 
      options: ['All', 'Head of Department', 'Senior Teacher', 'Teacher', 'Assistant Teacher', 'Substitute Teacher'] 
    },
    { 
      label: 'Subject', 
      options: ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'] 
    },
    { 
      label: 'Grade/Section', 
      options: ['All', '9-A', '9-B', '9-C', '10-A', '10-B', '10-C', '11-A', '11-B', '11-C', '12-A', '12-B', '12-C'] 
    },
    { 
      label: 'Payroll Status', 
      options: ['All', 'Paid', 'Pending', 'Overdue'] 
    },
  ];

  const filteredDesignations = designationQuery === ''
    ? designations
    : designations.filter((designation) =>
        designation.name
          .toLowerCase()
          .includes(designationQuery.toLowerCase())
      );

  const filteredSubjects = subjectQuery === ''
    ? subjects
    : subjects.filter((subject) =>
        subject.name.toLowerCase().includes(subjectQuery.toLowerCase())
      );

  const filteredGrades = gradeQuery === ''
    ? gradeSections
    : gradeSections.filter((grade) =>
        grade.name.toLowerCase().includes(gradeQuery.toLowerCase())
      );

  const filteredPayrollStatuses = payrollQuery === ''
    ? payrollStatuses
    : payrollStatuses.filter((status) =>
        status.name.toLowerCase().includes(payrollQuery.toLowerCase())
      );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTeachers(teachers.map(t => t.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (id: number) => {
    setSelectedTeachers(prev => 
      prev.includes(id) 
        ? prev.filter(tId => tId !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status: Teacher['payrollStatus']) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#E7F5E8] text-[#2E7D32]';
      case 'Pending':
        return 'bg-[#FFF4E5] text-[#B76E00]';
      case 'Overdue':
        return 'bg-[#FFEAEA] text-[#D32F2F]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F8F9]">
        <div className="max-w-[1600px] mx-auto p-6 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#0D373D]">Teachers</h1>
              <p className="text-[#7A7D81] mt-2">
                Manage and monitor your teaching staff efficiently
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[30%] relative">
                <label htmlFor="search" className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Search Teachers
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4D4F52]" size={20} />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by Name, Employee ID, or Subject"
                    className="w-full pl-12 pr-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none transition-all placeholder-[#4D4F52]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[70%] grid grid-cols-2 md:grid-cols-4 gap-4">
                {filterOptions.map((filter) => (
                  <div key={filter.label} className="relative">
                    <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                      {filter.label}
                    </label>
                    <Combobox
                      value={
                        filter.label === 'Designation' ? selectedDesignations :
                        filter.label === 'Subject' ? selectedSubjects :
                        filter.label === 'Grade/Section' ? selectedGrades :
                        selectedPayrollStatuses
                      }
                      onChange={
                        filter.label === 'Designation' ? setSelectedDesignations :
                        filter.label === 'Subject' ? setSelectedSubjects :
                        filter.label === 'Grade/Section' ? setSelectedGrades :
                        setSelectedPayrollStatuses
                      }
                      multiple
                    >
                      <div className="relative">
                        <div className="relative w-full">
                          <Combobox.Input
                            className="w-full bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none"
                            placeholder={`Select ${filter.label.toLowerCase()}...`}
                            displayValue={() => 
                              filter.label === 'Designation' ? designationQuery :
                              filter.label === 'Subject' ? subjectQuery :
                              filter.label === 'Grade/Section' ? gradeQuery :
                              payrollQuery
                            }
                            onChange={(event) => {
                              if (filter.label === 'Designation') setDesignationQuery(event.target.value);
                              else if (filter.label === 'Subject') setSubjectQuery(event.target.value);
                              else if (filter.label === 'Grade/Section') setGradeQuery(event.target.value);
                              else setPayrollQuery(event.target.value);
                            }}
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-4">
                            <ChevronDown className="h-5 w-5 text-[#4D4F52]" aria-hidden="true" />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => {
                            if (filter.label === 'Designation') setDesignationQuery('');
                            else if (filter.label === 'Subject') setSubjectQuery('');
                            else if (filter.label === 'Grade/Section') setGradeQuery('');
                            else setPayrollQuery('');
                          }}
                        >
                          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-[#E4E8EA] z-10">
                            {(() => {
                              const options = filter.label === 'Designation' ? filteredDesignations :
                                            filter.label === 'Subject' ? filteredSubjects :
                                            filter.label === 'Grade/Section' ? filteredGrades :
                                            filteredPayrollStatuses;
                              
                              const selected = filter.label === 'Designation' ? selectedDesignations :
                                             filter.label === 'Subject' ? selectedSubjects :
                                             filter.label === 'Grade/Section' ? selectedGrades :
                                             selectedPayrollStatuses;

                              const query = filter.label === 'Designation' ? designationQuery :
                                        filter.label === 'Subject' ? subjectQuery :
                                        filter.label === 'Grade/Section' ? gradeQuery :
                                        payrollQuery;

                              if (options.length === 0 && query !== '') {
                                return (
                                  <div className="relative cursor-default select-none px-4 py-2 text-[#4D4F52]">
                                    Nothing found.
                                  </div>
                                );
                              }

                              return options.map((option) => (
                                <Combobox.Option
                                  key={option.id}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                      active ? 'bg-[#F5F8F9]' : ''
                                    } ${
                                      selected.some(s => s.id === option.id)
                                        ? 'bg-[#E2FDCB] text-[#0D373D]'
                                        : 'text-[#1D2125]'
                                    }`
                                  }
                                  value={option}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                        {option.name}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0D373D]">
                                          <Check className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              ));
                            })()}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bulk Actions - Visible when items are selected */}
          {selectedTeachers.length > 0 && (
            <div className="bg-[#F5F8F9] rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm text-[#4D4F52]">
                {selectedTeachers.length} teachers selected
              </span>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#F5F8F9]">
                  <Mail size={18} />
                  Send Message
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFEAEA] text-[#D32F2F] hover:bg-[#FFD6D6]">
                  <Trash2 size={18} />
                  Delete Selected
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#F5F8F9]">
                  <MoreHorizontal size={18} />
                  More Actions
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#F5F8F9]">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input 
                        type="checkbox" 
                        className="rounded-lg border-[#B3B5B8] text-[#0D373D] focus:ring-[#0D373D]"
                        onChange={handleSelectAll}
                        checked={selectedTeachers.length === teachers.length}
                      />
                    </th>
                    {[
                      'Employee ID',
                      'Full Name',
                      'Designation',
                      'Subjects',
                      'Grade',
                      'Contact',
                      'Workload',
                      'Feedback',
                      'Payroll Status',
                      'Leave Balance',
                      'Actions'
                    ].map((header) => (
                      <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-[#1D2125]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E8EA]">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-[#F5F8F9] transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded-lg border-[#B3B5B8] text-[#0D373D] focus:ring-[#0D373D]"
                          checked={selectedTeachers.includes(teacher.id)}
                          onChange={() => handleSelectTeacher(teacher.id)}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.employeeId}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{`${teacher.firstName} ${teacher.lastName}`}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.designation}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.subjects.join(', ')}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.gradeSection.join(', ')}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.contact}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.workload}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          parseFloat(teacher.feedback) >= 4.5 
                            ? 'bg-[#E7F5E8] text-[#2E7D32]' 
                            : parseFloat(teacher.feedback) >= 4.0 
                            ? 'bg-[#FFF4E5] text-[#B76E00]' 
                            : 'bg-[#FFEAEA] text-[#D32F2F]'
                        }`}>
                          {teacher.feedback}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          teacher.payrollStatus === 'Paid' 
                            ? 'bg-[#E7F5E8] text-[#2E7D32]' 
                            : teacher.payrollStatus === 'Pending' 
                            ? 'bg-[#FFF4E5] text-[#B76E00]' 
                            : 'bg-[#FFEAEA] text-[#D32F2F]'
                        }`}>
                          {teacher.payrollStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{teacher.leaveBalance}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="p-2 hover:bg-[#E2FDCB] rounded-xl transition-colors">
                            <Eye size={18} className="text-[#0D373D]" />
                          </button>
                          <button className="p-2 hover:bg-[#F5F8F9] rounded-xl transition-colors">
                            <Edit2 size={18} className="text-[#0D373D]" />
                          </button>
                          <button className="p-2 hover:bg-[#E2FDCB] rounded-xl transition-colors">
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
              <select 
                className="bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                {[5, 10, 25, 50].map((value) => (
                  <option key={value} value={value}>{value} rows</option>
                ))}
              </select>
              <span className="text-sm text-[#4D4F52]">
                Showing {Math.min(rowsPerPage, teachers.length)} of {teachers.length} entries
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                className="px-4 py-2 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl hover:bg-[#E4E8EA] transition-colors"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-[#0D373D] text-white rounded-xl">
                {currentPage}
              </button>
              <button 
                className="px-4 py-2 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl hover:bg-[#E4E8EA] transition-colors"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherManagementPage; 