export type Filters = Record<string, string>
export type ExcludeFilters = Filters;
export type Aggregates = string[]

export type KeyMapper = (key: string) => string;

