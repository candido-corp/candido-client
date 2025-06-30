import { ApiResponseAccountSettings } from '@/api/v1/responses/ApiResponseAccountSettings';
import { useTheme } from '@/hooks/useTheme';
import { EnumLanguage } from '@/models/enums/EnumLanguage';
import { EnumUserSettingsKey } from '@/models/enums/EnumUsers';
import { Theme } from '@/providers/ThemeProvider';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook for applying user settings when they authenticate
 */
export const useApplyUserSettings = () => {
  const { i18n } = useTranslation();
  const { setTheme } = useTheme();

  /**
   * Apply user settings from the API response
   * @param settings - The settings array from the API
   */
  const applySettings = useCallback((settings: ApiResponseAccountSettings) => {
    // Convert array to map for easier access
    const settingsMap = settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      },
      {} as Record<EnumUserSettingsKey, string>
    );

    // Apply theme setting if provided (only if user hasn't manually overridden it)
    if (settingsMap[EnumUserSettingsKey.THEME]) {
      const theme = settingsMap[EnumUserSettingsKey.THEME] as Theme;
      setTheme(theme);
    }

    // Apply language setting if provided and different from current
    if (settingsMap[EnumUserSettingsKey.LANGUAGE]) {
      const language = settingsMap[
        EnumUserSettingsKey.LANGUAGE
      ] as EnumLanguage;
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
    }
  }, []);

  return { applySettings };
};
