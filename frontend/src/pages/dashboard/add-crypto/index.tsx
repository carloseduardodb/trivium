import { SearchCrypto } from "@/components/SearchCrypto";
import { PerformGraph } from "@/components/PerformGraph";
import { useAddCryptoStore } from "./store";
import { Wallet } from "./components/wallet";
import { AddCryptoModal } from "./components/add-crypto-modal";

export const AddCrypto = () => {
  const { actions, state } = useAddCryptoStore();

  const cryptoAssets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 45678.9,
      change: 3.5,
      balance: 0.0001,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 3245.67,
      change: 2.1,
      balance: 0.05,
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-4 md:p-8 text-white w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Adicionar Crypto
        </h1>
        <SearchCrypto
          onAddCrypto={(data) => {
            actions.setNewCrypto(data.name);
            actions.toggleModal();
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Wallet
          cryptoAssets={cryptoAssets}
          onSelectCrypto={(symbol) => actions.setSelectedCrypto(symbol)}
          selectedCrypto={state.selectedCrypto}
        />
      </div>
      <br />
      <PerformGraph selectedCrypto="BTC" />
      <AddCryptoModal
        isModalOpen={state.isModalOpen}
        newCrypto={state.newCrypto}
        platforms={state.platforms}
        onToggleModal={actions.toggleModal}
        onSubmit={(data) => console.log(data)}
      />
    </div>
  );
};
