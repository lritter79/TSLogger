import fs from "fs";
import {
  ConsoleStyle,
  LogType,
  LogFormat,
  LogReturnType,
  textStyles,
  FilePath,
} from "./index.d";

// Initializing LoggerOptions object with default values
let LoggerOptions = {
  delimeter: ",",
  spaceKey: " ",
};

// Exporting Logger class as the default export
export default class Logger {
  private constructor() {}

  // Object to store log file paths
  private static _paths: {
    main: FilePath;
    error: FilePath;
  } = {
    main: {
      dir: "logs/",
      fileName: "main",
      fileExt: ".log",
    },
    error: {
      dir: "logs/",
      fileName: "error",
      fileExt: ".log",
    },
  };
  private static generatePath = (fileInfo: FilePath): string => {
    return fileInfo.dir.concat(fileInfo.fileName).concat(fileInfo.fileExt);
  };

  private static generateLogMessage = (msg: string) => {
    return (
      new Date().toISOString() +
      LoggerOptions.delimeter +
      msg +
      LoggerOptions.delimeter +
      textStyles.NewLine
    );
  };

  // Function to print log messages
  public static print(
    msg: string,
    type: LogType,
    options?: { style?: ConsoleStyle }
  ): LogReturnType {
    let returnCode = "SUCCESS_LOG" as LogReturnType;
    // Creating a formatted log message with timestamp, message, and a newline character
    const logMsg = this.generateLogMessage(msg);

    // Assigning styles based on options or default styles
    const headerStyle =
        options?.style || textStyles.BgGreen + textStyles.FgBlack,
      mainStyle = options?.style || textStyles.FgCyan;

    // Creating formatted header and main text with respective styles
    const headerText = headerStyle + msg + textStyles.Reset,
      mainText = mainStyle + msg + textStyles.Reset;

    switch (type) {
      case "error":
        try {
          const errorLogPath = this.generatePath(this._paths.error);
          // Appending the log message to the error log file
          fs.appendFileSync(errorLogPath, logMsg);
          // Printing the error message to the console with the specified style or default style
          console.error(
            (options?.style || textStyles.BgRed + textStyles.FgBlack) +
              msg +
              textStyles.Reset
          );
          returnCode = "ERROR_LOG" as LogReturnType;
        } catch (err) {
          console.error(err);
          returnCode = "FILE_WRITE_ERROR" as LogReturnType;
        }
        break;

      default:
        const mainLogPath = this.generatePath(this._paths.main),
          mainLogDir = this._paths.main.dir;

        // Appending the log message to the main log file
        if (fs.existsSync(mainLogDir)) fs.appendFileSync(mainLogPath, logMsg);
        else {
          fs.mkdirSync(this._paths.main.dir);
          fs.appendFileSync(mainLogPath, logMsg);
        }
        // Determining the console output based on the log type and printing it to the console
        const consoleOutput = type === "main" ? mainText : headerText;
        console.log(consoleOutput);
    }

    return returnCode;
  }

  // Setter for updating the log file paths
  public static set paths(paths: { main?: FilePath; error?: FilePath }) {
    // If the main log file path is provided, update the main path
    if (paths.main !== undefined) this._paths.main = paths.main;
    // If the main log file path is provided, update the main path
    if (paths.error !== undefined) this._paths.error = paths.error;
  }

  // Getter for accessing the log file paths
  public static get paths() {
    return this._paths;
  }
}
