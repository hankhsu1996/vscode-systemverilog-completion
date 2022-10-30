# Change Log

All notable changes to the SystemVerilog Completion extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2022-10-29

### Added

-   The completion is now context-aware. For example, when you are closing a module, the extension will only suggest `endmodule` keyword.

## [0.0.2] - 2022-05-27

### Added

-   Bundle the extension with webpack.

## [0.0.1] - 2022-05-27

### Added

-   Keywords completion.
-   System tasks and system functions completion.
-   Timing checks completion.
-   Compiler directives completion.
-   All the completion providers are configurable to be enabled or disabled.
-   Add a word pattern to `language-configuration.json` to enable completion for system tasks, system functions, timing checks, and compiler directives that contain special characters.

[0.0.3]: https://github.com/hankhsu1996/systemverilog-completion/releases/tag/v0.0.3
[0.0.2]: https://github.com/hankhsu1996/systemverilog-completion/releases/tag/v0.0.2
[0.0.1]: https://github.com/hankhsu1996/systemverilog-completion/releases/tag/v0.0.1
