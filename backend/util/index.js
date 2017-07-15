const throwOnErr = (message) => (error) => {
  if (error) {
    console.error(message, error);
    throw error;
  }
};

module.exports = { throwOnErr };
