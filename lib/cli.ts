import * as inquirer from "inquirer";
import errors from "../utils/errors";
import processChoices, { setupDependencies } from "./process";
import * as prompt from "./prompt";

export const init = () => {
  inquirer
    .prompt(prompt.options)
    .then((choices) => {
      processChoices(choices).then(() => {
        inquirer
          .prompt(prompt.setupOptions)
          .then((setup) => {
            setupDependencies(setup, choices.name)
          })
          .catch(errors);
      }).catch(errors)
    })
    .catch(errors);
};

export const setCleanup = () => {
  const cleanExit = function () { process.exit() };
  process.on('SIGINT', cleanExit); 
  process.on('SIGTERM', cleanExit);
}
