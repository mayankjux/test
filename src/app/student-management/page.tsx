'use client';

import { useState, Fragment, useEffect, useRef } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Search, Plus, Download, Upload, ChevronDown, Mail, Eye, Edit2, Bus, Car, PersonStanding, MessageSquare, CreditCard, FileText, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Student {
  id: number;
  enrollmentNo: string;
  firstName: string;
  lastName: string;
  grade: number;
  section: string;
  rollNo: number;
  guardianName: string;
  contact: string;
  transport: 'Bus' | 'Private' | 'Walking';
  attendance: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
}

interface FilterOption {
  id: string;
  name: string;
}

const gradeOptions: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: '9', name: '9' },
  { id: '10', name: '10' },
  { id: '11', name: '11' },
  { id: '12', name: '12' },
];

const sectionOptions: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
  { id: 'c', name: 'C' },
];

const feeStatusOptions: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: 'paid', name: 'Paid' },
  { id: 'pending', name: 'Pending' },
  { id: 'overdue', name: 'Overdue' },
];

const attendanceOptions: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: 'above75', name: '> 75%' },
  { id: '50to75', name: '50-75%' },
  { id: 'below50', name: '< 50%' },
];

const transportOptions: FilterOption[] = [
  { id: 'all', name: 'All' },
  { id: 'bus', name: 'Bus' },
  { id: 'private', name: 'Private' },
  { id: 'walking', name: 'Walking' },
];

