from typing import Any, Dict, List
from fastapi import APIRouter, Depends

from app.api import deps
from app.integrations.retailrise_mock import retailrise_client
from app.schemas import schemas

router = APIRouter()

@router.get("/inventory", response_model=List[Dict[str, Any]])
def get_retailrise_inventory(
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get inventory from Mock Retailrise.
    """
    return retailrise_client.get_inventory()

@router.post("/sale", response_model=Dict[str, Any])
def push_retailrise_sale(
    payload: Dict[str, Any],
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Push sale to Mock Retailrise.
    """
    return retailrise_client.push_sale(payload)

@router.get("/payments", response_model=List[Dict[str, Any]])
def get_retailrise_payments(
    current_user: schemas.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get payments from Mock Retailrise.
    """
    return retailrise_client.get_payments()
