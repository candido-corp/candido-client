import { Address } from '@/models/interfaces/User';

export type ApiRequestAccountDetailsAddress = {
  territory_id: number;
} & Pick<
  Address,
  'display_name' | 'type_id' | 'zip' | 'street' | 'house_number' | 'is_primary'
>;
