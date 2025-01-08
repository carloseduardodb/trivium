import api from "@/lib/api";
import { IAbstractGetAll } from "./@abstract/get-all.abstract.interface";
import { ServicesAbstract } from "./@abstract/services.abstract.interface";
import { ICryptoCurrency } from "./interfaces/crypto-currency.interface";
import { IPagination } from "./interfaces/pagination.interface";

interface ICryptoCurrencyService
  extends ServicesAbstract<Partial<ICryptoCurrency>> {}

export const cryptoCurrenciesService: ICryptoCurrencyService = {
  create: async function (
    data: Partial<ICryptoCurrency>
  ): Promise<Partial<ICryptoCurrency>> {
    return (
      await api.post<Partial<ICryptoCurrency>>("/crypto-currencies", data)
    ).data;
  },
  update: function (
    id: string,
    data: Partial<Partial<ICryptoCurrency>>
  ): Promise<Partial<ICryptoCurrency>> {
    throw new Error("Function not implemented.");
  },
  getAll: function (
    filter?: Partial<Partial<ICryptoCurrency>> | undefined,
    pagFilters?: IPagination
  ): Promise<IAbstractGetAll<Partial<ICryptoCurrency>[]>> {
    throw new Error("Function not implemented.");
  },
  getById: function (id: string): Promise<Partial<ICryptoCurrency>> {
    throw new Error("Function not implemented.");
  },
  delete: function (id: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
};
