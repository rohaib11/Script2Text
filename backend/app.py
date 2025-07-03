from flask import Flask, request, jsonify
import pytesseract
import cv2
import numpy as np
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Set the path to Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# In-memory storage for documents (replace with database in production)
documents = {}
rooms = {}

def allowed_file(filename):
    """ Check if the uploaded file is a valid image type """
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_image():
    # Get the image file from the POST request
    file = request.files.get('image')
    
    # Check if file is valid
    if not file or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type or no file provided'}), 400

    # Decode the image file into an OpenCV-compatible format
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Preprocess the image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    
    # Get the language parameter
    lang = request.args.get('lang', 'eng')
    
    try:
        text = pytesseract.image_to_string(thresh, lang=lang)
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

@app.route('/save', methods=['POST'])
def save_document():
    content = request.json.get('content')
    if not content:
        return jsonify({'error': 'No content provided'}), 400
    
    doc_id = f"doc_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    documents[doc_id] = {
        'content': content,
        'created_at': datetime.now().isoformat()
    }
    return jsonify({'id': doc_id, 'status': 'saved'})

@app.route('/load/<doc_id>', methods=['GET'])
def load_document(doc_id):
    document = documents.get(doc_id)
    if not document:
        return jsonify({'error': 'Document not found'}), 404
    return jsonify(document)

@socketio.on('text-update')
def handle_text_update(data):
    room_id = data.get('roomId', 'default')
    emit('text-update', {
        'text': data['text'],
        'timestamp': data['timestamp'],
        'roomId': room_id
    }, room=room_id, include_self=False)

@socketio.on('join-room')
def handle_join_room(data):
    room_id = data['roomId']
    rooms[room_id] = rooms.get(room_id, set())
    rooms[room_id].add(request.sid)
    emit('room-joined', {'roomId': room_id, 'message': f'Joined room {room_id}'})

@socketio.on('leave-room')
def handle_leave_room(data):
    room_id = data['roomId']
    if room_id in rooms and request.sid in rooms[room_id]:
        rooms[room_id].remove(request.sid)
        emit('room-left', {'roomId': room_id, 'message': f'Left room {room_id}'})

@socketio.on('disconnect')
def handle_disconnect():
    for room_id, sids in rooms.items():
        if request.sid in sids:
            sids.remove(request.sid)

if __name__ == '__main__':
    socketio.run(app, debug=True)