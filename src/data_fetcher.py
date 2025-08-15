import yfinance as yf
import pandas as pd
import numpy as np

try:
    bond = yf.download("TLT", start="2023-01-01", end="2025-08-15")
    bond.to_csv("bond_data.csv")
    print("Saved: bond_data.csv")
except Exception:
    rng = pd.date_range("2023-01-01", "2025-08-15")
    df = pd.DataFrame({"Date": rng, "Close": np.random.randn(len(rng)) * 10 + 100, "Volume": np.random.randint(1000, 10000, len(rng))})
    df.to_csv("bond_data.csv", index=False)
    print("Saved: bond_data.csv (mock)")

