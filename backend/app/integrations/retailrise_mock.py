import random
from typing import List, Dict, Any

class RetailriseMock:
    def get_inventory(self) -> List[Dict[str, Any]]:
        """Mock inventory data from Retailrise ERP"""
        return [
            {"id": "RR-001", "name": "Premium Lager", "sku": "BEER-001", "stock_level": 50, "price": 8.50},
            {"id": "RR-002", "name": "House Red Wine", "sku": "WINE-001", "stock_level": 24, "price": 12.00},
            {"id": "RR-003", "name": "Sparkling Water", "sku": "WATER-001", "stock_level": 100, "price": 3.00},
            {"id": "RR-004", "name": "Club Sandwich", "sku": "FOOD-001", "stock_level": 15, "price": 15.00},
        ]

    def push_sale(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Mock pushing a sale to Retailrise ERP"""
        return {
            "status": "success",
            "transaction_id": f"RR-TXN-{random.randint(1000, 9999)}",
            "message": "Sale recorded successfully"
        }

    def get_payments(self) -> List[Dict[str, Any]]:
        """Mock payment records from Retailrise ERP"""
        return [
            {"id": "RR-PAY-001", "amount": 25.50, "method": "credit_card", "date": "2023-10-26T10:00:00Z"},
            {"id": "RR-PAY-002", "amount": 12.00, "method": "cash", "date": "2023-10-26T11:30:00Z"},
        ]

    def register_webhook(self, url: str) -> Dict[str, Any]:
        """Mock registering a webhook for updates"""
        return {
            "status": "success",
            "webhook_id": f"RR-WH-{random.randint(100, 999)}",
            "url": url
        }

retailrise_client = RetailriseMock()
