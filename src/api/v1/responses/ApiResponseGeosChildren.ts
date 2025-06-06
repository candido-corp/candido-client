import { Territory } from '@/models/interfaces/Geo';

export type ApiResponseGeosChildren = {
  label_id: number;
  label_name: string;
  territory_list: Pick<Territory, 'territory_id' | 'territory_name'>[];
};
