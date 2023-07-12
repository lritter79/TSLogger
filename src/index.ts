// import fs from "fs";
// import { ConsoleStyle, LogType, LogFormat } from "./index.d";

// export const textStyles = {
//   Reset: <ConsoleStyle>"\x1b[0m",
//   Bright: <ConsoleStyle>"\x1b[1m",
//   Dim: <ConsoleStyle>"\x1b[2m",
//   Underscore: <ConsoleStyle>"\x1b[4m",
//   Blink: <ConsoleStyle>"\x1b[5m",
//   Reverse: <ConsoleStyle>"\x1b[7m",
//   Hidden: <ConsoleStyle>"\x1b[8m",
//   NewLine: <ConsoleStyle>"\n",

//   FgBlack: <ConsoleStyle>"\x1b[30m",
//   FgRed: <ConsoleStyle>"\x1b[31m",
//   FgGreen: <ConsoleStyle>"\x1b[32m",
//   FgYellow: <ConsoleStyle>"\x1b[33m",
//   FgBlue: <ConsoleStyle>"\x1b[34m",
//   FgMagenta: <ConsoleStyle>"\x1b[35m",
//   FgCyan: <ConsoleStyle>"\x1b[36m",
//   FgWhite: <ConsoleStyle>"\x1b[37m",
//   FgGray: <ConsoleStyle>"\x1b[90m",

//   BgBlack: <ConsoleStyle>"\x1b[40m",
//   BgRed: <ConsoleStyle>"\x1b[41m",
//   BgGreen: <ConsoleStyle>"\x1b[42m",
//   BgYellow: <ConsoleStyle>"\x1b[43m",
//   BgBlue: <ConsoleStyle>"\x1b[44m",
//   BgMagenta: <ConsoleStyle>"\x1b[45m",
//   BgCyan: <ConsoleStyle>"\x1b[46m",
//   BgWhite: <ConsoleStyle>"\x1b[47m",
//   BgGray: <ConsoleStyle>"\x1b[100m",
// };

// // Initializing LoggerOptions object with default values
// let LoggerOptions = {
//   delimeter: ",",
//   spaceKey: " ",
// };

// // Exporting Logger class as the default export
// export default class Logger {
//   private constructor() {}

//   // Object to store log file paths
//   private static _paths: {
//     main: string;
//     error: string;
//   } = {
//     main: LogType.MAIN.concat(LogFormat.LOG),
//     error: LogType.ERROR.concat(LogFormat.LOG),
//   };

//   // Function to print log messages
//   public static print(
//     msg: string,
//     type: LogType,
//     options?: { style?: ConsoleStyle }
//   ) {
//     // Creating a formatted log message with timestamp, message, and a newline character
//     const logMsg =
//       new Date().toISOString() +
//       LoggerOptions.delimeter +
//       msg +
//       LoggerOptions.delimeter +
//       textStyles.NewLine;

//     // Assigning styles based on options or default styles
//     const headerStyle =
//         options?.style || textStyles.BgGreen + textStyles.FgBlack,
//       mainStyle = options?.style || textStyles.FgCyan;

//     // Creating formatted header and main text with respective styles
//     const headerText = headerStyle + msg + textStyles.Reset,
//       mainText = mainStyle + msg + textStyles.Reset;

//     switch (type) {
//       case LogType.ERROR:
//         // Appending the log message to the error log file
//         fs.appendFileSync(this._paths.error, logMsg);
//         // Printing the error message to the console with the specified style or default style
//         console.error(
//           (options?.style || textStyles.BgRed + textStyles.FgBlack) +
//             msg +
//             textStyles.Reset
//         );
//         break;

//       default:
//         // Appending the log message to the main log file
//         fs.appendFileSync(this._paths.main, logMsg);
//         // Determining the console output based on the log type and printing it to the console
//         const consoleOutput = type === LogType.MAIN ? mainText : headerText;
//         console.log(consoleOutput);
//     }
//   }

//   // Setter for updating the log file paths
//   public static set paths(pathes: { main?: string; error?: string }) {
//     // If the main log file path is provided, update the main path; otherwise, use default path
//     this._paths.main =
//       pathes.main !== undefined
//         ? pathes.main
//         : LogType.MAIN.concat(LogFormat.LOG);

//     // If the error log file path is provided, update the error path; otherwise, use default path
//     this._paths.error =
//       pathes.error !== undefined
//         ? pathes.error
//         : LogType.ERROR.concat(LogFormat.LOG);
//   }

//   // Getter for accessing the log file paths
//   public static get paths() {
//     return this._paths;
//   }
// }
