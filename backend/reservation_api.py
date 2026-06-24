
# Adaugă acest cod în serverul tău principal (ex: app.py)
from flask import Flask, request, jsonify
import sqlite3, os
base = '/opt/ristorantemia'
def init_db():
    conn = sqlite3.connect(f'{base}/reservations.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT, date TEXT, time TEXT, guests INTEGER)''')
    conn.commit()
    conn.close()
init_db()

# @app.route('/api/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    try:
        conn = sqlite3.connect(f'{base}/reservations.db')
        c = conn.cursor()
        c.execute("INSERT INTO reservations (name, phone, email, date, time, guests) VALUES (?, ?, ?, ?, ?, ?)",
                  (data.get('name'), data.get('phone'), data.get('email'), data.get('date'), data.get('time'), data.get('guests')))
        conn.commit(); conn.close()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})
