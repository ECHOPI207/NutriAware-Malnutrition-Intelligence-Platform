import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CombinedItem, FilterType } from './types';

interface MessageFiltersProps {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  allItems: CombinedItem[];
  isRTL: boolean;
}

export const MessageFilters: React.FC<MessageFiltersProps> = ({ filter, setFilter, allItems, isRTL }) => {
  return (
    <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="mb-6">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
        <TabsTrigger value="all" className="text-xs sm:text-sm">
          {isRTL ? 'الكل' : 'All'} ({allItems.length})
        </TabsTrigger>
        <TabsTrigger value="feedback" className="text-xs sm:text-sm">
          {isRTL ? 'الرسائل' : 'Messages'} ({allItems.filter(item => item.type === 'feedback').length})
        </TabsTrigger>
        <TabsTrigger value="consultation" className="text-xs sm:text-sm">
          {isRTL ? 'الاستشارات' : 'Consultations'} ({allItems.filter(item => item.type === 'consultation').length})
        </TabsTrigger>
        <TabsTrigger value="new" className="text-xs sm:text-sm">
          {isRTL ? 'جديد' : 'New'} ({allItems.filter(item => item.status === 'new' || item.status === 'pending').length})
        </TabsTrigger>
        <TabsTrigger value="urgent" className="text-xs sm:text-sm">
          {isRTL ? 'عاجل' : 'Urgent'} ({allItems.filter(item => item.priority === 'urgent').length})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
