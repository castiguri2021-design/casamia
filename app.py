from flask import Flask, send_from_directory, request, jsonify
import sqlite3, os

app = Flask(__name__, static_folder='static', static_url_path='/static')
base = '/opt/ristorantemia'

def get_db():
    return sqlite3.connect(f'{base}/reservations.db')

conn = get_db()
conn.execute('''CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT, date TEXT, time TEXT, guests INTEGER, notes TEXT)''')
conn.execute('''CREATE TABLE IF NOT EXISTS analytics (id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT, time TEXT, url TEXT, ip TEXT)''')
conn.commit(); conn.close()

@app.route('/')
def index():
    return send_from_directory(base, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(base, path)

@app.route('/api/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute("INSERT INTO reservations (name, phone, email, date, time, guests, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (data.get('name'), data.get('phone'), data.get('email'), data.get('date'), data.get('time'), data.get('guests'), data.get('notes')))
        conn.commit(); conn.close()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/api/track', methods=['POST'])
def track_analytics():
    data = request.json
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute("INSERT INTO analytics (action, time, url, ip) VALUES (?, ?, ?, ?)",
                  (data.get('action'), data.get('time'), data.get('url'), request.remote_addr))
        conn.commit(); conn.close()
        return jsonify({"success": True})
    except Exception:
        return jsonify({"success": False})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
