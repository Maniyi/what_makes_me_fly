from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.CustomerRequest])
def read_requests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve requests.
    """
    requests = crud.get_requests(db, skip=skip, limit=limit)
    return requests

@router.post("/", response_model=schemas.CustomerRequest)
def create_request(
    *,
    db: Session = Depends(deps.get_db),
    request_in: schemas.CustomerRequestCreate,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new request.
    """
    request = crud.create_request(db=db, request=request_in)
    return request

@router.get("/{request_id}", response_model=schemas.CustomerRequest)
def read_request(
    *,
    db: Session = Depends(deps.get_db),
    request_id: int,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get request by ID.
    """
    request = crud.get_request(db=db, request_id=request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    return request

@router.patch("/{request_id}", response_model=schemas.CustomerRequest)
def update_request(
    *,
    db: Session = Depends(deps.get_db),
    request_id: int,
    request_in: schemas.CustomerRequestUpdate,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a request.
    """
    request = crud.get_request(db=db, request_id=request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    request = crud.update_request(db=db, request_id=request_id, update_data=request_in)
    return request
