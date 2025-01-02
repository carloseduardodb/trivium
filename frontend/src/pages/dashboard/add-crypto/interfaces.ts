interface CryptoState {
  selectedCrypto: string;
  newCrypto: string;
  platforms: string[];
  newPlatform: string;
  selectedPlatform: string;
  showAddNew: boolean;
  isModalOpen: boolean;
}

interface CryptoActions {
  setSelectedCrypto: (crypto: string) => void;
  setNewCrypto: (crypto: string) => void;
  setNewPlatform: (platform: string) => void;
  setSelectedPlatform: (platform: string) => void;
  setShowAddNew: (show: boolean) => void;
  toggleModal: () => void;
  handleAddPlatform: () => void;
}

export interface CryptoStore {
  state: CryptoState;
  actions: CryptoActions;
}
