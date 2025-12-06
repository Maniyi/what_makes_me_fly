from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Expense])
def read_expenses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve expenses.
    """
    expenses = crud.get_expenses(db, skip=skip, limit=limit)
    return expenses

@router.post("/", response_model=schemas.Expense)
def create_expense(
    *,
    db: Session = Depends(deps.get_db),
    expense_in: schemas.ExpenseCreate,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new expense.
    """
    expense = crud.create_expense(db=db, expense=expense_in)
    return expense
