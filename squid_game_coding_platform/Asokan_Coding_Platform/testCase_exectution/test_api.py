import requests

url = "http://127.0.0.1:5000/submit_code"
data = {
    "question_id": 2,
    "code":"""
#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a + b);
    return 0;
}
""",
    "language": "c"
}


# Send POST request
try:
    response = requests.post(url, json=data)
    response.raise_for_status()  # Raises an HTTPError for bad responses (4xx and 5xx)
    print("Response JSON:", response.json())  # Print API response
except requests.exceptions.HTTPError as err:
    print(f"HTTP error occurred: {err}")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
except ValueError:
    print("Response is not in JSON format:", response.text)  # Print response text for further inspection
