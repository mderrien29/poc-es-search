import { ElasticQuery } from './types';

export const filterBy = (field: string, value: string): ElasticQuery => ({
  query: {
    bool: {
      must: [],
      filter: {
        bool: {
          must: [{ [field]: value }],
          must_not: []
        }
      }
    }
  },
  aggs: []
});

export const excludeBy = (field: string, value: string): ElasticQuery => ({
  query: {
    bool: {
      must: [],
      filter: {
        bool: {
          must: [],
          must_not: [{ [field]: value }],
        }
      }
    }
  },
  aggs: []
});

export const aggregateBy = (field: string): ElasticQuery => ({
  query: {
    bool: {
      must: [],
      filter: {
        bool: {
          must: [],
          must_not: [],
        }
      }
    }
  },
  aggs: [field]
});
