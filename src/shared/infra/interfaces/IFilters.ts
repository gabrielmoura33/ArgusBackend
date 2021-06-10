export interface IFilters<T> {
  _limit?: number;
  _page?: number;
  _sort?: keyof T;
  _order?: 'asc' | 'desc';
  _count?: boolean;
  _search?: string;
}
