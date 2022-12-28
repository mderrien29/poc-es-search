import { mapQuery } from './generic-query';
import { KeyMapper } from './types';

const mapSalesKeys: KeyMapper = (key) => {
  switch (key) {
    case 'country':
      return 'address.country';
    case 'name':
      return 'person.name';
    default:
      return key;
  }
}

export const getSalesQuery = mapQuery(mapSalesKeys);
