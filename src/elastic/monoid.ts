import { monoid } from 'fp-ts';
import { ElasticQuery } from './types';

const emptyElasticQuery: ElasticQuery = {
  query: {
    bool: {
      must: [],
      filter: {
        bool: {
          must: [],
          must_not: []
        }
      }
    }
  },
  aggs: []
}

export const concatElasticQuery = (q1: ElasticQuery, q2: ElasticQuery): ElasticQuery => ({
  query: {
    bool: {
      must: [...q1.query.bool.must, ...q2.query.bool.must],
      filter: {
        bool: {
          must: [...q1.query.bool.filter.bool.must, ...q2.query.bool.filter.bool.must],
          must_not: [...q1.query.bool.filter.bool.must_not, ...q2.query.bool.filter.bool.must_not]
        }
      }
    }
  },
  aggs: [...q1.aggs, ...q2.aggs]
});

const elasticQueryMonoid: monoid.Monoid<ElasticQuery> = {
  empty: emptyElasticQuery,
  concat: concatElasticQuery,
}

export const createQuery = monoid.concatAll(elasticQueryMonoid);
