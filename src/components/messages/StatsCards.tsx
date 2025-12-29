import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Mail, Stethoscope, Clock, AlertTriangle } from 'lucide-react';
import { CombinedItem } from './types';

interface StatsCardsProps {
  allItems: CombinedItem[];
  isRTL: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ allItems, isRTL }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-4 sm:mb-8">
      <Card className="card-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white btn-contrast">
                {isRTL ? 'إجمالي العناصر' : 'Total Items'}
              </p>
              <p className="text-2xl font-bold text-white btn-contrast">{allItems.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white btn-contrast">
                {isRTL ? 'الرسائل العامة' : 'General Messages'}
              </p>
              <p className="text-2xl font-bold text-white btn-contrast">
                {allItems.filter(item => item.type === 'feedback').length}
              </p>
            </div>
            <Mail className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-accent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white btn-contrast">
                {isRTL ? 'الاستشارات الطبية' : 'Medical Consultations'}
              </p>
              <p className="text-2xl font-bold text-white btn-contrast">
                {allItems.filter(item => item.type === 'consultation').length}
              </p>
            </div>
            <Stethoscope className="h-8 w-8 text-white/90" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-warning">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                {isRTL ? 'جديد/في الانتظار' : 'New/Pending'}
              </p>
              <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                {allItems.filter(item => item.status === 'new' || item.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-amber-700 dark:text-amber-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-danger">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-100">
                {isRTL ? 'عاجل' : 'Urgent'}
              </p>
              <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                {allItems.filter(item => item.priority === 'urgent').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
