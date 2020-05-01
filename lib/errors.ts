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

export default errors