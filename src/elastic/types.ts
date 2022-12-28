export type ElasticQuery = {
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
