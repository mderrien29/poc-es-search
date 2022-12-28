import { monoid } from 'fp-ts';

type ElasticQuery = {
  query: {
    bool: {
      must: []
      filter: {
        bool: {
          must: Record<string, unknown>[]
          must_not: Record<string, unknown>[]
        }
      }
    }
  };
  aggs: string[]
}

type ElasticFunction = (value: string) => ElasticQuery;


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

// Monoid.concatAll = ([ElasticQuery, ElasticQuery, ...]) => ElasticQuery
// L'idée est de combiner les ElasticQuery entre elles "automatiquement"
// Pour cela, il faut manipuler des ElasticQuery complet a chaque fois
// et écrire deux méthodes : concatElasticQuery, createEmptyElasticQuery
// Au final on peut ecrire des trucs assez sexy
// createQuery(filterBy('name', 'martial'), filterBy('country', 'FR'))
export const createQuery = monoid.concatAll(elasticQueryMonoid);

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

export const aggregateBy: ElasticFunction = (field: string): ElasticQuery => ({
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
