import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import Select from "react-select";
import axios from "axios";
import SquidGame from "../../frontend/src/Components/Squid_game/squid_game.jsx";

// Import Ace editor modes
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

const languages = [
  { value: "python", label: "Python", template: "def solution():\n    # Write your code here\n    pass\n" },
  { value: "javascript", label: "JavaScript", template: "function solution() {\n    // Write your code here\n}\n" },
  { value: "java", label: "Java", template: "import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}\n" },
  { value: "csharp", label: "C#", template: "using System;\n\npublic class Solution {\n    public static void Main() {\n        // Write your code here\n    }\n}\n" },
  { value: "ruby", label: "Ruby", template: "def solution\n    # Write your code here\nend\n" },
  { value: "php", label: "PHP", template: "<?php\nfunction solution() {\n    // Write your code here\n}\n?>\n" },
  { value: "golang", label: "Go", template: "package main\n\nimport \"fmt\"\n\nfunc solution() {\n    // Write your code here\n}\n\nfunc main() {\n    solution()\n}\n" },
  { value: "typescript", label: "TypeScript", template: "function solution(): void {\n    // Write your code here\n}\n" },
];

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState(languages[0].template);
  const [output, setOutput] = useState("");
  const [question, setQuestion] = useState(null);
  const [theme, setTheme] = useState("monokai");
  const [showSubmission, setShowSubmission] = useState(false);
  const [autoStartGame, setAutoStartGame] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/questions/random");
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleNextQuestion = () => {
    fetchQuestion();
    setCode(selectedLanguage.template);
    setOutput("");
    setShowSubmission(false);
    setAutoStartGame(false);
  };

  const handleLanguageChange = (selected) => {
    setSelectedLanguage(selected);
    setCode(selected.template);
  };

  const handleRunCode = () => {
    setOutput("Output will appear here...");
  };

  const handleSubmit = async () => {
    setOutput("Submission result will appear here...");
    setShowSubmission(true);
    setAutoStartGame(true);
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={{ ...styles.leftPanel, minHeight: "fit-content" }}>
        {!showSubmission ? (
          <>
            <div style={styles.questionContainer}>
              <h2>{question?.title}</h2>
              <p>{question?.description}</p>
            </div>
            <div style={styles.testCasesContainer}>
              <h3>Sample Test Cases:</h3>
              {question?.testCases.slice(0, 2).map((testCase, index) => (
                <div key={index} style={styles.testCase}>
                  <h4>Test Case {index + 1}:</h4>
                  <p>
                    <strong>Input:</strong> {testCase.input} <br />
                    <strong>Output:</strong> {testCase.output}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.submissionContainer}>
            <h2>Game Challenge</h2>
            <SquidGame autoStart={autoStartGame} />
            <button
              style={{ ...styles.button, backgroundColor: "#FF9800", marginTop: "20px" }}
              onClick={() => {
                setShowSubmission(false);
                setAutoStartGame(false);
              }}
            >
              Back to Question
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - Now always visible */}
      <div style={styles.rightPanel}>
        <div style={styles.compilerHeader}>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languages}
            styles={selectStyles}
          />
          <button
            style={{ ...styles.button, backgroundColor: "#4CAF50" }}
            onClick={handleRunCode}
          >
            Run Code
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#2196F3" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#FF9800" }}
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
        <div style={styles.compilerContainer}>
          <AceEditor
            mode={selectedLanguage.value}
            theme={theme}
            onChange={setCode}
            name="code-editor"
            width="100%"
            height="80%" // Adjusted for more height for the compiler
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <div style={styles.outputContainer}>
            <h3 style={styles.outputTitle}>Output:</h3>
            <div style={styles.outputBox}>
              <pre style={styles.outputText}>{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "95vh",
    padding: "10px",
    gap: "20px",
  },
  leftPanel: {
    flex: "1",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflowY: "auto", // Allow scroll if content is long
  },
  questionContainer: {
    marginBottom: "20px",
  },
  testCasesContainer: {
    marginTop: "20px",
  },
  testCase: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  rightPanel: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  compilerHeader: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "8px", 
  },
  compilerContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  outputContainer: {
    marginTop: "10px",
    flex: "0 0 auto",
  },
  outputTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  outputBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "10px",
    height: "90%", 
    overflowY: "auto",
  },
  outputText: {
    fontSize: "14px",
    color: "#333",
  },
  submissionContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
};

const selectStyles = {
  container: (base) => ({
    ...base,
    width: "150px",
  }),
  control: (base) => ({
    ...base,
    fontSize: "12px",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "12px",
  }),
};

export default App;

