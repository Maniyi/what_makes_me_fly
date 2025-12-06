from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.InventoryItem])
def read_inventory(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve inventory items.
    """
    items = crud.get_inventory_items(db, skip=skip, limit=limit)
    return items

@router.post("/", response_model=schemas.InventoryItem)
def create_inventory_item(
    *,
    db: Session = Depends(deps.get_db),
    item_in: schemas.InventoryItemCreate,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new inventory item.
    """
    item = crud.create_inventory_item(db=db, item=item_in)
    return item

@router.patch("/{item_id}", response_model=schemas.InventoryItem)
def update_inventory_item(
    *,
    db: Session = Depends(deps.get_db),
    item_id: int,
    item_in: schemas.InventoryItemUpdate,
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an inventory item.
    """
    item = crud.update_inventory_item(db=db, item_id=item_id, item=item_in)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
