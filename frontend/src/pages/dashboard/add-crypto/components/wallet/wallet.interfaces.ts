interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface WalletProps {
  cryptoAssets: CryptoAsset[];
  selectedCrypto?: string;
  onSelectCrypto: (symbol: string) => void;
}
