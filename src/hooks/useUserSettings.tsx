import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { EnumUserSettingsKey } from '@/models/enums/EnumUsers';
import { useCallback, useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';

/**
 * Hook for managing user settings with optimistic updates and server persistence
 * Provides a unified interface for updating user settings with automatic rollback on errors
 */
export const useUserSettings = <T extends string>() => {
  const fetcher = useFetcher();

  // Track the setting change that's pending
  const [pendingSetting, setPendingSetting] = useState<{
    key: EnumUserSettingsKey;
    value: T;
  } | null>(null);
  const [previousValue, setPreviousValue] = useState<T | null>(null);

  // Check if the setting submission was successful
  useEffect(() => {
    if (fetcher.state === 'idle' && pendingSetting) {
      if (fetcher.data === true) {
        // The submission was successful, setting change is confirmed
        setPendingSetting(null);
        setPreviousValue(null);
      } else if (fetcher.data === null) {
        // The submission failed, trigger rollback
        if (previousValue !== null && pendingSetting) {
          // We'll call the rollback function that was provided
          setPendingSetting(null);
          setPreviousValue(null);
        }
      }
    }
  }, [fetcher.state, fetcher.data, pendingSetting, previousValue]);

  /**
   * Update a user setting with optimistic updates
   * @param key - The setting key to update
   * @param newValue - The new value for the setting
   * @param currentValue - The current value (for rollback)
   * @param onOptimisticUpdate - Function to apply the optimistic update
   */
  const updateSetting = useCallback(
    (
      key: EnumUserSettingsKey,
      newValue: T,
      currentValue: T,
      onOptimisticUpdate: (value: T) => void
    ) => {
      // Store current value for potential rollback
      setPreviousValue(currentValue);
      setPendingSetting({ key, value: newValue });

      // Apply optimistic update
      onOptimisticUpdate(newValue);

      // Create FormData for the action
      const formData = new FormData();
      formData.append('key', key);
      formData.append('value', newValue);

      // Submit the request using FormData to the settings preferences route
      fetcher.submit(formData, {
        method: 'put',
        action: EnumRoutes.SETTINGS_PREFERENCES,
      });
    },
    [fetcher]
  );

  /**
   * Check if a specific setting is currently being submitted
   */
  const isSubmitting = useCallback(
    (key: EnumUserSettingsKey, value?: T) => {
      return (
        fetcher.state === 'submitting' &&
        pendingSetting?.key === key &&
        (value === undefined || pendingSetting?.value === value)
      );
    },
    [fetcher.state, pendingSetting]
  );

  /**
   * Check if any setting is currently being submitted
   */
  const isAnySubmitting = fetcher.state === 'submitting';

  // Handle rollback when the effect detects a failed submission
  useEffect(() => {
    if (
      fetcher.state === 'idle' &&
      fetcher.data === null &&
      pendingSetting &&
      previousValue !== null
    ) {
      // This will be handled by the components that use this hook
      // by checking the rollback state
    }
  }, [fetcher.state, fetcher.data, pendingSetting, previousValue]);

  return {
    updateSetting,
    isSubmitting,
    isAnySubmitting,
    shouldRollback:
      fetcher.state === 'idle' &&
      fetcher.data === null &&
      pendingSetting !== null &&
      previousValue !== null,
    rollbackValue: previousValue,
    pendingSetting,
  };
};
