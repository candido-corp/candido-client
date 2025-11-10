import { Moon, Sun, SunMoon } from 'lucide-react';
import { useEffect } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/hooks/useTheme';
import { useUserSettings } from '@/hooks/useUserSettings';
import { EnumUserSettingsKey } from '@/models/enums/EnumUsers';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { Theme } from '@/providers/ThemeProvider';

export const ModeToggleGroupServer: React.FC<BaseFC> = ({ className }) => {
  const { setTheme, theme } = useTheme();
  const {
    updateSetting,
    isSubmitting,
    isAnySubmitting,
    shouldRollback,
    rollbackValue,
  } = useUserSettings<Theme>();

  // Handle rollback when server request fails
  useEffect(() => {
    if (shouldRollback && rollbackValue) {
      setTheme(rollbackValue);
    }
  }, [shouldRollback, rollbackValue, setTheme]);

  /**
   * Handle theme selection change
   * Calls the settings action to save the new theme preference
   * Only confirms the theme change if the save operation succeeds
   */
  const handleThemeChange = (value: Theme) => {
    if (!value) return;

    updateSetting(
      EnumUserSettingsKey.THEME,
      value,
      theme,
      setTheme // optimistic update function
    );
  };

  return (
    <ToggleGroup
      className={className}
      variant="outline"
      type="single"
      value={theme}
      onValueChange={handleThemeChange}
      disabled={isAnySubmitting}
    >
      <ToggleGroupItem
        className="relative w-full"
        value="light"
        aria-label="Toggle Light"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        {isSubmitting(EnumUserSettingsKey.THEME, 'light') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        )}
      </ToggleGroupItem>
      <ToggleGroupItem
        className="relative w-full"
        value="dark"
        aria-label="Toggle Dark"
      >
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        {isSubmitting(EnumUserSettingsKey.THEME, 'dark') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        )}
      </ToggleGroupItem>
      <ToggleGroupItem
        className="relative w-full"
        value="system"
        aria-label="Toggle System"
      >
        <SunMoon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        {isSubmitting(EnumUserSettingsKey.THEME, 'system') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        )}
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
