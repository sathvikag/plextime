from flask import Flask, request, jsonify
from pymongo import MongoClient
import uuid
import json
from cryptocode import decrypt

app = Flask(__name__)

with open('meta.json', 'r') as file:
    meta = json.load(file)
    password = decrypt(meta['password'], meta['key'])

client = MongoClient(f"mongodb+srv://{meta['username']}:{password}@plextime.dmmb7.mongodb.net/myFirstDatabase?retryWrites=false&w=majority")
db = client.plextime

### END EXAMPLE CODE
@app.route('/test')
def test():
    document = {'_id': str(uuid.uuid4()), 'body': request.args.get('body')}
    db.Test.insert_one(document)
    return document, 200

@app.route('/test2')
def test2():
    documents = db.Test.find({})
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
@app.route("/user/<user_id>/comments", methods=["GET"])
def user_comments(user_id):
    return None

# get information for a paticular class_id
# add functionality for "/professors"
# don't let users delete/add classes 
@app.route("/classes/<class_id>", methods=["GET", "PUT", "POST", "DELETE"])
def edit_class(class_id):
    return None

# editing comments from class
@app.route("/classes/<class_id>/comments", methods=["GET", "POST"])
def class_comments(class_id):
    if request.method == 'GET':
        comments_list = db.Comments.find({"class_id": class_id})
        return jsonify([comment for comment in comments_list]), 200
        
    elif request.method == 'POST':
        comment_dic = {"_id": str(uuid.uuid4()), "user_id": request.form["user_id"], "class_id": class_id, "content": request.form['content']}
        db.Comments.insert_one(comment_dic)
        return comment_dic, 200

@app.route("/classes/<class_id>/comments/<id>", methods=["PUT", "DELETE"])
def edit_comment(class_id, id):     
    if request.method == "PUT":
        db.Comments.update_one({"_id": id}, {"$set": {'content': request.form['content']}})
        return {"_id": id, 'content': request.form['content']}, 200

    if request.method == "DELETE":
        deleted_comment = db.Comments.find({"_id": id})
        db.Comments.delete_one({"_id": id})
        return deleted_comment, 200

    if request.method == "GET":
        comment = db.Comments.find_one({"_id": id})
        return comment, 200
        
# edit professor information
# {'$push': {<field>: {'$each': [1, 2, 3, 4]}}}
# {$push: {<field>: value}}
@app.route("/professors/<id>", methods = ["GET", "PUT", "DELETE"])
def edit_professor(id):
    if request.method == "GET":
        professor = db.Professors.find_one({"_id": id})
        return professor, 200

    elif request.method == "PUT":
        db.Professors.update_one({"_id": id}, {"$push": {'classes_taught': {"$each": request.form['classes_taught']}}})
        return db.Professors.find_one({"_id": id})['classes_taught'], 200
    
    elif request.method == "DELETE":
        deleted_professor = db.Professors.find_one({"_id":id})
        db.Professors.delete_one({"_id": id})
        return deleted_professor, 200

@app.route("/professors", methods = ["GET", "POST"])
def edit_professor2():
    if request.method == "POST":
        professor = {
            "_id": str(uuid.uuid4()),
            "name": request.form['name'],
            "email": request.form['email'],
            "classes_taught": request.form['classes_taught']
        }
        db.Professors.insert_one(professor)
        return professor, 200

    if request.method == "GET":
        return [professor for professor in db.Professors.find({})], 200
        
# add comments api calls
if __name__ == '__main__':  
    app.run(debug=True)