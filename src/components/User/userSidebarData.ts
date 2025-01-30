import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BookOpen, MapPinHouse, User } from 'lucide-react';

export const userSidebarData = {
  navMain: [
    {
      title: 'User',
      url: EnumRoutes.USER,
      icon: User,
    },
    {
      title: 'Addresses',
      url: EnumRoutes.USER_ADDRESSES,
      icon: MapPinHouse,
    },
    {
      title: 'Opportunities',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Currents',
          url: EnumRoutes.USER_OPPORTUNITIES,
        },
        {
          title: 'History',
          url: EnumRoutes.USER_OPPORTUNITIES_HISTORY,
        },
        {
          title: 'Saved',
          url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
        },
        {
          title: 'Stats',
          url: EnumRoutes.USER_OPPORTUNITIES_STATS,
        },
      ],
    },
  ],
};
