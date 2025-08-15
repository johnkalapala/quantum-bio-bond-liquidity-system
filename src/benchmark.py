import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error
from quantum_model import prepare, train

prices = pd.read_csv("bond_data.csv")["Close"].values
train_sz = 80

model = ARIMA(prices[:train_sz], order=(5,1,0)).fit()
arima_pred = model.forecast(steps=len(prices)-train_sz)
arima_mae = mean_absolute_error(prices[train_sz:], arima_pred)

X, y, _ = prepare()
quantum_model = train(X[:train_sz], y[:train_sz])
qpred = quantum_model.predict(X[train_sz:])
quantum_mae = mean_absolute_error(y[train_sz:], qpred)

print(f"ARIMA MAE: {arima_mae:.4f}")
print(f"Quantum MAE: {quantum_mae:.4f}")

