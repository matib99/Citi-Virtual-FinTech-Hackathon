import random
import string
from flask import Flask, jsonify

app = Flask(__name__)

sessions = {}

def get_new_id():
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    while (result_str in sessions.keys()):
       result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
    
@app.route('/initialize', methods=['POST'])
def initialise():
    id = get_new_id()
    name = request.json.get("name")
    amount = request.json.get("amount")
    sessions.update(id, (name, amount, False))
    return jsonify({'session_id': id})

@app.route('/<path:text>', methods=['GET'])
def get_data():
    id = text
    if id not in sessions.keys():
         abort(404)
    (name, amount, completion) = sessions.get(id)
    return jsonify({'name': name, 'amount': amount, 'completed':completion})

@app.route('/<path:text>', methods=['POST'])
def pay():
    id = text
    if id not in sessions.keys():
         abort(404)
    (n, a, c) = sessions.get(id)
    sessions.update(id, (n, a, True))
    return jsonify({'completed': True})

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=80)