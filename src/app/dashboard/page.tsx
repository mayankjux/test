'use client';

import { useState, useEffect } from 'react';

// Types
interface Student {
  id: number;
  name: string;
  grade: string;
  attendance: number;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  classes: number;
}

interface Activity {
  id: number;
  type: 'attendance' | 'grade' | 'fee' | 'event';
  description: string;
  timestamp: string;
}

// Styled Components using template literals
const DashboardContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 bg-gray-50 min-h-screen">{children}</div>
);

const Header = () => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">School Dashboard</h1>
    <p className="text-gray-600">Welcome back, Admin</p>
  </div>
);

const StatsCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  </div>
);

const ActivityCard = ({ activity }: { activity: Activity }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-800">{activity.description}</p>
        <p className="text-sm text-gray-500">{activity.timestamp}</p>
      </div>
      <div className={`
        px-2 py-1 rounded text-sm
        ${activity.type === 'attendance' ? 'bg-green-100 text-green-800' : ''}
        ${activity.type === 'grade' ? 'bg-blue-100 text-blue-800' : ''}
        ${activity.type === 'fee' ? 'bg-yellow-100 text-yellow-800' : ''}
        ${activity.type === 'event' ? 'bg-purple-100 text-purple-800' : ''}
      `}>
        {activity.type}
      </div>
    </div>
  </div>
);

// Main Dashboard Component
export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Simulate data fetching
  useEffect(() => {
    // Mock data - replace with actual API calls
    setStudents([
      { id: 1, name: "John Doe", grade: "10th", attendance: 92 },
      { id: 2, name: "Jane Smith", grade: "9th", attendance: 88 },
    ]);

    setTeachers([
      { id: 1, name: "Mr. Brown", subject: "Mathematics", classes: 5 },
      { id: 2, name: "Mrs. Davis", subject: "Science", classes: 4 },
    ]);

    setActivities([
      {
        id: 1,
        type: "attendance",
        description: "Mark attendance for Class 10th",
        timestamp: "10:30 AM"
      },
      {
        id: 2,
        type: "grade",
        description: "Term results published for Class 9th",
        timestamp: "11:45 AM"
      },
      {
        id: 3,
        type: "fee",
        description: "Fee collection reminder sent",
        timestamp: "12:15 PM"
      },
      {
        id: 4,
        type: "event",
        description: "Annual Sports Day scheduled",
        timestamp: "2:00 PM"
      },
    ]);
  }, []);

  return (
    <DashboardContainer>
      <Header />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Students" value={students.length} icon="👥" />
        <StatsCard title="Total Teachers" value={teachers.length} icon="👨‍🏫" />
        <StatsCard title="Average Attendance" value="90%" icon="📊" />
        <StatsCard title="Active Classes" value="12" icon="🏫" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {activities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 mb-3 hover:bg-blue-600">
              Take Attendance
            </button>
            <button className="w-full bg-green-500 text-white rounded-lg px-4 py-2 mb-3 hover:bg-green-600">
              Add New Student
            </button>
            <button className="w-full bg-purple-500 text-white rounded-lg px-4 py-2 mb-3 hover:bg-purple-600">
              Schedule Class
            </button>
            <button className="w-full bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
} 