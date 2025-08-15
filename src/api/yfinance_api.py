import yfinance as yf

def get_bond_data(symbol):
    bond = yf.Ticker(symbol)
    hist = bond.history(period="1mo")
    latest_close = hist['Close'][-1] if not hist.empty else None
    avg_volume = hist['Volume'].mean() if not hist.empty else None
    return {
        "symbol": symbol,
        "latest_close": latest_close,
        "average_volume": avg_volume
    }

if __name__ == "__main__":
    print(get_bond_data("TLT"))
