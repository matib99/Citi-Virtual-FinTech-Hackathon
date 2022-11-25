import random
import string
from flask import Flask, jsonify, abort, request

app = Flask(__name__)

sessions = {}

id_length = 10

def get_new_id():
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    while (result_str in sessions.keys()):
       result_str = ''.join(random.choice(letters) for i in range(id_length))
    return result_str
    
@app.route('/initialize', methods=['POST'])
def initialise():
    id = get_new_id()
    name = request.json.get("name")
    amount = request.json.get("amount")
    sessions.update(id, (name, amount, False))
    return jsonify({'session_id': id})

@app.route('/<string:id>', methods=['GET'])
def get_data(id):
    print(f"REQUEST: <{id}>")
    if id not in sessions.keys():
        abort(404)
    (name, amount, completion) = sessions.get(id)
    return jsonify({'name': name, 'amount': amount, 'completed':completion})

@app.route('/<string:id>', methods=['POST'])
def pay(id):
    if id not in sessions.keys():
        abort(404)
    (n, a, c) = sessions.get(id)
    sessions[id] = (n, a, True)
    return jsonify({'completed': True})
    
app.run()
