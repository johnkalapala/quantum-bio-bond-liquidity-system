import numpy as np

class CreditRiskAnalyzer:
    def __init__(self):
        pass

    def score_credit_risk(self, bond_data):
        rating_scores = {
            "AAA": 10,
            "AA+": 8,
            "AA": 6,
            "A": 4,
            "BBB": 2,
            "BB": 1,
            "B": 0
        }
        rating = bond_data.get("rating", "BBB")
        yield_percent = bond_data.get("yield", 7.0)
        base_score = rating_scores.get(rating, 2)
        yield_factor = max(0, 10 - (yield_percent - 5) * 2)
        credit_risk_score = np.clip((base_score + yield_factor) / 2, 0, 10)
        return credit_risk_score

    def analyze(self, bond_symbol, bond_data):
        score = self.score_credit_risk(bond_data)
        recommendation = "BUY" if score > 7 else "HOLD" if score > 4 else "SELL"
        return {
            "symbol": bond_symbol,
            "credit_risk_score": score,
            "recommendation": recommendation
        }

if __name__ == "__main__":
    analyzer = CreditRiskAnalyzer()
    sample_data = {"rating": "AA", "yield": 7.2}
    print(analyzer.analyze("HDFCBANK.NS", sample_data))
