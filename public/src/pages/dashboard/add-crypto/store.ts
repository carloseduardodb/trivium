import { create } from "zustand";
import { CryptoStore } from "./interfaces";
import { produce } from "immer";

export const useAddCryptoStore = create<CryptoStore>((set) => ({
  state: {
    selectedCrypto: "BTC",
    newCrypto: "",
    platforms: ["Binance", "Coinbase"],
    newPlatform: "",
    selectedPlatform: "",
    showAddNew: false,
    isModalOpen: false,
  },

  actions: {
    setSelectedCrypto: (crypto: string) =>
      set(
        produce((state) => {
          state.state.selectedCrypto = crypto;
        })
      ),

    setNewCrypto: (crypto: string) =>
      set(
        produce((state) => {
          state.state.newCrypto = crypto;
        })
      ),

    setNewPlatform: (platform: string) =>
      set(
        produce((state) => {
          state.state.newPlatform = platform;
        })
      ),

    setSelectedPlatform: (platform: string) =>
      set(
        produce((state) => {
          state.state.selectedPlatform = platform;
        })
      ),

    setShowAddNew: (show: boolean) =>
      set(
        produce((state) => {
          state.state.showAddNew = show;
        })
      ),

    toggleModal: () =>
      set(
        produce((state) => {
          state.state.isModalOpen = !state.state.isModalOpen;
        })
      ),

    handleAddPlatform: () =>
      set(
        produce((state) => {
          const { newPlatform, platforms } = state.state;
          if (newPlatform.trim()) {
            const updatedPlatforms = [...platforms, newPlatform.trim()];
            state.state.platforms = updatedPlatforms;
            state.state.newPlatform = "";
            state.state.selectedPlatform = newPlatform.trim();
            state.state.showAddNew = false;
          }
        })
      ),
  },
}));
