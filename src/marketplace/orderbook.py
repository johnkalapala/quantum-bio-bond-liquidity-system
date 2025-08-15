class Orderbook:
    def __init__(self):
        self.buy_orders = []
        self.sell_orders = []
        self.trades = []

    def place_order(self, order_type, price, amount, user_id, bond_symbol):
        order = {'price': price, 'amount': amount, 'user_id': user_id, 'bond': bond_symbol}
        if order_type == 'buy':
            self.buy_orders.append(order)
            self.buy_orders.sort(key=lambda x: -x['price'])  # Highest price first
        elif order_type == 'sell':
            self.sell_orders.append(order)
            self.sell_orders.sort(key=lambda x: x['price'])  # Lowest price first
        self.match_orders()

    def match_orders(self):
        while self.buy_orders and self.sell_orders:
            buy_order = self.buy_orders[0]
            sell_order = self.sell_orders

            if buy_order['price'] >= sell_order['price']:
                trade_amount = min(buy_order['amount'], sell_order['amount'])
                trade_price = sell_order['price']

                self.trades.append({
                    'buyer': buy_order['user_id'],
                    'seller': sell_order['user_id'],
                    'bond': buy_order['bond'],
                    'amount': trade_amount,
                    'price': trade_price
                })

                buy_order['amount'] -= trade_amount
                sell_order['amount'] -= trade_amount

                if buy_order['amount'] == 0:
                    self.buy_orders.pop(0)
                if sell_order['amount'] == 0:
                    self.sell_orders.pop(0)
            else:
                break

    def get_orderbook(self):
        return {
            'buy': self.buy_orders,
            'sell': self.sell_orders,
            'trades': self.trades
        }

