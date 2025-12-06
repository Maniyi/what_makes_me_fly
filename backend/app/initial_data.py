import logging

from app.db.session import SessionLocal
from app.crud import crud
from app.schemas import schemas

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db() -> None:
    db = SessionLocal()
    
    # Create mock users
    user = crud.get_user_by_username(db, username="customer")
    if not user:
        user_in = schemas.UserCreate(
            username="customer",
            password="password",
            role="customer",
        )
        crud.create_user(db, user=user_in)
        logger.info("Created customer user")

    user = crud.get_user_by_username(db, username="attendant")
    if not user:
        user_in = schemas.UserCreate(
            username="attendant",
            password="password",
            role="attendant",
        )
        crud.create_user(db, user=user_in)
        logger.info("Created attendant user")
        
    user = crud.get_user_by_username(db, username="admin")
    if not user:
        user_in = schemas.UserCreate(
            username="admin",
            password="password",
            role="admin",
        )
        crud.create_user(db, user=user_in)
        logger.info("Created admin user")

    # Create mock inventory
    if not crud.get_inventory_items(db):
        items = [
            schemas.InventoryItemCreate(name="Beer", quantity=100, price=5.0, category="Drinks"),
            schemas.InventoryItemCreate(name="Chips", quantity=50, price=2.5, category="Snacks"),
        ]
        for item in items:
            crud.create_inventory_item(db, item)
        logger.info("Created mock inventory")

    db.close()

if __name__ == "__main__":
    logger.info("Creating initial data")
    init_db()
    logger.info("Initial data created")
