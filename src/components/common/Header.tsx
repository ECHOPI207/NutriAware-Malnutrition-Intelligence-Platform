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
    { name: 'nav.knowledgeCenter', path: '/knowledge', translationKey: 'nav.knowledgeCenter' },
    { name: 'nav.program', path: '/program', translationKey: 'nav.program' },
    { name: 'nav.assessment', path: '/assessment', translationKey: 'nav.assessment' },
    { name: 'nav.aiTools', path: '/ai-tools', translationKey: 'nav.aiTools' },
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

  const nutritionistLinks = [
    { name: 'nav.nutritionDashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'nav.surveyResults', path: '/admin/survey-results', icon: BarChart2 },
    { name: 'nav.surveyManagement', path: '/admin/survey-management', icon: Settings },
    { name: 'nav.messages', path: '/messages', icon: MessageSquare },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300 border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-border/40 supports-[backdrop-filter]:bg-background/60"
          : "bg-background/80 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] px-4 md:px-6 h-[72px] items-center justify-between gap-2 lg:gap-4">

        {/* --- 1. BRAND (RTL aware alignment) --- */}
        <div className="flex shrink-0 items-center justify-start gap-2">
          {/* Mobile Drawer Trigger */}
          <div className="xl:hidden me-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} className="h-10 w-10 shrink-0">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity focus-visible:outline-primary rounded-md p-1">
            <div className="xl:hidden">
              <Logo size="sm" hideSubtitle />
            </div>
            <div className="hidden xl:block">
              <Logo size="md" />
            </div>
          </Link>
        </div>

        {/* --- 2. MENU (Fluid gap & logical properties) --- */}
        <nav className="hidden xl:flex flex-1 items-center justify-center overflow-hidden" aria-label="Main Navigation">
          <ul className="flex items-center justify-center gap-2 max-w-full overflow-x-auto hide-scrollbar">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="flex-shrink-0">
                  <Link
                    to={item.path}
                    className={cn(
                      "relative block font-bold transition-all duration-300 rounded-lg",
                      "whitespace-nowrap flex items-center justify-center px-4 py-2",
                      "text-[clamp(12px,1.1vw,14px)]", // Prevents text overflow cutting on large screens
                      isActive
                        ? "bg-primary/10 text-primary border-b-2 border-primary rounded-b-none shadow-none"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 focus-visible:bg-secondary/50"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(item.translationKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --- 3. ACTIONS (Strict logical gap and margins) --- */}
        <div className="flex shrink-0 items-center justify-end gap-2 lg:gap-4">
          <div className="flex items-center gap-1 bg-secondary/20 rounded-full p-1 border border-border/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full hover:bg-background transition-colors focus-visible:ring-1"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-indigo-500" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="h-9 w-9 rounded-full hover:bg-background transition-colors focus-visible:ring-1"
              aria-label="Change language"
            >
              <Languages className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 ring-2 ring-transparent hover:ring-primary/20 transition-all focus-visible:ring-primary/50" aria-label="Open user menu">
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
                            <LayoutDashboard className="me-3 h-4 w-4" />
                            <span>{t('nav.dashboard')}</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5">
                          <Link to="/medical-consultation">
                            <Stethoscope className="me-3 h-4 w-4" />
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
                            <LayoutDashboard className="me-3 h-4 w-4" />
                            <span>{t('nav.adminDashboard')}</span>
                          </Link>
                        </DropdownMenuItem>
                        {adminLinks.map((link) => (
                          <DropdownMenuItem key={link.path} asChild className="cursor-pointer rounded-md p-2.5">
                            <Link to={link.path}>
                              <link.icon className="me-3 h-4 w-4" />
                              <span>{t(link.name)}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}

                    {/* Nutritionist Links */}
                    {userProfile?.role === 'nutritionist' && (
                      <>
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-2 py-1">
                          {t('nav.nutritionControls')}
                        </DropdownMenuLabel>
                        {nutritionistLinks.map((link) => (
                          <DropdownMenuItem key={link.path} asChild className="cursor-pointer rounded-md p-2.5">
                            <Link to={link.path}>
                              <link.icon className="me-3 h-4 w-4" />
                              <span>{t(link.name)}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5">
                      <Link to="/profile">
                        <Settings className="me-3 h-4 w-4" />
                        <span>{t('header.profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 rounded-md p-2.5">
                    <LogOut className="me-3 h-4 w-4" />
                    <span>{t('header.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden xl:flex items-center gap-3">
                <Link to="/auth/login" className="focus-visible:outline-primary rounded-md">
                  <Button variant="outline" className="px-6 py-2 font-semibold border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/auth/signup" className="focus-visible:outline-primary rounded-md">
                  <Button className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 px-6 py-2 font-semibold text-white shadow-md transition-opacity">
                    {t('header.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE DRAWER (Positioned flush under header) --- */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-[100%] left-0 right-0 border-b bg-background/95 backdrop-blur-md pb-6 shadow-lg animate-in slide-in-from-top-2 z-40">
          <nav className="flex flex-col px-4 pt-2 space-y-1" aria-label="Mobile Navigation">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-bold transition-all",
                    isActive
                      ? "bg-primary/10 text-primary border-s-4 border-primary"
                      : "hover:bg-muted text-foreground border-s-4 border-transparent"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(item.translationKey)}
                </Link>
              );
            })}
            {!user && (
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
                <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center h-12 text-base">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center h-12 text-base bg-gradient-to-r from-primary to-blue-600">
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
