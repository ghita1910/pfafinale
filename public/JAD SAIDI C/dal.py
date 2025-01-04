from mysql.connector import connect
from models import User, Product

class DataBase:
    con = None
    
    @staticmethod
    def get_connection():
        try:
            if DataBase.con is None:
                DataBase.con = connect(
                    user='root',
                    password='',
                    host='localhost',
                    port=3306,
                    database='db_flask'
                )
            return DataBase.con
        except:
            print("Connection Error")
            return None

class UserDao:
    def __init__(self):
        self.con = DataBase.get_connection()

    def listUsers(self):
        query = "SELECT * FROM T_user;"
        users = []
        con = self.con
        if con:
            cursor = con.cursor(dictionary=True)
            cursor.execute(query)
            results = cursor.fetchall()
            for record in results:
                users.append(User(**record))
        return users

    def auth(self, login, password):
        query = "SELECT * FROM T_user WHERE email=%s AND password=%s;"
        con = self.con
        if con:
            cursor = con.cursor(dictionary=True)
            cursor.execute(query, (login, password))
            result = cursor.fetchone()
            if result:
                return User(**result)
        return None

    def register(self, user: User):
        query = "INSERT INTO T_user (email, password, isAdmin) VALUES (%s, %s, %s);"
        con = self.con
        if con:
            cursor = con.cursor()
            cursor.execute(query, (user.email, user.password, user.isAdmin))
            con.commit()
            return True
        return False

class ProductDao:
    def __init__(self):
        self.con = DataBase.get_connection()



  
    def listProducts(self, email):
        query = "SELECT * FROM T_product WHERE email=%s;"
        products = []
        con = self.con
        if con:
            cursor = con.cursor(dictionary=True)
            cursor.execute(query, (email,))
            results = cursor.fetchall()
            for record in results:
                products.append(Product(**record))
        return products

   
    # Méthode existante pour ajouter un produit
    def addProduct(self, product: Product):
        # Vérification si la référence du produit existe déjà
        query_check = "SELECT COUNT(*) FROM T_product WHERE reference=%s;"
        con = self.con
        if con:
            cursor = con.cursor()
            cursor.execute(query_check, (product.reference,))
            result = cursor.fetchone()
            if result[0] > 0:
                return False  # Le produit existe déjà, on ne l'ajoute pas.
        
        # Si le produit n'existe pas, on l'ajoute
        query = "INSERT INTO T_product (reference, description, price, quantity, email) VALUES (%s, %s, %s, %s, %s);"
        if con:
            cursor = con.cursor()
            cursor.execute(query, (product.reference, product.description, product.price, product.quantity, product.email))
            con.commit()
            return True
        return False


    def updateProduct(self, product: Product):
        query = "UPDATE T_product SET description=%s, price=%s, quantity=%s WHERE reference=%s AND email=%s;"
        con = self.con
        if con:
            cursor = con.cursor()
            cursor.execute(query, (product.description, product.price, product.quantity, product.reference, product.email))
            con.commit()
            return True
        return False

        # dans ProductDao
    def searchByReference(self, reference, email):
     query = "SELECT * FROM T_product WHERE reference=%s AND email=%s;"
     con = self.con
     if con:
        cursor = con.cursor(dictionary=True)
        cursor.execute(query, (reference, email))
        result = cursor.fetchone()
        if result:
            return Product(**result)
     return None

    
    def deleteProduct(self, reference, email):
        query = "DELETE FROM T_product WHERE reference=%s AND email=%s;"
        con = self.con
        if con:
            cursor = con.cursor()
            cursor.execute(query, (reference, email))
            con.commit()
            return True
        return False
