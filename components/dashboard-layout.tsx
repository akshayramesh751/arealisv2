'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChartBar as BarChart3, TrendingUp, FileText, Plus, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: ReactNode;
  userInfo?: {
    firstName: string;
    lastName: string;
    company: string;
  };
}

export function DashboardLayout({ children, userInfo }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Analysis', icon: BarChart3 },
    { href: '/recommendations', label: 'Growth Recommendation', icon: TrendingUp },
    { href: '/plan', label: 'Actionable Business Plan', icon: FileText },
  ];

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userInfo');
    // Redirect to home page
    router.push('/');
  };

  const fullName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'John Doe';
  const initials = userInfo
    ? `${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(0)}`.toUpperCase()
    : 'JD';
  const company = userInfo?.company || 'Company Name';

  return (
    <div className={isDark ? 'dark-theme' : ''}>
      <div className="min-h-screen bg-background">
        <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-4 flex flex-col">
          <Link href="/dashboard" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10">
              <Image
                src="/logos/foresight flow logo.jpeg"
                alt="ForesightFlow Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <span className="text-xl font-bold">ForesightFlow</span>
          </Link>

          <Button className="mb-6 bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Analysis
          </Button>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">SAVED CHATS</p>
              {['Q4 Sales Analysis', 'Market Expansion Study', 'Product Performance Review'].map(
                (item, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </aside>

        <div className="ml-64">
          <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex items-center justify-between px-8 py-4">
              <nav className="flex gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDark(!isDark)}
                  className="rounded-full"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 rounded-full hover:bg-primary/10 active:bg-primary/20">
                      <Avatar className="hover:bg-primary active:bg-primary transition-colors">
                        <AvatarFallback className="bg-primary/20 text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white transition-colors">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="font-medium text-sm">{fullName}</p>
                      <p className="text-xs text-muted-foreground">{company}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