const StudentManagementPage = () => {
  const router = useRouter();
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const [selectedGrades, setSelectedGrades] = useState<FilterOption[]>([]);
  const [selectedSections, setSelectedSections] = useState<FilterOption[]>([]);
  const [selectedFeeStatuses, setSelectedFeeStatuses] = useState<FilterOption[]>([]);
  const [selectedAttendance, setSelectedAttendance] = useState<FilterOption[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<FilterOption[]>([]);
  
  const [gradeQuery, setGradeQuery] = useState('');
  const [sectionQuery, setSectionQuery] = useState('');
  const [feeStatusQuery, setFeeStatusQuery] = useState('');
  const [attendanceQuery, setAttendanceQuery] = useState('');
  const [transportQuery, setTransportQuery] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const sampleStudents: Student[] = [
    {
      id: 1,
      enrollmentNo: 'EN2024001',
      firstName: 'John',
      lastName: 'Doe',
      grade: 10,
      section: 'A',
      rollNo: 15,
      guardianName: 'Robert Doe',
      contact: '+1234567890',
      transport: 'Bus' as const,
      attendance: '95%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 2,
      enrollmentNo: 'EN2024002',
      firstName: 'Emma',
      lastName: 'Smith',
      grade: 11,
      section: 'B',
      rollNo: 7,
      guardianName: 'James Smith',
      contact: '+1234567891',
      transport: 'Private' as const,
      attendance: '88%',
      feeStatus: 'Pending' as const,
    },
    {
      id: 3,
      enrollmentNo: 'EN2024003',
      firstName: 'Michael',
      lastName: 'Johnson',
      grade: 9,
      section: 'C',
      rollNo: 21,
      guardianName: 'Sarah Johnson',
      contact: '+1234567892',
      transport: 'Walking' as const,
      attendance: '78%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 4,
      enrollmentNo: 'EN2024004',
      firstName: 'Sophia',
      lastName: 'Williams',
      grade: 10,
      section: 'A',
      rollNo: 12,
      guardianName: 'David Williams',
      contact: '+1234567893',
      transport: 'Bus' as const,
      attendance: '92%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 5,
      enrollmentNo: 'EN2024005',
      firstName: 'Oliver',
      lastName: 'Brown',
      grade: 11,
      section: 'B',
      rollNo: 9,
      guardianName: 'Mary Brown',
      contact: '+1234567894',
      transport: 'Private' as const,
      attendance: '45%',
      feeStatus: 'Overdue' as const,
    },
    {
      id: 6,
      enrollmentNo: 'EN2024006',
      firstName: 'Ava',
      lastName: 'Jones',
      grade: 9,
      section: 'C',
      rollNo: 16,
      guardianName: 'Michael Jones',
      contact: '+1234567895',
      transport: 'Bus' as const,
      attendance: '82%',
      feeStatus: 'Paid' as const,
    },
    {
      id: 7,
      enrollmentNo: 'EN2024007',
      firstName: 'William',
      lastName: 'Garcia',
      grade: 10,
      section: 'A',
      rollNo: 5,
      guardianName: 'Ana Garcia',
      contact: '+1234567896',
      transport: 'Walking' as const,
      attendance: '98%',
      feeStatus: 'Paid' as const,
    }
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudents(sampleStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: number) => {
    setSelectedStudents(prev => 
      prev.includes(id) 
        ? prev.filter(sId => sId !== id)
        : [...prev, id]
    );
  };

  const handleStudentClick = (studentId: number) => {
    router.push(`/student-management/${studentId}`);
  };

  // Filter functions
  const filteredGrades = gradeQuery === ''
    ? gradeOptions
    : gradeOptions.filter((grade) =>
        grade.name.toLowerCase().includes(gradeQuery.toLowerCase())
      );

  // Add state for each dropdown
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isFeeStatusOpen, setIsFeeStatusOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);

  // Filter functions for each dropdown
  const filteredSections = sectionQuery === ''
    ? sectionOptions
    : sectionOptions.filter((section) =>
        section.name.toLowerCase().includes(sectionQuery.toLowerCase())
      );

  const filteredFeeStatuses = feeStatusQuery === ''
    ? feeStatusOptions
    : feeStatusOptions.filter((status) =>
        status.name.toLowerCase().includes(feeStatusQuery.toLowerCase())
      );

  const filteredAttendance = attendanceQuery === ''
    ? attendanceOptions
    : attendanceOptions.filter((attendance) =>
        attendance.name.toLowerCase().includes(attendanceQuery.toLowerCase())
      );

  const filteredTransport = transportQuery === ''
    ? transportOptions
    : transportOptions.filter((transport) =>
        transport.name.toLowerCase().includes(transportQuery.toLowerCase())
      );

  // Add these refs
  const gradeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const feeStatusRef = useRef<HTMLDivElement>(null);
  const attendanceRef = useRef<HTMLDivElement>(null);
  const transportRef = useRef<HTMLDivElement>(null);

  // Add this useEffect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gradeRef.current && !gradeRef.current.contains(event.target as Node)) {
        setIsGradeOpen(false);
      }
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setIsSectionOpen(false);
      }
      if (feeStatusRef.current && !feeStatusRef.current.contains(event.target as Node)) {
        setIsFeeStatusOpen(false);
      }
      if (attendanceRef.current && !attendanceRef.current.contains(event.target as Node)) {
        setIsAttendanceOpen(false);
      }
      if (transportRef.current && !transportRef.current.contains(event.target as Node)) {
        setIsTransportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredStudents = sampleStudents.filter(student => {
    const searchStr = searchQuery.toLowerCase();
    return (
      student.enrollmentNo.toLowerCase().includes(searchStr) ||
      student.firstName.toLowerCase().includes(searchStr) ||
      student.lastName.toLowerCase().includes(searchStr) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchStr) ||
      student.guardianName.toLowerCase().includes(searchStr)
    );
  });

  return (
    <>
      <Navbar />
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
              <button 
                className="flex items-center gap-2 bg-[#0D373D] text-white px-6 py-2.5 rounded-xl hover:bg-[#1F4D54] transition-all shadow-sm"
                onClick={() => router.push('/student-management/add')}
              >
                <Plus size={20} />
                Add New Student
              </button>
              <button className="flex items-center gap-2 bg-[#E2FDCB] text-[#0D373D] px-6 py-2.5 rounded-xl hover:bg-[#C1E9A5] transition-all border border-[#A3C17A]">
                <Upload size={20} />
                Export
              </button>
              <button className="flex items-center gap-2 bg-[#F5F8F9] text-[#0D373D] border border-[#E4E8EA] px-6 py-2.5 rounded-xl hover:bg-[#E4E8EA] transition-all">
                <Download size={20} />
                Import
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:min-w-[150px] md:w-[30%] relative">
                <label htmlFor="search" className="block text-sm font-medium text-[#4D4F52] mb-2">
                  Search Students
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4D4F52]" size={20} />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name, enrollment no..."
                    className="w-full pl-12 pr-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/40 outline-none transition-all placeholder-[#4D4F52]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full md:flex-1">
                {/* Grade Filter */}
                <div className="relative" ref={gradeRef}>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Grade
                  </label>
                  <Combobox 
                    value={selectedGrades} 
                    onChange={(value) => {
                      const selectedOption = value[value.length - 1];
                      if (selectedOption?.id === 'all') {
                        setSelectedGrades([selectedOption]);
                        setIsGradeOpen(false);
                      } else {
                        const withoutAll = value.filter(option => option.id !== 'all');
                        setSelectedGrades(withoutAll);
                      }
                    }} 
                    multiple
                  >
                    <div className="relative">
                      <div className="relative w-full">
                        <Combobox.Input
                          className="w-full px-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/40 outline-none"
                          placeholder="Select grades..."
                          displayValue={(grades: FilterOption[]) =>
                            grades.map(grade => grade.name).join(', ')
                          }
                          onChange={(e) => {
                            setGradeQuery(e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsGradeOpen(true);
                          }}
                        />
                        <Combobox.Button 
                          className="absolute inset-y-0 right-0 flex items-center px-4"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsGradeOpen(!isGradeOpen);
                          }}
                        >
                          <ChevronDown className="h-5 w-5 text-[#4D4F52]" />
                        </Combobox.Button>
                      </div>
                      <Transition
                        show={isGradeOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setGradeQuery('')}
                      >
                        <Combobox.Options 
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-[#E4E8EA]"
                          static
                        >
                          {filteredGrades.map((grade) => (
                            <Combobox.Option
                              key={grade.id}
                              value={grade}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                  selected ? 'bg-[#E2FDCB]' : active ? 'bg-[#F5F8F9]' : ''
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {grade.name}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0D373D]">
                                      <Check className="h-5 w-5" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>

                {/* Section Filter */}
                <div className="relative" ref={sectionRef}>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Section
                  </label>
                  <Combobox 
                    value={selectedSections} 
                    onChange={(value) => {
                      const selectedOption = value[value.length - 1];
                      if (selectedOption?.id === 'all') {
                        setSelectedSections([selectedOption]);
                        setIsSectionOpen(false);
                      } else {
                        const withoutAll = value.filter(option => option.id !== 'all');
                        setSelectedSections(withoutAll);
                      }
                    }} 
                    multiple
                  >
                    <div className="relative">
                      <div className="relative w-full">
                        <Combobox.Input
                          className="w-full px-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/40 outline-none"
                          placeholder="Select sections..."
                          displayValue={(sections: FilterOption[]) =>
                            sections.map(section => section.name).join(', ')
                          }
                          onChange={(e) => {
                            setSectionQuery(e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSectionOpen(true);
                          }}
                        />
                        <Combobox.Button 
                          className="absolute inset-y-0 right-0 flex items-center px-4"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsSectionOpen(!isSectionOpen);
                          }}
                        >
                          <ChevronDown className="h-5 w-5 text-[#4D4F52]" />
                        </Combobox.Button>
                      </div>
                      <Transition
                        show={isSectionOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setSectionQuery('')}
                      >
                        <Combobox.Options 
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-[#E4E8EA]"
                          static
                        >
                          {filteredSections.map((section) => (
                            <Combobox.Option
                              key={section.id}
                              value={section}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                  selected ? 'bg-[#E2FDCB]' : active ? 'bg-[#F5F8F9]' : ''
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {section.name}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0D373D]">
                                      <Check className="h-5 w-5" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>

                {/* Fee Status Filter */}
                <div className="relative" ref={feeStatusRef}>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Fee Status
                  </label>
                  <Combobox 
                    value={selectedFeeStatuses} 
                    onChange={(value) => {
                      const selectedOption = value[value.length - 1];
                      if (selectedOption?.id === 'all') {
                        setSelectedFeeStatuses([selectedOption]);
                        setIsFeeStatusOpen(false);
                      } else {
                        const withoutAll = value.filter(option => option.id !== 'all');
                        setSelectedFeeStatuses(withoutAll);
                      }
                    }} 
                    multiple
                  >
                    <div className="relative">
                      <div className="relative w-full">
                        <Combobox.Input
                          className="w-full px-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/40 outline-none"
                          placeholder="Select fee status..."
                          displayValue={(feeStatuses: FilterOption[]) =>
                            feeStatuses.map(feeStatus => feeStatus.name).join(', ')
                          }
                          onChange={(e) => {
                            setFeeStatusQuery(e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFeeStatusOpen(true);
                          }}
                        />
                        <Combobox.Button 
                          className="absolute inset-y-0 right-0 flex items-center px-4"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsFeeStatusOpen(!isFeeStatusOpen);
                          }}
                        >
                          <ChevronDown className="h-5 w-5 text-[#4D4F52]" />
                        </Combobox.Button>
                      </div>
                      <Transition
                        show={isFeeStatusOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setFeeStatusQuery('')}
                      >
                        <Combobox.Options 
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-[#E4E8EA]"
                          static
                        >
                          {filteredFeeStatuses.map((feeStatus) => (
                            <Combobox.Option
                              key={feeStatus.id}
                              value={feeStatus}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                  selected ? 'bg-[#E2FDCB]' : active ? 'bg-[#F5F8F9]' : ''
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {feeStatus.name}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0D373D]">
                                      <Check className="h-5 w-5" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>

                {/* Attendance Filter */}
                <div className="relative" ref={attendanceRef}>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Attendance
                  </label>
                  <Combobox 
                    value={selectedAttendance} 
                    onChange={(value) => {
                      const selectedOption = value[value.length - 1];
                      if (selectedOption?.id === 'all') {
                        setSelectedAttendance([selectedOption]);
                        setIsAttendanceOpen(false);
                      } else {
                        const withoutAll = value.filter(option => option.id !== 'all');
                        setSelectedAttendance(withoutAll);
                      }
                    }} 
                    multiple
                  >
                    <div className="relative">
                      <div className="relative w-full">
                        <Combobox.Input
                          className="w-full px-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/40 outline-none"
                          placeholder="Select attendance..."
                          displayValue={(attendances: FilterOption[]) =>
                            attendances.map(attendance => attendance.name).join(', ')
                          }
                          onChange={(e) => {
                            setAttendanceQuery(e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAttendanceOpen(true);
                          }}
                        />
                        <Combobox.Button 
                          className="absolute inset-y-0 right-0 flex items-center px-4"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsAttendanceOpen(!isAttendanceOpen);
                          }}
                        >
                          <ChevronDown className="h-5 w-5 text-[#4D4F52]" />
                        </Combobox.Button>
                      </div>
                      <Transition
                        show={isAttendanceOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setAttendanceQuery('')}
                      >
                        <Combobox.Options 
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-[#E4E8EA]"
                          static
                        >
                          {filteredAttendance.map((attendance) => (
                            <Combobox.Option
                              key={attendance.id}
                              value={attendance}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                  selected ? 'bg-[#E2FDCB]' : active ? 'bg-[#F5F8F9]' : ''
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {attendance.name}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0D373D]">
                                      <Check className="h-5 w-5" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>

                {/* Transport Filter */}
                <div className="relative" ref={transportRef}>
                  <label className="block text-sm font-medium text-[#4D4F52] mb-2">
                    Transport
                  </label>
                  <Combobox 
                    value={selectedTransport} 
                    onChange={(value) => {
                      const selectedOption = value[value.length - 1];
                      if (selectedOption?.id === 'all') {
                        setSelectedTransport([selectedOption]);
                        setIsTransportOpen(false);
                      } else {
                        const withoutAll = value.filter(option => option.id !== 'all');
                        setSelectedTransport(withoutAll);
                      }
                    }} 
                    multiple
                  >
                    <div className="relative">
                      <div className="relative w-full">
                        <Combobox.Input
                          className="w-full px-4 py-3 bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl focus:ring-1 focus:ring-[#0D373D]/20 focus:border-[#0D373D]/40 outline-none"
                          placeholder="Select transport..."
                          displayValue={(transports: FilterOption[]) =>
                            transports.map(transport => transport.name).join(', ')
                          }
                          onChange={(e) => {
                            setTransportQuery(e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsTransportOpen(true);
                          }}
                        />
                        <Combobox.Button 
                          className="absolute inset-y-0 right-0 flex items-center px-4"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsTransportOpen(!isTransportOpen);
                          }}
                        >
                          <ChevronDown className="h-5 w-5 text-[#4D4F52]" />
                        </Combobox.Button>
                      </div>
                      <Transition
                        show={isTransportOpen}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setTransportQuery('')}
                      >
                        <Combobox.Options 
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-[#E4E8EA]"
                          static
                        >
                          {filteredTransport.map((transport) => (
                            <Combobox.Option
                              key={transport.id}
                              value={transport}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                  selected ? 'bg-[#E2FDCB]' : active ? 'bg-[#F5F8F9]' : ''
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {transport.name}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#0D373D]">
                                      <Check className="h-5 w-5" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>
          </div>

          {selectedStudents.length > 0 && (
            <div className="bg-[#F5F8F9] rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm text-[#4D4F52]">
                {selectedStudents.length} students selected
              </span>
              <div className="flex gap-3">
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]"
                  onClick={() => {
                    console.log('Send communication to:', selectedStudents);
                    // Implement send communication logic
                  }}
                >
                  <MessageSquare size={18} />
                  Send Communication
                </button>
                
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]"
                  onClick={() => {
                    console.log('Update fee status for:', selectedStudents);
                    // Implement fee status update logic
                  }}
                >
                  <CreditCard size={18} />
                  Update Fee Status
                </button>
                
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]"
                  onClick={() => {
                    console.log('Assign transport for:', selectedStudents);
                    // Implement transport assignment logic
                  }}
                >
                  <Bus size={18} />
                  Assign Transport
                </button>
                
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E8EA] hover:bg-[#E2FDCB] transition-colors text-[#0D373D]"
                  onClick={() => {
                    console.log('Generate reports for:', selectedStudents);
                    // Implement report generation logic
                  }}
                >
                  <FileText size={18} />
                  Generate Reports
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E4E8EA] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F8F9]">
                    <th className="px-6 py-4 text-left">
                      <input 
                        type="checkbox" 
                        className="rounded-lg border-[#B3B5B8] text-[#0D373D] focus:ring-[#0D373D]"
                        onChange={handleSelectAll}
                        checked={selectedStudents.length === sampleStudents.length}
                      />
                    </th>
                    {[
                      'Enrollment No.',
                      'Full Name',
                      'Grade',
                      'Section',
                      'Roll No.',
                      'Guardian Name',
                      'Contact',
                      'Transport',
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
                  {filteredStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      className="group hover:bg-[#F5F8F9] transition-colors cursor-pointer"
                      onClick={() => handleStudentClick(student.id)}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded-lg border-[#B3B5B8] text-[#0D373D] focus:ring-[#0D373D]"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                          aria-label={`Select student ${student.enrollmentNo}`}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{student.enrollmentNo}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{student.grade}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2125]">{student.section}</td>
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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          parseInt(student.attendance) > 75 
                            ? 'bg-[#E7F5E8] text-[#2E7D32]' 
                            : parseInt(student.attendance) > 50 
                            ? 'bg-[#FFF4E5] text-[#B76E00]' 
                            : 'bg-[#FFEAEA] text-[#D32F2F]'
                        }`}>
                          {student.attendance}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          student.feeStatus === 'Paid' 
                            ? 'bg-[#E7F5E8] text-[#2E7D32]' 
                            : student.feeStatus === 'Pending' 
                            ? 'bg-[#FFF4E5] text-[#B76E00]' 
                            : 'bg-[#FFEAEA] text-[#D32F2F]'
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
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={11}>
                        <div className="flex flex-col items-center justify-center min-h-[300px] px-4">
                          <div className="text-center w-full">
                            <h3 className="text-xl font-semibold text-[#0D373D] mb-2">
                              {searchQuery ? "No matches found" : "No students yet"}
                            </h3>
                            <p className="text-[#7A7D81] mb-6 whitespace-nowrap">
                              {searchQuery 
                                ? "Try adjusting your search or filters to find what you're looking for" 
                                : "Get started by adding your first student to the system"}
                            </p>
                            {searchQuery ? (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSearchQuery('');
                                }}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E2FDCB] text-[#0D373D] rounded-xl hover:bg-[#C1E9A5] transition-all border border-[#A3C17A]"
                              >
                                <Search size={18} />
                                Clear search
                              </button>
                            ) : (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push('/student-management/add');
                                }}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0D373D] text-white rounded-xl hover:bg-[#1F4D54] transition-all"
                              >
                                <Plus size={18} />
                                Add New Student
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl shadow-sm border border-[#E4E8EA] p-6">
            <div className="flex items-center gap-2">
              <select className="bg-[#F5F8F9] border border-[#E4E8EA] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#0D373D] focus:border-[#0D373D] outline-none transition-all text-[#1D2125]">
                <option className="text-[#1D2125]">7 rows</option>
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
    </>
  );
};

export default StudentManagementPage; 