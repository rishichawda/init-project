import { spawnSync } from "child_process";
import { Answers } from "inquirer";
import path from "path";
import Logger from "../utils/logger";
import exec from "./exec";

const gitUrls = require("../resources/git-url.json");

export default (choice: Answers) =>
new Promise((resolve, reject) => {
    const logger = new Logger({});
    const setup = choice.type;
    const main = [choice[setup]];
    if (choice.mw) {
      main.push(choice.mw);
    }
    const repoName = main.join("/");
    const repoUrl = gitUrls[repoName];
    if (!repoUrl) {
      logger.log("Couldn't find any boilerplate!", "error");
    } else {
      logger.log("Processing request..");
      logger.spinner.stop();
      exec("git", ["clone", repoUrl, choice.name], {
        stdio: "inherit",
      })
        .then(() => {
          logger.log("Successfully initialized boilerplate.", "success");
          resolve();
        })
        .catch((errorCode) => {
          logger.log(
            `Error setting up boilerplate. Process exited with code: ${errorCode}`,
            "error"
          );
          reject("couldn't fetch files from remote.");
        });
    }
  });

export const setupDependencies = (choice: Answers, projectDirName: string) => {
  const logger = new Logger({});
  logger.log(JSON.stringify(choice), "info");
  logger.log("Installing dependencies..", "info");
  const commandArgs = [];
  if (choice.packager === "npm") {
    commandArgs.push("install");
    spawnSync("rm", ["yarn.lock"], {
      cwd: path.join(process.cwd(), projectDirName),
    });
  }
  logger.spinner.stop();
  exec(choice.packager, commandArgs, {
    cwd: path.join(process.cwd(), projectDirName),
    stdio: "inherit",
  })
  .then(() => {
      logger.log("Successfully installed all dependencies", "success");
    })
    .catch((errorCode) => {
      logger.log(
        `Error installing dependencies. Process exited with code: ${errorCode}`,
        "error"
      );
    });
};
