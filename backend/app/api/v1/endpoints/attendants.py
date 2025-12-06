from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud
from app.schemas import schemas

router = APIRouter()

@router.get("/{attendant_id}/assignments", response_model=List[schemas.CustomerRequest])
def read_attendant_assignments(
    attendant_id: int,
    db: Session = Depends(deps.get_db),
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve assignments for an attendant.
    """
    assignments = crud.get_attendant_assignments(db=db, attendant_id=attendant_id)
    return assignments
