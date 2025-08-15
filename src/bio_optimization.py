# Bio-inspired GA for liquidity allocation
import pygad
import numpy as np
import yfinance as yf

def fetch_volumes():
    try:
        df = yf.download('TLT', start='2023-01-01', end='2025-08-15')
        return df['Volume'].dropna().values
    except:
        return np.random.randint(1000, 10000, 500)

def fitness(ga, sol, idx):
    vols = fetch_volumes()
    allocation = sol / np.sum(sol)
    return np.sum(allocation * vols[:len(sol)])

ga = pygad.GA(num_generations=30, num_parents_mating=5,
              fitness_func=fitness, sol_per_pop=10,
              num_genes=5, gene_space={'low': 0, 'high': 100})

if __name__ == "__main__":
    ga.run()
    sol, fit, _ = ga.best_solution()
    np.save('bio_allocation.npy', sol)
    print("Best:", sol, "Fitness:", fit)

