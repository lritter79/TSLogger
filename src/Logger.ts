import fs from "fs";
import { ConsoleStyle, LogType, LogReturnType, FilePath } from "./types";
import { textStyles } from "./textStyles";

// Initializing LoggerOptions object with default values
let LoggerOptions = {
  delimeter: ",",
  spaceKey: " ",
};

// Exporting Logger class as the default export
class Logger {
  private constructor() {}

  // Object to store log file paths
  private static _paths: {
    general: FilePath;
    error: FilePath;
  } = {
    general: {
      dir: "logs/",
      fileName: "general",
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

  private static generateLogMessage = (msg: string): string => {
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
    let returnCode: LogReturnType = "SUCCESS_LOG";
    // Creating a formatted log message with timestamp, message, and a newline character
    const logMsg = this.generateLogMessage(msg);

    // Assigning styles based on options or default styles
    const headerStyle =
        options?.style || textStyles.BgGreen + textStyles.FgBlack,
      gneralStyle = options?.style || textStyles.FgCyan;

    // Creating formatted header and general text with respective styles
    const headerText = headerStyle + msg + textStyles.Reset,
      generalText = gneralStyle + msg + textStyles.Reset;

    switch (type) {
      case "ERROR":
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
          returnCode = "ERROR_LOG";
        } catch (err) {
          console.error(err);
          returnCode = "FILE_WRITE_ERROR";
        }
        break;

      default:
        const generalLogPath = this.generatePath(this._paths.general),
          generalLogDir = this._paths.general.dir;

        // Appending the log message to the general log file
        if (fs.existsSync(generalLogDir))
          fs.appendFileSync(generalLogPath, logMsg);
        else {
          fs.mkdirSync(this._paths.general.dir);
          fs.appendFileSync(generalLogPath, logMsg);
        }
        // Determining the console output based on the log type and printing it to the console
        const consoleOutput = type === "GENERAL" ? generalText : headerText;
        console.log(consoleOutput);
    }

    return returnCode;
  }

  // Setter for updating the log file paths
  public static set paths(paths: { general?: FilePath; error?: FilePath }) {
    // If the general log file path is provided, update the general path
    if (paths.general !== undefined) this._paths.general = paths.general;
    // If the general log file path is provided, update the general path
    if (paths.error !== undefined) this._paths.error = paths.error;
  }

  // Getter for accessing the log file paths
  public static get paths() {
    return this._paths;
  }
}

export { Logger };
