import { createQuery, filterBy, aggregateBy, excludeBy } from '../elastic'
import { Filters, Aggregates, KeyMapper, ExcludeFilters } from './types';

export const mapQuery = (mapper: KeyMapper) => (filters: Filters, excludeFilters: ExcludeFilters, aggs: Aggregates) => createQuery([
  ...Object.keys(filters).map(key => filterBy(mapper(key), filters[key])),
  ...Object.keys(excludeFilters).map(key => excludeBy(mapper(key), excludeFilters[key])),
  ...aggs.map(field => aggregateBy(mapper(field))),
])
