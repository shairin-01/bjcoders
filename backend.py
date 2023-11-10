from flask import Flask, jsonify

app = Flask(__name__)

# Sample quiz data
quiz = [
    {
        "question": "Q.THE WORLD FAMOUS MONUMENT 'PYRAMID' IS LOCATED IN ?",
        "choices": ["RUSSIA", "IRAQ", "EGYPT", "GREECE"],
        "answer": "EGYPT"
    },
    # Add more quiz questions here
]

@app.route('/api/quiz', methods=['GET'])
def get_quiz():
    return jsonify({'quiz': quiz})

if __name__ == '__main__':
    app.run(debug=True)
