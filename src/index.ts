import { queryItems } from './items';

const paramsMock = {
  filters: {
    country: 'FR',
    name: 'Martial',
  },
  aggs: ['country'],
}

const itemsQuery = queryItems(paramsMock.filters, paramsMock.aggs);

console.dir(itemsQuery, { depth: null });
