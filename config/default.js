export function getSettings() {
  if (typeof window !== "undefined" && typeof window.nodeEnvSettings !== "undefined") {
    // Needed in browser run context
    return window.nodeEnvSettings;
  }
  // This enables reading the environment variables from a .env file,
  // useful in a local development context.
  require("dotenv").config();
  // process.env is eeded in server run context and with jest tests
  return process.env;
}
