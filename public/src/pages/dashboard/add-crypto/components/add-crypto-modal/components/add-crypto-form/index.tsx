import { AddCryptoFormProps } from "./interfaces";
import { FormInput } from "./components/form-input";
import { FormSelect } from "./components/form-select";

export const AddCryptoForm: React.FC<AddCryptoFormProps> = ({
  platforms,
  formState,
  onInputChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6">
    <div className="flex gap-2 flex-col md:flex-row">
      <FormInput
        label="Valor Investido"
        type="number"
        value={formState.investedValue}
        placeholder="Digite o valor investido"
        onChange={(value) => onInputChange("investedValue", value)}
      />
      <FormInput
        label="Valor da Criptomoeda ao Investir"
        type="number"
        value={formState.cryptoValue}
        placeholder="Digite o valor da criptomoeda"
        onChange={(value) => onInputChange("cryptoValue", value)}
      />
    </div>
    <FormSelect
      label="Plataforma"
      options={platforms}
      value={formState.platform}
      placeholder="Selecione uma plataforma"
      onChange={(value) => onInputChange("platform", value)}
    />
  </form>
);
