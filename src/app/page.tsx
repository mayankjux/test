import { Folders, Palette, ExternalLink } from "lucide-react";

interface ProjectPage {
  title: string;
  description: string;
  path: string;
  category: string;
  date: string;
}

// This array will grow as you add more pages
const pages: ProjectPage[] = [
  {
    title: "Dashboard Layout",
    description: "Modern dashboard with sidebar navigation and widgets",
    path: "/dashboard",
    category: "Layout",
    date: "2024-03-20",
  },
  {
    title: "Student Management",
    description: "A comprehensive admin dashboard for managing student data, including attendance, fees, and academic performance",
    path: "/student-management",
    category: "Dashboard",
    date: "2024-03-21",
  },
  // Add more pages here as you create them
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Folders className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            UI/UX Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of UI/UX design implementations showcasing modern web interfaces,
            interactive components, and responsive layouts.
          </p>
        </div>

        {/* Projects Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 hidden md:table-cell">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 hidden lg:table-cell">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {pages.map((page, index) => (
                  <tr key={index} className="group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{page.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{page.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{page.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                      {new Date(page.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={page.path}
                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                      >
                        View
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
                {pages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No pages have been created yet. Start adding your UI/UX work!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
