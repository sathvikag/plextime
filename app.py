from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import uuid

app = Flask(__name__)

client = PyMongo(app, 'mongodb://localhost:27017/todo_db')
db = client.db

### END EXAMPLE CODE

@app.route('/test')
def test():
    db.Test.insert_one({'id': str(uuid.uuid4()), 'body': request.args.get('body')})
    return request.args.get('body'), 200

@app.route('/test2')
def test2():
    documents = db.Test.find({}, {'_id': False})
    return jsonify([d for d in documents]), 200

@app.route('/test3')
def test3():
    db.Test.delete_many({})
    return 'deleted all documents', 200

### END EXAMPLE CODE

# return list of first 50 classes
@app.route("/classes", methods=["GET"])
def get_classes():
    return None

# return user information/profile
# uuid.uuid4()
@app.route("/user/<user_id>", methods=["GET", "PUT", "POST", "DELETE"])
def edit_user(user_id):
    return None

# editing comments from user
@app.route("/user/<user_id>/comments", methods=["GET", "PUT", "POST", "DELETE"])
def user_comments(user_id):
    return None

# get information for a paticular class_id
# add functionality for "/professors"
# don't let users delete/add classes 
@app.route("/classes/<class_id>", methods=["GET", "PUT", "POST", "DELETE"])
def edit_class(class_id):
    return None

# editing comments from class
@app.route("/classes/<class_id>/comments", methods=["GET", "PUT", "POST", "DELETE"])
def class_comments(class_id):
    return None

# edit professor information
@app.route("/professors/<id>", methods = ["GET", "PUT", "POST", "DELETE"])
def edit_professor(id):
    return None

# add comments api calls
    
app.run(debug=True)