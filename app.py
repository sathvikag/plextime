from flask import Flask, request
from flask_mongoengine import MongoEngine

app = Flask(__name__)

# TEMPLATE
@app.route("/<text>", methods=["GET,PUT,POST,DELETE"])
def function_name():
    return None

# return list of first 50 classes
@app.route("/classes", methods=["GET"])
def get_classes():
    return None

# return user information/profile
@app.route("/profile", methods=["GET"])
def function_name():
    return None

app.run()