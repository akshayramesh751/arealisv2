'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, ChartBar as BarChart3, TrendingUp, FileText, Plus, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Analysis', icon: BarChart3 },
    { href: '/recommendations', label: 'Growth Recommendation', icon: TrendingUp },
    { href: '/plan', label: 'Actionable Business Plan', icon: FileText },
  ];

  return (
    <div className={isDark ? 'dark-theme' : ''}>
      <div className="min-h-screen bg-background">
        <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-4 flex flex-col">
          <Link href="/dashboard" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <Network className="w-6 h-6 text-primary" />
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
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
