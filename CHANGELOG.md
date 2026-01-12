# Changelog

All notable changes to the Codex CLI MCP project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Upgraded @modelcontextprotocol/sdk to 1.25.2
- Upgraded zod to 4.3.5
- Upgraded vitest to 4.0.16
- Upgraded @types/node to 25.0.6
- Raised minimum Node.js version to >=20.19.0

### Removed
- Removed zod-to-json-schema in favor of zod v4 native JSON Schema support

## [1.0.0] - 2025-08-19

### Added
- Initial release of Codex CLI MCP server
- Complete MCP (Model Context Protocol) integration
- Support for all OpenAI Codex models (gpt-5, o3, o3-mini, oss)
- Comprehensive sandbox modes (read-only, workspace-write, danger-full-access)
- Approval policies for safe command execution
- Progress notifications for long-running operations
- Git integration with apply-diff functionality
- Configuration management via environment variables and config files
- Error handling with helpful diagnostics and recovery suggestions
- Six core tools:
  - `ask-codex`: Main Codex interaction with full parameter support
  - `exec-codex`: Non-interactive execution for automation
  - `apply-diff`: Apply Codex-generated git diffs
  - `ping`: MCP connection testing
  - `help`: Comprehensive help and documentation
  - `version`: Version and system information
- Comprehensive TypeScript implementation with type safety
- Structured logging and debugging capabilities
- Timeout management to prevent MCP disconnections
- Multi-modal support (text and image inputs)
- Fallback strategies for model and sandbox failures

### Technical Features
- Built with @modelcontextprotocol/sdk v0.5.0
- Zod schema validation for all tool parameters
- Unified tool registry system for extensibility
- Cross-platform support (macOS, Linux, Windows/WSL)
- Comprehensive error handling and user-friendly messages
- Progress callbacks for real-time operation updates
- Support for Codex CLI configuration profiles

### Documentation
- Complete README with examples and troubleshooting
- Detailed implementation context and architecture documentation
- API documentation for all tools and parameters
- Configuration guides for various deployment scenarios
