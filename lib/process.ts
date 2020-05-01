import { spawn } from "child_process";
import { Answers } from "inquirer";
import ora from "ora";

import { format } from "./prompt";
const gitUrls = require("../resources/git-url.json");

export default (choice: Answers) => {
  const setup = choice.type;
  const main = [choice[setup]];
  if (choice.mw) {
    main.push(choice.mw);
  }
  const repoName = main.join("/");
  const repoUrl = gitUrls[repoName];
  const spinner = ora("Processing..").start();
  if (!repoUrl) {
    spinner.fail(format("Couldn't find any boilerplate!", "error"));
  } else {
    spinner.info(format("Processing request", "info"));
    try {
      const clone = spawn('git', ['clone', repoUrl, choice.name], {
        stdio: "inherit",
      });
      clone.on("error", (error: Error) => {
        spinner.fail(format(error.message, "error"));
      });
      clone.on("close", (code: number) => {
        if (!code) {
          spinner.succeed(format("Successfully initialized boilerplate.", "info"));
        }
      });
    } catch (err) {
      spinner.fail(format(err.message, "error"));
    }
  }
};
