from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["coding_platform"]
questions_collection = db["questions"]

# Clear old questions (optional)
questions_collection.delete_many({})

# Insert sample coding questions
questions = [
    {
        "_id": 1,
        "question": "Reverse a string",
        "description": "Given a string, return its reverse.",
        "test_cases": [
            {"input": "hello\n", "expected_output": "olleh"},
            {"input": "world\n", "expected_output": "dlrow"}
        ]
    },
    {
        "_id": 2,
        "question": "Write a function to add two numbers.",
    "test_cases": [
        {"input": "3 5\n", "expected_output": "8"},
        {"input": "-2 4\n", "expected_output": "2"},
        {"input": "10 20\n", "expected_output": "30"}
        ]
    },
    
    {
        "_id": 3,
        "question": "Check even or odd",
        "description": "Given an integer, return 'even' if it's even and 'odd' if it's odd.",
        "test_cases": [
            {"input": "4\n", "expected_output": "even"},
            {"input": "7\n", "expected_output": "odd"}
        ]
    }
]

# Insert into MongoDB
questions_collection.insert_many(questions)
print("Questions inserted successfully!")
