import { WalletProps } from "./wallet.interfaces";

export const Wallet: React.FC<WalletProps> = ({
  cryptoAssets,
  selectedCrypto,
  onSelectCrypto,
}) => {
  return (
    <div className="bg-[#1e1e1e] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold">Minha Carteira</h2>
      </div>

      {cryptoAssets.map((crypto) => (
        <div
          key={crypto.symbol}
          className={`flex justify-between items-center p-4 rounded-lg mb-4 cursor-pointer transition-all 
            ${
              selectedCrypto === crypto.symbol
                ? "bg-purple-900/30"
                : "hover:bg-[#2a2a2a]"
            }`}
          onClick={() => onSelectCrypto(crypto.symbol)}
        >
          <div>
            <p className="font-bold text-base md:text-lg">{crypto.symbol}</p>
            <p className="text-gray-400 text-xs md:text-sm">{crypto.name}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm md:text-base">
              ${crypto.price.toLocaleString()}
            </p>
            <p
              className={`text-xs md:text-sm ${
                crypto.change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.change}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
