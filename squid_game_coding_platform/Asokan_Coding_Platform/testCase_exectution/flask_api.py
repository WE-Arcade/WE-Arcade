import subprocess
import os
import tempfile
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["coding_platform"]
questions_collection = db["questions"]

# Function to execute user code
def execute_code(code, language, test_cases):
    file_ext = {"python": ".py", "c": ".c", "cpp": ".cpp", "java": ".java"}
    compile_cmd = None
    run_cmd = None
    temp_dir = tempfile.mkdtemp()  # Create a temp directory

    if language not in file_ext:
        return {"error": "Unsupported language"}

    filename = os.path.join(temp_dir, "Main" + file_ext[language])

    try:
        # Save code to a temporary file
        with open(filename, "w") as f:
            f.write(code)

        # Compilation commands for C, C++, Java
        if language == "c":
            compile_cmd = ["gcc", filename, "-o", os.path.join(temp_dir, "a.out")]
            run_cmd = [os.path.join(temp_dir, "a.out")]
        elif language == "cpp":
            compile_cmd = ["g++", filename, "-o", os.path.join(temp_dir, "a.out")]
            run_cmd = [os.path.join(temp_dir, "a.out")]
        elif language == "java":
            compile_cmd = ["javac", filename]
            run_cmd = ["java", "-cp", temp_dir, "Main"]
        elif language == "python":
            run_cmd = ["python3", filename]

        # Compile if needed
        if compile_cmd:
            compile_result = subprocess.run(compile_cmd, capture_output=True, text=True)
            if compile_result.returncode != 0:
                print(f"Compilation Error: {compile_result.stderr}")  # Log compilation error
                return {"error": "Compilation failed", "details": compile_result.stderr}

        # Run and evaluate test cases
        passed, failed = 0, 0
        for test in test_cases:
            input_data = test["input"]
            expected_output = test["expected_output"].strip()

            result = subprocess.run(run_cmd, input=input_data, capture_output=True, text=True)

            if result.stdout.strip() == expected_output:
                passed += 1
            else:
                failed += 1

        return {"passed": passed, "failed": failed}

    finally:
        # Cleanup temp files
        for file in os.listdir(temp_dir):
            os.remove(os.path.join(temp_dir, file))
        os.rmdir(temp_dir)

# API route to submit code
@app.route("/submit_code", methods=["POST"])
def submit_code():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input format"}), 400

    question_id = data.get("question_id")
    code = data.get("code")
    language = data.get("language")

    # Get test cases from MongoDB
    question = questions_collection.find_one({"_id": question_id})
    if not question:
        return jsonify({"error": "Invalid question ID"}), 404

    test_cases = question["test_cases"]
    result = execute_code(code, language, test_cases)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
