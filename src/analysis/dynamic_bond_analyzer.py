import pandas as pd
import numpy as np
import yfinance as yf
from datetime import datetime, timedelta

class DynamicBondAnalyzer:
    def __init__(self):
        self.bond_universe = {
            'HDFCBANK.NS': {'name': 'HDFC Bank Corporate Bond Proxy'},
            'RELIANCE.NS': {'name': 'Reliance Industries Corporate Bond Proxy'},
            'GSEC_10Y': {'name': 'Government Securities 10 Year (Mock)'}
        }

    def search(self, query):
        query = query.upper()
        results = []
        for sym, info in self.bond_universe.items():
            if query in sym or query in info['name'].upper():
                results.append({'symbol': sym, 'name': info['name']})
        return results

    def analyze(self, symbol):
        print(f"\nFetching live market data for {symbol}...")
        if symbol not in self.bond_universe:
            return {'error': 'Symbol not found'}

        # Fetch last 30 days data
        data = yf.Ticker(symbol)
        hist = data.history(period="1mo", interval="1d")

        if hist.empty:
            return {'error': 'No market data available'}

        # Basic analytics
        latest_close = hist['Close'][-1]
        avg_volume = hist['Volume'].mean()

        # Simple score based on volatility and volume (mock demo logic)
        volatility = hist['Close'].std()
        score = max(0, 10 - volatility * 10)  # Higher volatility -> lower score

        recommendation = "HOLD"
        if score > 7:
            recommendation = "BUY"
        elif score < 3:
            recommendation = "SELL"

        bio_score = score / 10  # Mock biological consensus

        return {
            'symbol': symbol,
            'name': self.bond_universe[symbol]['name'],
            'latest_close': latest_close,
            'avg_volume': avg_volume,
            'volatility': volatility,
            'score': score,
            'recommendation': recommendation,
            'bio_score': bio_score,
            'history': hist
        }

if __name__ == "__main__":
    analyzer = DynamicBondAnalyzer()
    res = analyzer.analyze('HDFCBANK.NS')
    print(res)
