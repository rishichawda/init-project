import { spawn } from "child_process";
import { Answers } from "inquirer";
import Logger from "../utils/logger";

const gitUrls = require("../resources/git-url.json");

export default (choice: Answers) => {
  const setup = choice.type;
  const main = [choice[setup]];
  if (choice.mw) {
    main.push(choice.mw);
  }
  const repoName = main.join("/");
  const repoUrl = gitUrls[repoName];
  const logger = new Logger({});
  if (!repoUrl) {
    logger.log("Couldn't find any boilerplate!", "error")
  } else {
    logger.log("Processing request..")
    try {
      const clone = spawn("git", ["clone", repoUrl, choice.name], {
        stdio: "inherit",
      });
      clone.on("error", (error: Error) => {
        logger.log(error.message, "error")
      });
      clone.on("close", (code: number) => {
        if (!code) {
          logger.log("Successfully initialized boilerplate.", "success")
        } else {
          logger.log(`Error setting up boilerplate. Process exited with code: ${code}`, 'error')
        }
      });
    } catch (err) {
      logger.log(err.message, "error")
    }
  }
};
