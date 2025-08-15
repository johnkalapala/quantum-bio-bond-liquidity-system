import time, hashlib, json, random

class ImmuneCell:
    def __init__(self, cid, affinity=1.0): self.cid, self.affinity, self.memory = cid, affinity, []
    def validate(self, ev):
        h = ev["hash"]
        if h in self.memory and ev.get("anomaly_flag"): self.affinity*=1.05; return False
        if ev.get("anomaly_flag"): self.affinity*=0.95; self.memory.append(h); return False
        ok = random.random()<self.affinity
        if ok: self.affinity*=1.01; self.memory.append(h)
        else: self.affinity*=0.98
        return ok

class BioImmuneLedger:
    def __init__(self, default_cells=5):
        self.cells = {f"cell_{i+1}": ImmuneCell(f"cell_{i+1}") for i in range(default_cells)}
        self.ledger = []
    def _hash_event(self, ev): return hashlib.sha256(json.dumps(ev,sort_keys=True).encode()).hexdigest()
    def clonal_selection(self):
        cells = [c for c in self.cells.values() if c.affinity > 1.0]
        return cells if cells else list(self.cells.values())
    def validate_trade(self, trade):
        e = dict(trade); e['timestamp']=int(time.time()); e['hash']=self._hash_event(e)
        pool = self.clonal_selection()
        vsel = random.sample(pool, min(3,len(pool)))
        votes = [c.validate(e) for c in vsel]
        e["validators"]=[c.cid for c in vsel]; e["validated"]=all(votes)
        e["avg_affinity"]=round(sum(c.affinity for c in vsel)/len(vsel),4)
        for c in vsel: 
            if e.get("anomaly_flag"): c.memory.append(e["hash"])
        self.ledger.append(e); return e
    def audit_trail(self,n=10): return self.ledger[-n:]
    def memory_summary(self): return {c.cid:len(set(c.memory)) for c in self.cells.values()}

if __name__ == "__main__":
    l = BioImmuneLedger(6)
    l.validate_trade({"buyer":"A","seller":"B","bond":"HDFCBANK.NS","amount":75,"price":104})
    l.validate_trade({"buyer":"HACKER","seller":"X","bond":"GSEC_10Y","amount":12000,"price":10,"anomaly_flag":True})
    print(l.audit_trail(2)); print(l.memory_summary())

