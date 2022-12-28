import { mapQuery } from './generic-query';
import { KeyMapper } from './types';

const mapItemKeys: KeyMapper = (key) => {
  switch (key) {
    case 'country':
      return 'sale.address.country';
    default:
      return key;
  }
}

// type of export is (Filters, ExcludeFilters, Aggregates) => ElasticQuery
export const getItemsQuery = mapQuery(mapItemKeys);

// Of course, we could validate the parameters using io-ts
