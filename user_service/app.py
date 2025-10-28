from flask import Flask, request, jsonify
from models import db, User

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return jsonify({"message": "User Service is running!"}) #at http://127.0.0.1:5000/

# CREATE user
@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        username=data["username"],
        email=data["email"],
        password=data["password"]  # (plain text for now — replace w/ hashing later)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201 #201 means created (HTTP status code)

# READ all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]) #returns all users in db as a list of JSON objects

# READ one user by ID
@app.route("/users/<int:user_id>", methods=["GET"])  #get single user by userID
def get_user(user_id):
    user = User.query.get_or_404(user_id)   #404 Not Found is user doesnt exist
    return jsonify(user.to_dict())   #returns user as a json object

# UPDATE user
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    if "username" in data:
        user.username = data["username"]
    if "email" in data:
        user.email = data["email"]
    if "password" in data:
        user.password = data["password"]
    db.session.commit()
    return jsonify(user.to_dict())

# DELETE user
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User {user_id} deleted."})

if __name__ == "__main__":
    app.run(debug=True)

