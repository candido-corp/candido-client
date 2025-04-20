import { Territory } from '@/models/interfaces/Geo';

export type ApiResponseGeos = Pick<
  Territory,
  'territory_id' | 'territory_name'
>[];
