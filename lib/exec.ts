import { spawn } from "child_process";
import Logger from "../utils/logger";
import ora from "ora";

const exec = (command: string, args: any[], options: any) =>
  new Promise((resolve, reject) => {
    const logger = new Logger({});
    try {
      logger.spinner.stop();
      const clone = spawn(command, args, options);
      process.on("exit", function () {
        clone.kill();
      });
      clone.on("error", (error: Error) => {
        logger.log(error.message, "error");
        reject()
      });
      clone.on("close", (code: number) => {
        if (!code) {
          resolve();
        } else {
          reject(code);
        }
      });
    } catch (err) {
      logger.log(err.message, "error");
    }
  });

export default exec;
