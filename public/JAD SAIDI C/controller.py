from flask import Flask, request, render_template, session, redirect, url_for, jsonify
from werkzeug.exceptions import HTTPException
from dal import UserDao, ProductDao
from models import User, Product
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)

userDao = UserDao()
productDao = ProductDao()

@app.route("/")
def index():
    return render_template("index1.html")

@app.route("/auth", methods=['POST'])
def auth():
    login = request.form.get("login")
    password = request.form.get("password")
    user = userDao.auth(login, password)
    if user:
        session['email'] = user.email
        session['isAdmin'] = user.isAdmin
        return redirect(url_for("dashboard"))
    else:
        return render_template("index1.html", error="Invalid credentials")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        user = User(email=email, password=password, isAdmin=False)
        if userDao.register(user):
            return redirect(url_for("index"))
    return render_template("register.html")

@app.route("/dashboard")
def dashboard():
    if 'email' in session:
        products = productDao.listProducts(session['email'])
        return render_template("app.html", products=products)
    return redirect(url_for("index"))

@app.route("/product/add", methods=['POST'])
def add_product():
    if 'email' in session:
        product = Product(
            reference=request.form.get("reference"),
            description=request.form.get("description"),
            price=float(request.form.get("price")),
            quantity=int(request.form.get("quantity")),
            email=session['email']
        )
        if productDao.addProduct(product):
            return redirect(url_for("dashboard"))
        else:
            return render_template("app.html", error="Product with this reference already exists.")
    return redirect(url_for("index"))


@app.route("/product/search", methods=['GET'])
def search_product():
    if 'email' in session:
        reference = request.args.get('reference')
        product = productDao.searchByReference(reference, session['email'])
        return render_template("app.html", products=[product] if product else [])
    return redirect(url_for("index"))


@app.route("/product/delete/<reference>", methods=['POST'])
def delete_product(reference):
    if 'email' in session:
        if productDao.deleteProduct(reference, session['email']):
            return redirect(url_for("dashboard"))
        else:
            return "Failed to delete product", 500
    return redirect(url_for("index"))

@app.route("/product/update/<reference>", methods=['POST'])
def update_product(reference):
    if 'email' in session:
        product = Product(
            reference=reference,
            description=request.form.get("description"),
            price=float(request.form.get("price")),
            quantity=int(request.form.get("quantity")),
            email=session['email']
        )
        productDao.updateProduct(product)
        return redirect(url_for("dashboard"))
    return redirect(url_for("index"))

if __name__ == '__main__':
    app.run(debug=True)
