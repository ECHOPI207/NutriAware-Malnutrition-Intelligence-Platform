import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, Sun, Moon, Languages,
  LogOut, LayoutDashboard, Settings,
  Users, FileText, Activity, MessageSquare,
  Stethoscope, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/firebase-auth-context';
import Logo from './Logo';
import { cn } from '@/lib/utils';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user, userProfile, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigation = [
    { name: 'nav.home', path: '/', translationKey: 'nav.home' },
    { name: 'nav.assessment', path: '/assessment', translationKey: 'nav.assessment' },
    { name: 'nav.aiTools', path: '/ai-tools', translationKey: 'nav.aiTools' },
    { name: 'nav.knowledge', path: '/knowledge', translationKey: 'nav.knowledge' },
    { name: 'nav.about', path: '/about', translationKey: 'nav.about' },
    { name: 'nav.contact', path: '/contact', translationKey: 'nav.contact' },
  ];

  const adminLinks = [
    { name: 'nav.userManagement', path: '/admin/users', icon: Users },
    { name: 'nav.contentManagement', path: '/admin/content', icon: FileText },
    { name: 'nav.activityMonitoring', path: '/admin/activity', icon: Activity },
    { name: 'nav.surveyResults', path: '/admin/survey-results', icon: BarChart2 },
    { name: 'nav.surveyManagement', path: '/admin/survey-management', icon: Settings },
    { name: 'nav.messages', path: '/messages', icon: MessageSquare },
  ];

  const doctorLinks = [
    { name: 'nav.doctorDashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'nav.surveyResults', path: '/admin/survey-results', icon: BarChart2 },
    { name: 'nav.surveyManagement', path: '/admin/survey-management', icon: Settings },
    { name: 'nav.messages', path: '/messages', icon: MessageSquare },
  ];


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-gradient-to-r from-slate-50 via-blue-50/30 to-green-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 backdrop-blur-md shadow-sm border-border/40"
          : "bg-gradient-to-r from-slate-50/50 via-blue-50/20 to-green-50/10 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">

        {/* --- Logo Section --- */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="md:hidden mr-2 rtl:mr-0 rtl:ml-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <div className="md:hidden">
              <Logo size="sm" hideSubtitle />
            </div>
            <div className="hidden md:block">
              <Logo size="md" />
            </div>
          </Link>
        </div>

        {/* --- Navigation Section (Centered) --- */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <ul className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/50 backdrop-blur-sm">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 block whitespace-nowrap",
                    location.pathname === item.path
                      ? "bg-background text-primary shadow-sm ring-1 ring-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  {t(item.translationKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- Actions Section (Right) --- */}
        <div className="flex-shrink-0 flex items-center gap-3">

          <div className="flex items-center gap-1 bg-secondary/30 rounded-full p-1 border border-border/30">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full hover:bg-background"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-indigo-500" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="h-8 w-8 rounded-full hover:bg-background"
              aria-label="Change language"
            >
              <Languages className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center ml-2 rtl:ml-0 rtl:mr-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 ring-2 ring-transparent hover:ring-primary/20 transition-all" aria-label="Open user menu">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src={userProfile?.photoURL} alt={userProfile?.displayName || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {userProfile?.displayName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                  <div className="flex items-center gap-3 p-2 bg-secondary/30 rounded-lg mb-2">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={userProfile?.photoURL} />
                      <AvatarFallback>{userProfile?.displayName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold truncate">{userProfile?.displayName}</span>
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-primary mt-0.5">
                        {t(`roles.${userProfile?.role || 'user'}`)}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    {/* Common Dashboard Link */}
                    {(userProfile?.role === 'user' || !userProfile?.role) && (
                      <>
                        <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5">
                          <Link to="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            <span>{t('nav.dashboard')}</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5">
                          <Link to="/medical-consultation">
                            <Stethoscope className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            <span>{t('nav.medicalConsultation')}</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* Admin Links */}
                    {userProfile?.role === 'admin' && (
                      <>
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-2 py-1">
                          {t('nav.adminControls')}
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5">
                          <Link to="/admin/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            <span>{t('nav.adminDashboard')}</span>
                          </Link>
                        </DropdownMenuItem>
                        {adminLinks.map((link) => (
                          <DropdownMenuItem key={link.path} asChild className="cursor-pointer rounded-md p-2.5">
                            <Link to={link.path}>
                              <link.icon className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                              <span>{t(link.name)}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}

                    {/* Doctor Links */}
                    {(userProfile?.role === 'doctor' || userProfile?.role === 'nutritionist') && (
                      <>
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-2 py-1">
                          {t('nav.doctorControls')}
                        </DropdownMenuLabel>
                        {doctorLinks.map((link) => (
                          <DropdownMenuItem key={link.path} asChild className="cursor-pointer rounded-md p-2.5">
                            <Link to={link.path}>
                              <link.icon className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                              <span>{t(link.name)}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5">
                      <Link to="/profile">
                        <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        <span>{t('header.profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20 rounded-md p-2.5">
                    <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    <span>{t('header.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/auth/login">
                  <Button variant="outline" className="px-6 py-2 font-semibold border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 px-6 py-2 font-semibold text-white shadow-lg">
                    {t('header.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md pb-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-bold transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                {t(item.translationKey)}
              </Link>
            ))}
            {!user && (
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center bg-gradient-to-r from-primary to-blue-600">
                    {t('header.register')}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
