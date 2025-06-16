import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserSettings } from '@/hooks/useUserSettings';
import { EnumLanguage } from '@/models/enums/EnumLanguage';
import { EnumUserSettingsKey } from '@/models/enums/EnumUsers';
import { BaseFC } from '@/models/interfaces/BaseFC';

/**
 * LanguageSelectorServer Component
 * Handles language selection with server-side persistence and optimistic updates
 */
export const LanguageSelectorServer: React.FC<BaseFC> = ({ className }) => {
  const { i18n } = useTranslation();
  const { updateSetting, isAnySubmitting, shouldRollback, rollbackValue } =
    useUserSettings<EnumLanguage>();

  // Get current language from i18n
  const currentLanguage = i18n.language;

  // Handle rollback when server request fails
  useEffect(() => {
    if (shouldRollback && rollbackValue) {
      i18n.changeLanguage(rollbackValue);
    }
  }, [shouldRollback, rollbackValue, i18n]);

  /**
   * Handle language selection change
   * Calls the settings action to save the new language preference
   * Only confirms the language change if the save operation succeeds
   */
  const handleLanguageChange = (value: EnumLanguage) => {
    updateSetting(
      EnumUserSettingsKey.LANGUAGE,
      value,
      i18n.language as EnumLanguage,
      (newLanguage) => i18n.changeLanguage(newLanguage) // optimistic update function
    );
  };

  return (
    <div className={className}>
      <Select
        value={currentLanguage}
        onValueChange={handleLanguageChange}
        disabled={isAnySubmitting}
      >
        <SelectTrigger className="w-full md:w-[300px]">
          <SelectValue>
            <div className="flex items-center space-x-2">
              {currentLanguage === EnumLanguage.EN && 'English'}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EnumLanguage.EN}>
            <div className="flex items-center space-x-2">
              <span>English</span>
            </div>
          </SelectItem>
          <SelectItem value={'it'}>
            <div className="flex items-center space-x-2">
              <span>Italiano</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
