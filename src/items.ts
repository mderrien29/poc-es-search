import { createQuery, filterBy, aggregateBy } from './elastic-query'

type Filters = Record<string, string>
type Aggregates = string[]

const filterMapper = (key: string, value: string) => {
  switch (key) {
    case 'country':
      return filterBy('address.country', value);
    default:
      return filterBy(key, value);
  }
}

export const queryBuilder = (filters: Filters, aggs: Aggregates) => createQuery([
  ...Object.keys(filters).map(key => filterMapper(key, filters[key])),
  ...aggs.map(field => aggregateBy(field)),
])

