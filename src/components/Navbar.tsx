import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold">Student Management System</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link href="/student-management" className="hover:bg-blue-700 px-3 py-2 rounded">
              Students
            </Link>
            <Link href="/settings" className="hover:bg-blue-700 px-3 py-2 rounded">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 