interface AddCryptoFormData {
  investedValue: number;
  cryptoValue: number;
  platform: string;
}

export interface AddCryptoModalProps {
  isModalOpen: boolean;
  newCrypto: string;
  platforms: string[];
  onToggleModal: () => void;
  onSubmit: (formData: AddCryptoFormData) => void;
}
