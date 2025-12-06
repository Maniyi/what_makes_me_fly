from fastapi import APIRouter
from app.api.v1.endpoints import auth, requests, attendants, inventory, payments, expenses, retailrise

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/login", tags=["login"])
api_router.include_router(requests.router, prefix="/requests", tags=["requests"])
api_router.include_router(attendants.router, prefix="/attendants", tags=["attendants"])
api_router.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(expenses.router, prefix="/expenses", tags=["expenses"])
api_router.include_router(retailrise.router, prefix="/mock/retailrise", tags=["mock-retailrise"])
