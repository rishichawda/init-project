import * as inquirer from "inquirer";
import prompt from "../resources/prompt.json";

interface InquirerError extends Error {
  isTtyError: Boolean;
}

const errors = (error: InquirerError) => {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    throw "Operation not supported!";
  } else {
    // Something else when wrong
    throw error;
  }
};

export const init = () => {
  inquirer
    .prompt([prompt["project-type"]])
    .then((project) => {
      if (project["project-type"] === "frontend") {
        inquirer
          .prompt([prompt.choices.frontend])
          .then((choice) => {
            console.log({ choice });
          })
          .catch(errors);
      }
    })
    .catch(errors);
};
