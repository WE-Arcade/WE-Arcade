**Software Requirements Specification (SRS)**

---

### 1. Introduction

This document outlines the Software Requirements Specification (SRS) for a **Code Editor with Gamified Test Case Execution**, inspired by platforms like LeetCode or HackerRank but with a unique twist. The platform allows users to solve programming problems, edit their code, and run test cases in a gamified environment resembling the *Squid Game* concept. Test cases are visualized as players in a game, and their movement represents the execution speed. The test case is "shot" if it fails, and players who exceed the time limit are eliminated before reaching the end.

### 2. Purpose

The purpose of this system is to provide a code editor where users can:
- Write and edit their code.
- Run the code against a set of test cases.
- Experience a gamified test case execution, where visual feedback is provided through a "Squid Game" interface.

This system will not include a login or sign-up mechanism, as user authentication will be handled by another team.

### 3. Scope

The system will:
- Provide a user interface (UI) for solving programming problems.
- Allow users to write and edit their code in an online code editor.
- Execute test cases with a visual representation of players' movements.
- Eliminate players (test cases) upon failure or time limit exceedance.
- Support multiple programming languages for code execution.

The system will not handle user authentication, project settings, or database management, as these responsibilities are handled by another team.

### 4. Functional Requirements

#### 4.1. Code Editor
- **FR1**: The platform will provide a code editor where users can write and edit code.
- **FR2**: The editor should support syntax highlighting for at least the following languages: Python, Java, C++, JavaScript, and Go.
- **FR3**: The editor will include common features like auto-indentation, error highlighting, and code suggestions (optional).
- **FR4**: Users can submit their code for execution.

#### 4.2. Problem Statement
- **FR5**: The platform will display a problem statement that includes the problem description, input/output format, and constraints.
- **FR6**: The problem statement will allow the user to understand the requirements and solve the problem using the editor.

#### 4.3. Test Case Execution
- **FR7**: Once the user submits the code, it will be executed against a set of predefined test cases.
- **FR8**: Test cases will be visualized as players in a game.
- **FR9**: The movement of the player will be linked to the execution speed of the test case.
  - Players that move faster will indicate that the test case is running faster.
  - Slower players will indicate a delay in the test case execution.
- **FR10**: If a test case fails (returns incorrect output), the corresponding player will be "shot" or eliminated, as in the **"Red Light, Green Light"** game from the famous web series *Squid Game*.
- **FR11**: If a test case exceeds the time limit, the corresponding player will be eliminated without reaching the end.

#### 4.4. Visual Interface
- **FR12**: The platform will provide a Squid Game-inspired interface, where players (test cases) move through a game-like environment.
- **FR13**: The game environment will feature obstacles, checkpoints, and different paths based on the progress of the test case.
- **FR14**: Visual elements should represent the state of each test case (e.g., green for success, red for failure, time limits visualized by obstacles).
- **FR15**: The user should be able to view the result of each test case execution, including whether it passed or failed.

#### 4.5. Game Mechanics
- **FR16**: The game will include a countdown timer that indicates how long each test case has to complete.
- **FR17**: The player’s movement speed will correspond to the execution time of the test case.
- **FR18**: Test case failure will trigger a visual consequence (e.g., player gets shot).
- **FR19**: Test cases that exceed the time limit will cause players to disappear before reaching the finish line.

### 5. Non-Functional Requirements

#### 5.1. Performance
- **NFR1**: The system should be able to handle up to 500 concurrent users writing and executing code simultaneously without significant performance degradation.
- **NFR2**: The code execution should be completed in a reasonable amount of time (e.g., under 30 seconds for most test cases).

#### 5.2. Usability
- **NFR3**: The platform should be user-friendly, with intuitive navigation and a clear interface for writing code and interacting with test cases.
- **NFR4**: The test case execution visualizations should be easy to follow, even for users who are not familiar with the Squid Game concept.

#### 5.3. Compatibility
- **NFR5**: The platform should be accessible from modern web browsers (Chrome, Firefox, Safari).
- **NFR6**: The platform should be responsive and work well on both desktop and mobile devices.

#### 5.4. Security
- **NFR7**: The platform should ensure that user data (e.g., code) is kept secure and not exposed to unauthorized users. However, no personal user data will be handled since there is no login/signup system.

#### 5.5. Scalability
- **NFR8**: The system should be designed to scale efficiently as the number of users grows, especially during peak times when many users are submitting and running their code.

### 6. Assumptions

- The user authentication and login mechanisms will be handled separately by another team.
- The platform will support predefined problem statements and test cases, which will be managed externally.
- The test case results will be processed in the backend (via a code execution engine) and will send real-time results to the frontend for visualization.

### 7. Constraints

- **C1**: The platform will use predefined test cases for the problems.
- **C2**: The test case execution will be limited to a specific set of languages (Python, Java, C++, JavaScript, and Go).
- **C3**: There will be no user persistence (e.g., no saving code or progress) since no login/sign-in is implemented.

### 8. System Architecture

The platform will consist of the following components:
1. **Frontend**: A web-based code editor and game-like interface, implemented using JavaScript frameworks (e.g., React.js or Vue.js).
2. **Backend**: A server that handles code execution (via containers or a sandbox), test case processing, and sends real-time data to the frontend. This can be built with technologies such as Node.js, Python (Flask/Django), or similar.
3. **Code Execution Engine**: A sandboxed environment where code is executed securely and test cases are evaluated.
4. **Database (Optional)**: If needed, an external database can be used to store problem statements and test case information.

### 9. Glossary
- **Test Case**: A predefined set of inputs and expected outputs used to validate the correctness of the user’s code.
- **Squid Game Interface**: A visual game-like interface inspired by the *Squid Game*, where test cases are represented as players moving through a track.
- **Execution Speed**: The speed at which a test case is executed, visually represented by the movement of the player.