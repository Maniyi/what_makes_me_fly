from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.session import Base

class RequestStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class AttendantStatus(str, enum.Enum):
    IDLE = "idle"
    BUSY = "busy"

class CustomerRequest(Base):
    __tablename__ = "customer_requests"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, index=True)
    table_number = Column(String, nullable=True)
    status = Column(Enum(RequestStatus), default=RequestStatus.PENDING)
    items = Column(JSON) # List of items requested
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    attendant_id = Column(Integer, ForeignKey("attendants.id"), nullable=True)
    attendant = relationship("Attendant", back_populates="assignments")

class Attendant(Base):
    __tablename__ = "attendants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    status = Column(Enum(AttendantStatus), default=AttendantStatus.IDLE)
    
    assignments = relationship("CustomerRequest", back_populates="attendant")

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    quantity = Column(Integer, default=0)
    price = Column(Float, default=0.0)
    category = Column(String, nullable=True)

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    method = Column(String) # cash, card, etc.
    request_id = Column(Integer, ForeignKey("customer_requests.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float)
    category = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="customer") # customer, attendant, admin
