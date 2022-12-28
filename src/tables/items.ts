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

export const getItemsQuery = mapQuery(mapItemKeys);
