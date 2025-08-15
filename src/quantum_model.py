# Quantum bond price forecasting with Qiskit
import numpy as np
from qiskit import Aer
from qiskit.circuit.library import ZZFeatureMap, RealAmplitudes
from qiskit_machine_learning.algorithms import VQC
from qiskit.algorithms.optimizers import COBYLA
from sklearn.preprocessing import StandardScaler
import yfinance as yf

def fetch_prices():
    try:
        df = yf.download('TLT', start='2023-01-01', end='2025-08-15')
        return df['Close'].dropna().values
    except:
        return np.random.randn(500) * 10 + 100

def prepare():
    p = fetch_prices()
    X = np.array([p[i:i+5] for i in range(len(p)-5)])
    y = np.array([1 if p[i+5] > p[i+4] else 0 for i in range(len(p)-5)])
    sc = StandardScaler()
    X = sc.fit_transform(X)
    return X[:100], y[:100], sc

def train(X, y):
    fm = ZZFeatureMap(feature_dimension=5, reps=1)
    ansatz = RealAmplitudes(num_qubits=5, reps=1)
    opt = COBYLA(maxiter=40)
    backend = Aer.get_backend('aer_simulator')
    q = VQC(feature_map=fm, ansatz=ansatz, optimizer=opt, quantum_instance=backend)
    q.fit(X, y)
    return q

if __name__ == "__main__":
    X, y, sc = prepare()
    qm = train(X, y)
    np.save("quantum_predictions.npy", qm.predict(X))
    print("Saved: quantum_predictions.npy")

