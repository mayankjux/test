import React, { useState } from 'react';

const StudentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const indexOfLastStudent = currentPage * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const getAttendanceStyle = (status) => {
    return status === 'Present' 
      ? 'bg-green-50 text-green-600/60 px-2.5 py-0.5 rounded-full text-xs font-normal'
      : 'bg-red-50 text-red-600/60 px-2.5 py-0.5 rounded-full text-xs font-normal';
  };

  const getFeeStatusStyle = (status) => {
    return status === 'Paid'
      ? 'bg-gray-50 text-gray-600/70 px-2.5 py-0.5 rounded-full text-xs font-normal'
      : 'bg-orange-50 text-orange-600/60 px-2.5 py-0.5 rounded-full text-xs font-normal';
  };

  return (
    <div>
      <table>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.class}</td>
              <td>
                <span className={getAttendanceStyle(student.attendance)}>
                  {student.attendance}
                </span>
              </td>
              <td>
                <span className={getFeeStatusStyle(student.feeStatus)}>
                  {student.feeStatus}
                </span>
              </td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement; 