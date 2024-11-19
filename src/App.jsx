import React from 'react';
import Navbar from './components/Navbar';
import StudentManagement from './components/StudentManagement';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <StudentManagement />
      </main>
    </div>
  );
}

export default App; 