const snippets = {
    "loop": [
        "#include <iostream>",
        "using namespace std;",
        "int main() {",
        "    for (int i = 1; i <= 5; i++) {",
        "        cout << i << \" \";",
        "    }",
        "    return 0;",
        "}"
    ],
    "swap": [
        "#include <iostream>",
        "using namespace std;",
        "int main() {",
        "    int a = 5, b = 10, temp;",
        "    temp = a;",
        "    a = b;",
        "    b = temp;",
        "    cout << \"a: \" << a << \", b: \" << b;",
        "    return 0;",
        "}"
    ],
    "function": [
        "#include <iostream>",
        "using namespace std;",
        "void greet() {",
        "    cout << \"Hello, World!\";",
        "}",
        "int main() {",
        "    greet();",
        "    return 0;",
        "}"
    ],
    "array": [
        "#include <iostream>",
        "using namespace std;",
        "int main() {",
        "    int arr[] = {1, 2, 3, 4, 5};",
        "    int sum = 0;",
        "    for (int i = 0; i < 5; i++) {",
        "        sum += arr[i];",
        "    }",
        "    cout << \"Sum: \" << sum;",
        "    return 0;",
        "}"
    ]
};

let selectedSnippet = "loop";
let scrambledOrder = [];

function loadSnippet() {
    selectedSnippet = document.getElementById("snippet-selector").value;
    let correctOrder = snippets[selectedSnippet];
    
    scrambledOrder = [...correctOrder].sort(() => Math.random() - 0.5);
    const container = document.getElementById("code-container");
    container.innerHTML = "";

    scrambledOrder.forEach(line => {
        let div = document.createElement("div");
        div.textContent = line;
        div.classList.add("code-box");
        div.draggable = true;
        container.appendChild(div);
    });

    enableDragAndDrop();
}

function enableDragAndDrop() {
    let draggedItem = null;

    document.querySelectorAll(".code-box").forEach(item => {
        item.addEventListener("dragstart", () => { draggedItem = item; });
        item.addEventListener("dragover", e => e.preventDefault());
        item.addEventListener("drop", (e) => {
            e.preventDefault();
            if (draggedItem !== item) {
                let parent = item.parentNode;
                parent.insertBefore(draggedItem, item);
            }
        });
    });
}

function checkAnswer() {
    let userOrder = Array.from(document.querySelectorAll(".code-box"))
        .map(box => box.textContent.replace(/\s+/g, " ").trim());

    let expectedOrder = snippets[selectedSnippet].map(line => line.replace(/\s+/g, " ").trim());

    console.log("User Order:", userOrder);
    console.log("Expected Order:", expectedOrder);

    if (JSON.stringify(userOrder) === JSON.stringify(expectedOrder)) {
        window.location.href = "congratulations.html";
    } else {
        document.getElementById("message").textContent = "Try again! ❌";
        document.getElementById("message").style.color = "red";
    }
}

window.onload = loadSnippet;
