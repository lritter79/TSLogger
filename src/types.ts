export type ConsoleStyle = string;

export type LogType = "ERROR" | "GENERAL" | "HEADER" | "HIDDEN";

export type LogReturnType = "FILE_WRITE_ERROR" | "SUCCESS_LOG" | "ERROR_LOG";

export type LogFormat = ".log" | ".csv";

export type FilePath = {
  dir: string;
  fileName: string;
  fileExt: LogFormat;
};
