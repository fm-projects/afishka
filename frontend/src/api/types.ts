export interface Paginator<T> extends RawPaginator {
  results: T[];
}

export interface RawPaginator {
  next: string | null;
  previous: string | null;
  count: number;
}
