'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChartBar as BarChart3, TrendingUp, FileText, Plus, Moon, Sun, LogOut, Menu, X, Settings, User, Bell, Shield, Database, Palette, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useTheme } from '@/contexts/theme-context';

interface DashboardLayoutProps {
  children: ReactNode;
  userInfo?: {
    firstName: string;
    lastName: string;
    company: string;
  };
}

function maskApiKey(key?: string) {
  if (!key) return '';
  // show last 4 chars, mask rest as • (dots)
  const last = key.slice(-4);
  const masked = '•'.repeat(Math.max(0, key.length - 4));
  return `${masked}${last}`;
}

export function DashboardLayout({ children, userInfo }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggleDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dataRetention, setDataRetention] = useState('30');
  const [localUserInfo, setLocalUserInfo] = useState<{ firstName?: string; lastName?: string; company?: string; shopName?: string; shopifyApiKey?: string } | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Analysis', icon: BarChart3 },
    { href: '/recommendations', label: 'Growth Recommendation', icon: TrendingUp },
    { href: '/plan', label: 'Actionable Business Plan', icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const fullName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'John Doe';
  const initials = userInfo
    ? `${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(0)}`.toUpperCase()
    : 'JD';
  const company = userInfo?.company || localUserInfo?.company || 'Company Name';
  const shopName = localUserInfo?.shopName || '';

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userInfo');
      if (stored) {
        const parsed = JSON.parse(stored);
        setLocalUserInfo(parsed);
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  return (
    <div className={isDark ? 'dark-theme' : ''}>
      <div className="min-h-screen bg-background">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Settings Modal */}
        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSettingsOpen(false)}
            />
            <Card className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
              isDark 
                ? 'bg-black/80 border-gray-700 backdrop-blur-xl' 
                : 'bg-white/80 border-gray-200 backdrop-blur-xl'
            }`}>
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                    <CardTitle className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Settings
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSettingsOpen(false)}
                    className="rounded-full"
                  >
                    <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                  </Button>
                </div>
                <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Customize your ForesightFlow experience and manage your preferences
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Profile Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Profile Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={userInfo?.firstName || 'John'}
                        className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={userInfo?.lastName || 'Doe'}
                        className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
                        readOnly
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="company" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Company
                      </Label>
                      <Input
                        id="company"
                        value={userInfo?.company || 'Company Name'}
                        className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
                        readOnly
                      />
                    </div>
                    {/* Shop Name & API Key */}
                    <div className="sm:col-span-2">
                      <Label htmlFor="shopName" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Shop Name
                      </Label>
                      <Input
                        id="shopName"
                        value={localUserInfo?.shopName || ''}
                        className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
                        readOnly
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="shopifyApiKey" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Shopify API Key
                      </Label>
                      <div className="relative">
                        <Input
                          id="shopifyApiKey"
                          value={localUserInfo?.shopifyApiKey ? (showApiKey ? localUserInfo.shopifyApiKey : maskApiKey(localUserInfo.shopifyApiKey)) : ''}
                          className={isDark ? 'bg-gray-800 border-gray-600 text-white pr-10' : 'pr-10'}
                          readOnly
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowApiKey((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                        >
                          {showApiKey ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appearance Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Palette className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Appearance
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Dark Mode
                      </Label>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Toggle between light and dark themes
                      </p>
                    </div>
                    <Switch checked={isDark} onCheckedChange={toggleDark} />
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Bell className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Notifications
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          Analysis Notifications
                        </Label>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Get notified when new insights are available
                        </p>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          Auto-refresh Data
                        </Label>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Automatically refresh dashboard data
                        </p>
                      </div>
                      <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                    </div>
                  </div>
                </div>

                {/* Data & Privacy Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Data & Privacy
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="dataRetention" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Data Retention Period (days)
                      </Label>
                      <Input
                        id="dataRetention"
                        type="number"
                        value={dataRetention}
                        onChange={(e) => setDataRetention(e.target.value)}
                        className={`mt-1 ${isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}`}
                        min="7"
                        max="365"
                      />
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        How long to keep your analysis data
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI & Analytics Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Database className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AI & Analytics
                    </h3>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>AI Model:</strong> ForesightFlow Advanced Analytics v2.1
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Last Updated:</strong> October 2025
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Confidence Level:</strong> 95% accuracy on business predictions
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setSettingsOpen(false)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSettingsOpen(false)}
                    className={`flex-1 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : ''}`}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-4 flex flex-col transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          {/* Mobile close button and logo */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
              <div className="w-8 h-8">
                <Image
                  src="/logos/foresight flow logo.jpeg"
                  alt="ForesightFlow Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <span className="text-lg font-bold text-foreground">ForesightFlow</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="rounded-full"
            >
              <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-foreground'}`} />
            </Button>
          </div>

          {/* Mobile navigation menu */}
          <div className="lg:hidden mb-6">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors w-full ${
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop logo */}
          <Link href="/dashboard" className="hidden lg:flex items-center gap-3 mb-8">
            <div className="w-10 h-10">
              <Image
                src="/logos/foresight flow logo.jpeg"
                alt="ForesightFlow Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <span className="text-xl font-bold text-foreground">ForesightFlow</span>
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
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors text-foreground"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:ml-64">
          <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              {/* Mobile menu button and logo */}
              <div className="flex items-center gap-4 lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-full"
                >
                  <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-foreground'}`} />
                </Button>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8">
                    <Image
                      src="/logos/foresight flow logo.jpeg"
                      alt="ForesightFlow Logo"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </div>
                  <span className="text-lg font-bold text-foreground">ForesightFlow</span>
                </Link>
              </div>

              {/* Desktop navigation */}
              <nav className="hidden lg:flex gap-6">
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

              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDark}
                  className="rounded-full hover:bg-secondary"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-white" />
                  ) : (
                    <Moon className="w-5 h-5 text-foreground" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 rounded-full hover:bg-primary/10 active:bg-primary/20">
                      <Avatar className="hover:bg-primary active:bg-primary transition-colors w-8 h-8 sm:w-10 sm:h-10">
                        <AvatarFallback className="bg-primary/20 text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white transition-colors text-xs sm:text-sm">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={`w-56 ${
                    isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <div className="px-3 py-2">
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {fullName}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {company}
                      </p>
                      {shopName && (
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                          Shop: {shopName}
                        </p>
                      )}
                    </div>
                    <DropdownMenuSeparator className={isDark ? 'border-gray-700' : 'border-gray-200'} />
                    <DropdownMenuItem
                      onClick={handleSettingsOpen}
                      className={`cursor-pointer ${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className={`cursor-pointer ${
                        isDark 
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                          : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      }`}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
