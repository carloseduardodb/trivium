import { FormEvent } from "react";

export interface AddCryptoFormData {
  investedValue: number;
  cryptoValue: number;
  platform: string;
}

export interface AddCryptoFormProps {
  platforms: string[];
  formState: AddCryptoFormData;
  onInputChange: (
    field: keyof AddCryptoFormData,
    value: string | number
  ) => void;
  onSubmit: (e: FormEvent) => void;
}
