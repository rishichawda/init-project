import ora, { Options, Ora } from "ora";
import chalk from "chalk";

interface ColorsMap {
  [x: string]: string;
}

interface Logger {
  spinner: Ora;
  format: () => string;
  type: string;
  text: string;
  log: (text: string, type?: string) => void;
  colors: ColorsMap;
  getColorForType: (type: string) => string;
}

class Logger {
  constructor(options: Options | string) {
    this.spinner = ora(options).start();
    this.text = "";
    this.type = "info";
    this.colors = {
      error: `bold.redBright`,
      info: `yellowBright`,
    };
  }

  getColorForType = (type: string | 'success') => {
    if (!type) {
      return ''
    }
    return this.colors[type]
  }

  format = () => {
    const colors = this.getColorForType(this.type) || ''
    if(!colors) return this.text
    return chalk`{${colors} ${this.text}}`;
  };

  log = (text: string, type?: string) => {
    this.text = text;
    this.type = type || 'info';
    switch (this.type) {
      case 'info':
        this.spinner.info(this.format())
        break
      case 'error':
        this.spinner.fail(this.format())
        break
      case 'success':
        this.spinner.succeed(this.format())
        break
      default:
        throw new Error('Error in logger: Incorrect type')
    }
  };
}

export default Logger