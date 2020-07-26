from flask_httpauth import HTTPBasicAuth
from flask import jsonify

auth = HTTPBasicAuth()

@auth.get_password
def getPassword(user):
    if(user == "Sireanu"):
        return "1234"
    else:
        return None

@auth.error_handler
def unathorized():
    return jsonify({"error":"Unauthorized access"});