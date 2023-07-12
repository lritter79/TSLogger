# TSLogger

TSLogger is a TypeScript library that provides logging functionality with customizable styles and log file management. It allows you to print log messages to the console with various text and background styles, as well as append them to separate log files.

## Installation

To use TSLogger in your TypeScript project, you can install it via npm:

```shell
npm install ts-logger-node
```

## Usage

Import the necessary modules and initialize the LoggerOptions object with default values:

```typescript
import Logger, { LogType } from "ts-logger-node";
```

Print log messages using the `print` method:

```typescript
Logger.print("Hello, world!", LogType.MAIN);
Logger.print("An error occurred.", LogType.ERROR);
```

By default, log messages are appended to the main log file and printed to the console with the specified log type. You can customize the log file paths using the `paths` setter:

```typescript
Logger.paths = {
  main: "./logs/main.log",
  error: "./logs/error.log",
};
```

### Customizing Console Styles

The library provides a set of predefined console styles in the `textStyles` object. You can use these styles to format log messages printed to the console. For example:

```typescript
import Logger, { LogType, textStyles } from "ts-logger-node";

Logger.print("Formatted message", LogType.MAIN, {
  style: textStyles.FgRed + textStyles.BgYellow,
});
```

### Customizing Log File Paths

By default, log messages are appended to the main log file (main.log) and error log file (error.log) in the current working directory. You can specify custom file paths using the `paths` setter:

```typescript
Logger.paths = {
  main: "./logs/main.log",
  error: "./logs/error.log",
};
```

Make sure to provide the full file paths including the desired file names and extensions.

## Console Styles

The `textStyles` object provides various predefined styles that can be used to format log messages printed to the console. These styles include text color, background color, and text effects. You can use them individually or combine them to achieve the desired visual effect. For example:

```typescript
Logger.print("Styled message", LogType.MAIN, {
  style: textStyles.FgGreen + textStyles.BgBlue + textStyles.Bright,
});
```

## Log Types

TSLogger supports three log types: `LogType.ERROR`, `LogType.MAIN`, and `LogType.HEADER`. You can specify the log type when calling the `print` method. The log type determines the log file to which the message will be appended and the console style used for printing. By default, messages with the `LogType.ERROR` are printed in red on a black background.

## License

This project is licensed under the [MIT license](LICENSE).
