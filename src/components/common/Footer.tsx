import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Mail, Phone, MapPin, Users, Stethoscope, Brain } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const smartServices = [
    { to: "/assessment", label: t('footer.nutritionAssessment') },
    { to: "/ai-tools", label: t('footer.aiTools') },
    { to: "/stories", label: t('nav.stories') },
    { to: "/medical-consultation", label: t('footer.medicalConsultation') },
    { to: "/knowledge", label: t('footer.knowledgeCenter') }
  ];

  const medicalSupport = [
    { to: "/faq", label: t('nav.faq') },
    { to: "/about", label: t('footer.aboutPlatform') },
    { to: "/contact", label: t('footer.contactUs') },
    { to: "/privacy", label: t('footer.privacyPolicy') },
    { to: "/terms", label: t('footer.termsOfService') }
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 border-t-4 border-primary relative overflow-hidden dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800">

      {/* Light Mode Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

        {/* Mobile View (Accordion) */}
        <div className="block sm:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="smart-services" className="border-b border-slate-200 dark:border-slate-800">
              <AccordionTrigger className="text-slate-800 dark:text-slate-100 font-bold text-base hover:no-underline hover:text-primary transition-colors py-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>{t('footer.smartServices')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400">
                <ul className="space-y-3 pb-3 pt-1">
                  {smartServices.map((item, index) => (
                    <li key={index}>
                      <Link to={item.to} className="hover:text-primary transition-colors text-sm flex items-center gap-2 pl-2 rtl:pl-0 rtl:pr-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="medical-support" className="border-b border-slate-200 dark:border-slate-800">
              <AccordionTrigger className="text-slate-800 dark:text-slate-100 font-bold text-base hover:no-underline hover:text-secondary transition-colors py-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-secondary" />
                  <span>{t('footer.medicalSupport')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400">
                <ul className="space-y-3 pb-3 pt-1">
                  {medicalSupport.map((item, index) => (
                    <li key={index}>
                      <Link to={item.to} className="hover:text-secondary transition-colors text-sm flex items-center gap-2 pl-2 rtl:pl-0 rtl:pr-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact-info" className="border-b-0">
              <AccordionTrigger className="text-slate-800 dark:text-slate-100 font-bold text-base hover:no-underline hover:text-accent transition-colors py-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent dark:text-indigo-400" />
                  <span>{t('footer.getInTouch')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400">
                <div className="space-y-3 pb-3 pt-1">
                  <div className="flex items-center gap-2 text-sm pl-2 rtl:pl-0 rtl:pr-2">
                    <Mail className="h-4 w-4 text-accent dark:text-indigo-400 flex-shrink-0" />
                    <a href="mailto:support@nutriaware.info" className="hover:text-primary transition-colors truncate">support@nutriaware.info</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm pl-2 rtl:pl-0 rtl:pr-2">
                    <Phone className="h-4 w-4 text-accent dark:text-indigo-400 flex-shrink-0" />
                    <a href="tel:+201000761895" className="hover:text-primary transition-colors force-ltr bg-slate-200/50 dark:bg-slate-800/50 px-2 py-0.5 rounded text-xs">+20 100 076 1895</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm pl-2 rtl:pl-0 rtl:pr-2">
                    <MapPin className="h-4 w-4 text-accent dark:text-indigo-400 flex-shrink-0" />
                    <span>{t('footer.location')}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-8 text-center text-sm">
          {/* Smart Services */}
          <div className="flex flex-col items-center">
            <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-6 text-lg flex items-center justify-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>{t('footer.smartServices')}</span>
            </h3>
            <ul className="space-y-3 w-full">
              {smartServices.map((item, index) => (
                <li key={index}>
                  <Link to={item.to} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all text-base block group hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
                    <span className="relative inline-block">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Support */}
          <div className="flex flex-col items-center">
            <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-6 text-lg flex items-center justify-center gap-2">
              <Stethoscope className="h-5 w-5 text-secondary" />
              <span>{t('footer.medicalSupport')}</span>
            </h3>
            <ul className="space-y-3 w-full">
              {medicalSupport.map((item, index) => (
                <li key={index}>
                  <Link to={item.to} className="text-slate-600 dark:text-slate-400 hover:text-secondary dark:hover:text-white transition-all text-base block group hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
                    <span className="relative inline-block">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-6 text-lg flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-accent dark:text-indigo-400" />
              <span>{t('footer.getInTouch')}</span>
            </h3>
            <div className="space-y-2 w-full">
              <div className="text-center">
                <a href="mailto:support@nutriaware.info" className="group flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-base p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg">
                  <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="truncate" dir="ltr">support@nutriaware.info</span>
                </a>
              </div>
              <div className="text-center">
                <a href="tel:+201000761895" className="group flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400 hover:text-secondary dark:hover:text-white transition-colors text-base p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg">
                  <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="pointer-events-none" dir="ltr">+20 100 076 1895</span>
                </a>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400 text-base">
                  <MapPin className="h-4 w-4 text-accent dark:text-indigo-400 flex-shrink-0" />
                  <span>{t('footer.location')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-4 text-center md:text-start">

            {/* Side 1 - Copyright */}
            <div className="text-sm text-slate-500 dark:text-slate-500 order-2 md:order-1 justify-self-start flex flex-wrap justify-center md:justify-start items-center gap-2 rtl:flex-row-reverse">
              <span dir="ltr">© {new Date().getFullYear()} NutriAware.</span>
              <span className="hidden sm:inline">|</span>
              <span>{t('footer.allRightsReserved')}</span>
            </div>

            {/* Center - Made with Love */}
            <div className="order-1 md:order-2 justify-self-center w-max">
              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 bg-white dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="flex items-center gap-1.5">
                  {t('footer.madeWith')} <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> {t('footer.forBetterNutrition')}
                </span>
              </div>
            </div>

            {/* Side 2 - Developed By */}
            <div className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary order-3 md:order-3 justify-self-end">
              {t('footer.developedBy')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
