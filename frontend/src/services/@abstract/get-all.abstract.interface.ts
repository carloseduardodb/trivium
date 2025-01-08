export interface IAbstractGetAll<T = Array<object> | object> {
  items: T;
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}
