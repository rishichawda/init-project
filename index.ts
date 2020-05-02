#!/usr/bin/env node

import * as inquirer from "inquirer";
import errors from "./utils/errors";
import process from "./lib/process";
import { options } from "./lib/prompt";

const init = () => {
  inquirer.prompt(options).then(process).catch(errors);
};

init()
