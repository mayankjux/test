import type { Metadata } from "next";
import '@/app/globals.css';

export const metadata: Metadata = {
  title: "Student Management System",
  description: "A system to manage students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
