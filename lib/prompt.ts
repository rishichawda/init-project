import { Answers, QuestionCollection } from "inquirer";

export const options: QuestionCollection = [
  {
    type: "list",
    name: "type",
    message: "Specify the type of project.",
    choices: [
      { name: "Client-side / Frontend", value: "client" },
      { name: "Server-side / Backend", value: "server" },
      { name: "Command Line Interface tool", value: "cli" },
    ],
  },
  {
    type: "list",
    name: "client",
    message: "Specify the type of project.",
    choices: [
      { name: "React", value: "react" },
      { name: "Gatsby", value: "gatsby" },
    ],
    when: (answers: Answers) => answers.type === "client",
  },
  {
    type: "list",
    name: "server",
    message: "Specify the type of project.",
    choices: [{ name: "Node", value: "node" }],
    when: (answers: Answers) => answers.type === "server",
  },
  {
    type: "list",
    name: "mw",
    message: "Which middleware would you like to use for this project?",
    choices: [
      { name: "Express", value: "express" },
      { name: "Koa", value: "koa" },
    ],
    when: (answers: Answers) => answers.server === "node",
  },
  {
    type: "input",
    name: "name",
    message: "What should I name your project?",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
];

export const setupOptions = [
  {
    type: "list",
    name: "packager",
    message: "Which package manager do you want to use?",
    choices: [
      { name: "NPM", value: "npm" },
      { name: "Yarn", value: "yarn" },
    ],
  },
];
