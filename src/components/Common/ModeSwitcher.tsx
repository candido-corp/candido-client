import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { Button } from '../ui/button';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';

export const ModeSwitcher: React.FC<BaseFC> = ({ className }) => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <Button
      variant="ghost"
      className={cn('group/toggle h-8 w-8 px-0', className)}
      onClick={toggleTheme}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span>Theme</span>
    </Button>
  );
};
