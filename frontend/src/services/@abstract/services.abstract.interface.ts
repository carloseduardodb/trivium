import { IPagination } from "../interfaces/pagination.interface";
import { IAbstractGetAll } from "./get-all.abstract.interface";

export interface ServicesAbstract<T> {
  create: (data: T) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  getAll: (
    filter?: Partial<T>,
    pagFilters?: IPagination
  ) => Promise<IAbstractGetAll<T[]>>;
  getById: (id: string) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
