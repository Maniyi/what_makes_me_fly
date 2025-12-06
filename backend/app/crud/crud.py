from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas
from typing import List, Optional

# --- Inventory ---
def get_inventory_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.InventoryItem).offset(skip).limit(limit).all()

def create_inventory_item(db: Session, item: schemas.InventoryItemCreate):
    db_item = models.InventoryItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_inventory_item(db: Session, item_id: int, item: schemas.InventoryItemUpdate):
    db_item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not db_item:
        return None
    update_data = item.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

# --- Customer Requests ---
def get_requests(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CustomerRequest).offset(skip).limit(limit).all()

def create_request(db: Session, request: schemas.CustomerRequestCreate):
    db_request = models.CustomerRequest(**request.model_dump())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def update_request(db: Session, request_id: int, update_data: schemas.CustomerRequestUpdate):
    db_request = db.query(models.CustomerRequest).filter(models.CustomerRequest.id == request_id).first()
    if not db_request:
        return None
    data = update_data.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_request, key, value)
    db.commit()
    db.refresh(db_request)
    return db_request

def get_request(db: Session, request_id: int):
    return db.query(models.CustomerRequest).filter(models.CustomerRequest.id == request_id).first()

# --- Attendants ---
def get_attendants(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Attendant).offset(skip).limit(limit).all()

def create_attendant(db: Session, attendant: schemas.AttendantCreate):
    db_attendant = models.Attendant(**attendant.model_dump())
    db.add(db_attendant)
    db.commit()
    db.refresh(db_attendant)
    return db_attendant

def get_attendant_assignments(db: Session, attendant_id: int):
    return db.query(models.CustomerRequest).filter(models.CustomerRequest.attendant_id == attendant_id).all()

# --- Payments ---
def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(**payment.model_dump())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Payment).offset(skip).limit(limit).all()

# --- Expenses ---
def create_expense(db: Session, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(**expense.model_dump())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_expenses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Expense).offset(skip).limit(limit).all()

# --- Users ---
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed" # Mock hashing for now, will implement real hashing in auth
    db_user = models.User(username=user.username, hashed_password=fake_hashed_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
