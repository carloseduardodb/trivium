import React, { useState, useEffect, useCallback } from "react";
import { Search, Zap, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Crypto = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
};

const fetchCryptoData = async (term: string): Promise<Crypto[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${term}`
    );
    const data = await response.json();

    if (!data.coins || data.coins.length === 0) {
      return [];
    }

    return data.coins.slice(0, 5).map((coin: any) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.market_data?.current_price?.usd || 0,
      change: coin.market_data?.price_change_percentage_24h || 0,
      marketCap: coin.market_data?.market_cap?.usd || 0,
    }));
  } catch (error) {
    console.error("Erro ao buscar dados de criptomoedas:", error);
    return [];
  }
};

export const SearchCrypto = ({
  onAddCrypto,
}: {
  onAddCrypto: (crypto: Crypto) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [lastSearchTerm, setLastSearchTerm] = useState<string>("");

  const performSearch = useCallback(
    async (term: string): Promise<void> => {
      if (term === lastSearchTerm || term.length < 1) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const cryptoResults = await fetchCryptoData(term);
        setResults(cryptoResults);
        setLastSearchTerm(term);
      } catch (error) {
        console.error("Erro ao buscar criptomoedas", error);
      } finally {
        setIsLoading(false);
      }
    },
    [lastSearchTerm]
  );

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      performSearch(searchTerm);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const handleAddCrypto = (crypto: Crypto): void => {
    onAddCrypto(crypto);
  };

  return (
    <div className="bg-[#121212] rounded-2xl shadow-2xl max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Busque criptomoedas"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onBlur={() => {
            setSearchTerm("");
            setResults([]);
          }}
          className="w-full bg-[#1e1e1e] text-white px-4 py-3 rounded-full pl-12 focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <Search className="absolute left-4 top-3.5 text-purple-400 w-6 h-6" />
        {isLoading && (
          <RefreshCcw className="absolute right-4 top-3.5 text-purple-400 w-6 h-6 animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1e1e1e] rounded-xl overflow-hidden mt-3 md:-ml-8 fixed"
          >
            {results.map((crypto: Crypto) => (
              <motion.div
                key={crypto.symbol}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center p-4 border-b border-[#2e2e2e] hover:bg-[#2a2a2a]"
              >
                <div>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">{crypto.symbol}</span>
                    <span className="text-gray-400">{crypto.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddCrypto(crypto)}
                  className="bg-purple-600 text-white px-3 py-1.5 rounded-full flex items-center hover:bg-purple-700 transition-colors"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Adicionar
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
