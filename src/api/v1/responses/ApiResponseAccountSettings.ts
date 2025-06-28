import { EnumUserSettingsKey } from '@/models/enums/EnumUsers';

export type ApiResponseAccountSettings = {
  id: number;
  key: EnumUserSettingsKey;
  value: string;
}[];
