from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime
from app.models.models import RequestStatus, AttendantStatus

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- User ---
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    role: str = "customer"

class User(UserBase):
    id: int
    role: str
    
    class Config:
        from_attributes = True

# --- Inventory ---
class InventoryItemBase(BaseModel):
    name: str
    quantity: int
    price: float
    category: Optional[str] = None

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[float] = None
    category: Optional[str] = None

class InventoryItem(InventoryItemBase):
    id: int
    
    class Config:
        from_attributes = True

# --- Attendant ---
class AttendantBase(BaseModel):
    name: str
    status: AttendantStatus = AttendantStatus.IDLE

class AttendantCreate(AttendantBase):
    pass

class AttendantUpdate(BaseModel):
    status: Optional[AttendantStatus] = None

class Attendant(AttendantBase):
    id: int
    
    class Config:
        from_attributes = True

# --- Customer Request ---
class CustomerRequestBase(BaseModel):
    customer_name: str
    table_number: Optional[str] = None
    items: List[Any] # Simplified for now

class CustomerRequestCreate(CustomerRequestBase):
    pass

class CustomerRequestUpdate(BaseModel):
    status: Optional[RequestStatus] = None
    attendant_id: Optional[int] = None

class CustomerRequest(CustomerRequestBase):
    id: int
    status: RequestStatus
    created_at: datetime
    updated_at: Optional[datetime] = None
    attendant_id: Optional[int] = None
    
    class Config:
        from_attributes = True

# --- Payment ---
class PaymentBase(BaseModel):
    amount: float
    method: str
    request_id: Optional[int] = None

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Expense ---
class ExpenseBase(BaseModel):
    description: str
    amount: float
    category: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
