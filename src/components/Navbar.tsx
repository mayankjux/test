import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Settings,
  LayoutDashboard,
  Building2
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
    label: 'Team',
    href: '/teacher-management',
    icon: <Building2 size={20} />
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

const teamTabs = [
  { label: 'Teachers', href: '/teacher-management' },
  { label: 'Supporting Staff', href: '/team/supporting-staff' },
  { label: 'Accounting', href: '/team/accounting' },
  { label: 'Transportation', href: '/team/transportation' },
];

const Navbar = () => {
  const pathname = usePathname() || '';
  const isTeamPage = pathname.includes('/teacher-management') || pathname.includes('/team');

  return (
    <div className="sticky top-0 z-50">
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
                    (item.label === 'Team' && isTeamPage) || 
                    (item.label === 'Students' && pathname.includes('/student-management')) ||
                    pathname === item.href
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
      
      {/* Team Sub Navigation */}
      {isTeamPage && (
        <div className="bg-white border-b border-[#E4E8EA] shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex space-x-2 py-3">
              {teamTabs.map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`px-4 py-2 text-sm rounded-xl transition-colors ${
                    pathname === tab.href
                      ? 'text-[#0D373D] bg-[#E2FDCB]'
                      : 'text-[#4D4F52] hover:bg-[#F5F8F9]'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar; 