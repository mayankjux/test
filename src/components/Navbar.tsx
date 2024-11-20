import Link from 'next/link';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Settings,
  LayoutDashboard
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={20} />
  },
  {
    label: 'Students',
    href: '/student-management',
    icon: <Users size={20} />
  },
  {
    label: 'Teachers',
    href: '/teachers',
    icon: <GraduationCap size={20} />
  },
  {
    label: 'Schedule',
    href: '/schedule',
    icon: <Calendar size={20} />
  },
  {
    label: 'Courses',
    href: '/courses',
    icon: <BookOpen size={20} />
  },
  {
    label: 'Finance',
    href: '/finance',
    icon: <DollarSign size={20} />
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={20} />
  }
];

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[#E4E8EA]">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-[#0D373D]">SchoolSync</span>
          </div>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm rounded-xl transition-colors ${
                  item.href === '/student-management'
                    ? 'text-[#0D373D] bg-[#E2FDCB]'
                    : 'text-[#4D4F52] hover:bg-[#F5F8F9]'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 