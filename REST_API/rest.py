from flask import Flask, request, make_response
from flask import jsonify
from dbConnection import MongoDBConnection
from authenticationModule import auth
import ipdb
from flask_cors import CORS

application = Flask(__name__)
CORS(application);
database=MongoDBConnection();


@application.route("/guests" , methods=["GET"])
@auth.login_required
def index():
    print("------========-------");
    guests = database.getAllGuests();
    return jsonify(guests);

@application.route("/register" , methods=["POST"])
def register():
    u = format(request.args.get("username"));
    p = format(request.args.get("password"));
    ret=database.registerUser(u,p);

    print(f"Register user ret value = {ret.value}");
    return jsonify({"status":ret.value}); 

@application.route("/insguests", methods=["GET","POST"])
@auth.login_required
def insertDoc():
    print("==== username : {}".format(request.args.get("username")));
    print("==== conf : {}".format(request.args.get("conf")));
    
    if(request.method == "POST"):
        result = database.insertDocument({
            "name":request.args.get("username"),
            "conf":request.args.get("conf")
        });
        if(result == False):
            return make_response(
                jsonify({"status":"failed"}),
                400,
                {"Content-Type": "application/json"}
            );            
        else:
            return jsonify({"status":"success"});    
    else:
        return make_response(jsonify({
        "getStatus":"GET method not allowed"
        }), 405) ; 



application.run(debug=True)

