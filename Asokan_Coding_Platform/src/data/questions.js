export const questions = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    sampleTestCases: [
      { input: "[2,7,11,15], 9", output: "[0,1]" },
      { input: "[3,2,4], 6", output: "[1,2]" }
    ],
    hiddenTestCases: 10
  },
  {
    id: 2,
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: "Input: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.",
    sampleTestCases: [
      { input: "121", output: "true" },
      { input: "-121", output: "false" }
    ],
    hiddenTestCases: 15
  },
  {
    id: 3,
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: "Input: s = '()'\nOutput: true",
    sampleTestCases: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" }
    ],
    hiddenTestCases: 18
  }
];