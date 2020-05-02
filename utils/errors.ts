import Logger from "./logger";

interface InquirerError extends Error {
  isTtyError: Boolean;
}


const errors = (error: InquirerError) => {
  const logger = new Logger('')
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    logger.log('Couldn\'t perform operation.', 'error')
  } else {
    // Something else when wrong
    throw error;
  }
};

export default errors