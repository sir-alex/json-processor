export interface EnumFilter {
  in?: string[];
}

export interface TextFilter {
  contains?: string;
}

export interface RangeFilter {
  min?: number;
  max?: number;
}
