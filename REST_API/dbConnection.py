import pymongo
from pymongo import MongoClient
from enum import Enum
import ipdb;


class MongoDBConnection :

    class RetCodes(Enum):
        USER_EXISTS = 0,
        SUCCESS = 1,
        FAILED = 2


    def __init__(self):
        self.allGuests = self.__getTotalGuests();
    
    def getAllGuests(self):        

        def removeId(dictElement):
            del dictElement["_id"];
            return dictElement;

        l = [removeId(g) for g in self.allGuests];

        return l;

    def addUserToDatabase(self,user,password,database=None):

        with MongoClient("mongodb://root:root@localhost/?authSource=admin") as client:            
            #getattr(client,database).add_user(user, password, roles=[{'role':'readWrite','db':'Guests'}]);            
            client.Guests.add_user(user, password, roles=[{'role':'readWrite','db':database}])


    def insertDocument(self , document):

        def helper(value):
            return True if value != "" else False;

        with MongoClient("mongodb://bulanas:226688@localhost/?authSource=Guests") as client:
            GuestsDB = client.Guests;
            guestsCol = GuestsDB.guests;

            temporary = [helper(v) for k,v in document.items()];                      
            if(any(temporary)):
                id = guestsCol.insert_one(document);
                return True;
            else:
                return False;

            print(id.inserted_id);

    def __getTotalGuests(self):

        allGuests = None;

        with MongoClient("mongodb://bulanas:226688@localhost/?authSource=Guests") as client:        

            GuestsDB = client.Guests;
            guestsCol = GuestsDB.guests;

            allPersons = guestsCol.find();
            allGuests = allPersons;

        
        return allGuests;

    def registerUser(self , user, pass1):

        print("INSIDE userExists")

        with MongoClient("mongodb://root:root@localhost/?authSource=admin") as client :

            users = client.InvitesDB.users;
            ret = users.find_one({"username":user});
            if(ret != None):
                print("User already exists in db ");
                return MongoDBConnection.RetCodes.USER_EXISTS;
            else:
                ret = users.insert_one({
                    "username":user,
                    "password":pass1
                });
                if(ret != None):
                    return MongoDBConnection.RetCodes.SUCCESS;
                else:
                    return MongoDBConnection.RetCodes.FAILED;
                
            
            


