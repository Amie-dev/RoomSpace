// Simple custom logger utility for Node.js projects
// Provides colored, timestamped log messages with emojis for status

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

function timestamp() {
  return new Date().toISOString();
}

const logger = {
  info: (msg) => {
    console.log(
      `${COLORS.fgCyan}[INFO]${COLORS.reset} ${COLORS.dim}${timestamp()}${COLORS.reset} ${msg}`,
    );
  },
  success: (msg) => {
    console.log(
      `${COLORS.fgGreen}✅ [SUCCESS]${COLORS.reset} ${COLORS.dim}${timestamp()}${COLORS.reset} ${msg}`,
    );
  },
  error: (msg) => {
    console.error(
      `${COLORS.fgRed}❌ [ERROR]${COLORS.reset} ${COLORS.dim}${timestamp()}${COLORS.reset} ${msg}`,
    );
  },
  warn: (msg) => {
    console.warn(
      `${COLORS.fgYellow}⚠️ [WARN]${COLORS.reset} ${COLORS.dim}${timestamp()}${COLORS.reset} ${msg}`,
    );
  },
  debug: (msg) => {
    console.debug(
      `${COLORS.fgMagenta}[DEBUG]${COLORS.reset} ${COLORS.dim}${timestamp()}${COLORS.reset} ${msg}`,
    );
  },
};

export default logger;
