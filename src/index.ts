import { queryBuilder } from './items';

const paramsMock = {
  filters: {
    country: 'FR',
    name: 'Martial',
  },
  aggs: ['country'],
}

const itemsQuery = queryBuilder(paramsMock.filters, paramsMock.aggs);

console.dir(itemsQuery, { depth: null });
