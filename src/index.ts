import { getItemsQuery } from './tables/items';
import { getSalesQuery } from './tables/sales';

const paramsMock = {
  filters: {
    country: 'FR',
    name: 'Martial',
  },
  exclude: {
    sex: 'F',
  },
  aggs: ['country'],
}

const itemsQuery = getItemsQuery(paramsMock.filters, paramsMock.exclude, paramsMock.aggs);
console.dir(itemsQuery, { depth: null });

const salesQuery = getSalesQuery(paramsMock.filters, paramsMock.exclude, paramsMock.aggs);
console.dir(salesQuery, { depth: null });
