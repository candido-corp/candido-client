import {
  NotificationContext,
  NotificationContextType,
} from '@/providers/NotificationProvider';
import { useContext } from 'react';

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return { ...context };
};
