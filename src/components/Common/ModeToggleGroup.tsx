import { Moon, Sun, SunMoon } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Theme } from '@/providers/ThemeProvider';
import { BaseFC } from '@/models/interfaces/BaseFC';

export const ModeToggleGroup: React.FC<BaseFC> = ({ className }) => {
  const { setTheme, theme } = useTheme();

  return (
    <ToggleGroup
      className={className}
      variant="outline"
      type="single"
      value={theme}
      onValueChange={(value: Theme) => {
        if (value) setTheme(value);
      }}
    >
      <ToggleGroupItem
        className="w-full"
        value="light"
        aria-label="Toggle Light"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </ToggleGroupItem>
      <ToggleGroupItem className="w-full" value="dark" aria-label="Toggle Dark">
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="w-full"
        value="system"
        aria-label="Toggle System"
      >
        <SunMoon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
