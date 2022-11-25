import random
import string
from flask import Flask, jsonify, abort, request

app = Flask(__name__)

sessions = {"vpykdw": ("sklep", 10, False)}

id_length = 6

balances = {"mateusz": 200, "jan":100, "musk":100000000}

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404
    
@app.errorhandler(403)
def resource_not_found(e):
    return jsonify(error=str(e)), 403

def get_new_id():
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(id_length))
    while (result_str in sessions.keys()):
       result_str = ''.join(random.choice(letters) for i in range(id_length))
    return result_str
    
@app.route('/initialize', methods=['POST'])
def initialise():
    id = get_new_id()
    name = request.json.get("name")
    amount = int(request.json.get("amount"))
    sessions.update({id: (name, amount, False)})
    if name not in balances.keys():
    	balances.update({name:0})
    return jsonify({'session_id': id})

@app.route('/<string:text>', methods=['GET'])
def get_data(text):
    id = text
    if id not in sessions.keys():
         abort(404)
    (name, amount, completion) = sessions.get(id)
    return jsonify({'name': name, 'amount': amount, 'completed':completion})

@app.route('/<string:text>', methods=['POST'])
def pay(text):
    id = text
    token = request.json.get("token")
    if id not in sessions.keys():
         abort(404, description="No such session")
    if token not in balances.keys():
         abort(404, description="No such user")
    (n, a, c) = sessions.get(id)
    if balances.get(token) < a:
         abort(403, description="Balance too low")
    sessions.update({id: (n, a, True)})
    balances.update({token: balances.get(token) - a})
    balances.update({n: balances.get(n) + a})
    return jsonify({'completed': True})
    
@app.route('/user/<string:text>', methods=['POST'])
def quick_transfer(text):
    recipient = text
    token = request.json.get("token")
    if token not in balances.keys():
         abort(404, description="No such recipient")
    if token not in balances.keys():
         abort(404, description="No such user")
    print(request.json)
    amount = int(request.json.get("amount"))
    if balances.get(token) < amount:
         abort(403, description="Balance too low")
    balances.update({token: balances.get(token) - amount})
    balances.update({recipient: balances.get(recipient) + amount})
    return jsonify({'completed': True})


app.run(host='0.0.0.0', port='10000')
