from models import *
#Ce fichier contient la logique métier pour gérer les produits.
from dal import *

class UserManager:
    def _init_(self)->None:
        self.userDao=UserDao()
    def listUsers(self):
        return self.userDao.listUsers()
    def auth(self,login:str,password:str):
        print(f'{login},{password}')
        return self.userDao.auth(login,password)



class ProductManage:
    card: list[Product] = [Product('P001', 3500, 'HP Laser Jet')]
    
    @staticmethod
    def search(ref: str) -> Product | None:
        for product in ProductManage.card:
            if product.ref == ref:
                return product
        return None

    @staticmethod
    def add(body: dict) -> bool:
        product: Product = Product(**body)  # Transformer le dictionnaire body en objet Product
        ProductManage.card.append(product)
        return True
    
    @staticmethod
    def list() -> list[Product]:
        return ProductManage.card

if __name__ == '__main__':
    """ printer: dict = {'ref': 'P001', 'price': 3500, 'name': 'HP Laser Jet'}
    laptop: dict = {'ref': 'P002', 'price': 1200, 'name': 'Dell PS'}
    
    ProductManage.add(printer)  # Ajouter un produit en passant un dictionnaire
    ProductManage.add(laptop)
    
    for product in ProductManage.list():  # Affichage de la liste des produits
        print(f"Ref: {product.ref}, Price: {product.price}, Name: {product.name}") """
    userDao:UserDao=UserDao()
    print(userDao)