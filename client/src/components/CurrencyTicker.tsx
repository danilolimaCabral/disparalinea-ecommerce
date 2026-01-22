import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CurrencyPair {
  pair: string;
  symbol: string;
  rate: number;
  change: number;
}

export function CurrencyTicker() {
  const [pairs, setPairs] = useState<CurrencyPair[]>([
    { pair: "EUR/USD", symbol: "€/$", rate: 1.1739, change: 8.13 },
    { pair: "EUR/GBP", symbol: "€/£", rate: 0.8744, change: 4.82 },
    { pair: "EUR/BRL", symbol: "€/R$", rate: 6.2773, change: 2.71 },
    { pair: "USD/BRL", symbol: "$/R$", rate: 5.3474, change: 10.03 },
    { pair: "GBP/USD", symbol: "£/$", rate: 1.3425, change: 3.18 },
  ]);

  useEffect(() => {
    // Simulate real-time updates every 10 seconds
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((pair) => ({
          ...pair,
          rate: pair.rate + (Math.random() - 0.5) * 0.01,
          change: pair.change + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate pairs for seamless infinite scroll
  const duplicatedPairs = [...pairs, ...pairs];

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden py-2">
      <div className="ticker-animate flex gap-8 whitespace-nowrap">
        {duplicatedPairs.map((pair, index) => (
          <div
            key={`${pair.pair}-${index}`}
            className="flex items-center gap-2 text-sm font-medium shrink-0"
          >
            <span className="font-bold">{pair.pair}</span>
            <span className="text-xs opacity-80">{pair.symbol}</span>
            <span className="font-semibold">{pair.rate.toFixed(4)}</span>
            <span
              className={`flex items-center gap-1 font-semibold text-xs ${
                pair.change >= 0 ? "text-green-300" : "text-red-300"
              }`}
            >
              {pair.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {pair.change >= 0 ? "+" : ""}{Math.abs(pair.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
