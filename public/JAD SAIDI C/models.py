from dataclasses import dataclass

@dataclass
class User:
    email: str
    password: str
    isAdmin: bool

@dataclass
class Product:
    reference: str
    description: str
    price: float
    quantity: int
    email: str
