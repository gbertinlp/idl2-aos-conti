from flask import Flask, request, abort, jsonify
from functools import wraps
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import secrets

app = Flask(__name__)
CORS(app, origins='*')
bcrypt = Bcrypt(app)

# Simulación de una base de datos de usuarios (en un entorno de producción, utiliza una base de datos real)
users = {
    'bertin@conti.edu.pe': {
        'id': 'be167edupe',
        'contrasena_hash': bcrypt.generate_password_hash('conti123').decode('utf-8'),
        'token': secrets.token_urlsafe(16)
    },
    'lazarte@conti.edu.pe': {
        'id': 'la298edupe',
        'contrasena_hash': bcrypt.generate_password_hash('conti123').decode('utf-8'),
        'token': secrets.token_urlsafe(16)
    }
}

def require_api_key(fn):
    @wraps(fn)
    def decorated(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if api_key == 'api-key-ok':
            return fn(*args, **kwargs)
        else:
            abort(401)
    return decorated

def validate_token(fn):
    @wraps(fn)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        # Realiza la lógica de validación del token aquí
        if token in [user['token'] for user in users.values()]:
            return fn(*args, **kwargs)
        else:
            abort(401)
    return decorated

def validate_login_credentials(fn):
    @wraps(fn)
    def decorated(*args, **kwargs):
        data = request.get_json()
        user = data.get('email')
        pwd = data.get('password')

        # Verificar si las credenciales son válidas
        if user in users and bcrypt.check_password_hash(users[user]['contrasena_hash'], pwd):
            return fn(*args, **kwargs)
        else:
            abort(401)
    return decorated

@app.route('/')
def index():
    return 'Hello from Flask!'

@app.route('/login', methods=['POST'])
@validate_login_credentials
def login():
    try:
        user = request.get_json().get('email')
        response_data = {'id': users[user]['id'], 'mensaje': 'Inicio de sesión exitoso', 'token': users[user]['token']}
        return jsonify(response_data), 200
    except Exception as e:
        print(e)
        abort(500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
