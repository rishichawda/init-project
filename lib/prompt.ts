import { Answers, QuestionCollection } from "inquirer";

export const options: QuestionCollection = [
  {
    type: "list",
    name: "type",
    message: "Specify the type of project.",
    choices: ["frontend", "backend", "cli"],
  },
  {
    type: "list",
    name: "frontend",
    message: "Specify the type of project.",
    choices: ["react", "gatsby"],
    when: (answers: Answers) => answers.type === "frontend",
  },
  {
    type: "list",
    name: "backend",
    message: "Specify the type of project.",
    choices: ["node"],
    when: (answers: Answers) => answers.type === "backend",
  },
  {
    type: "list",
    name: "mw",
    message: "Which middleware would you like to use for this project?",
    choices: ["express", "koa"],
    when: (answers: Answers) => answers.backend === "node",
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
