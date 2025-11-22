import { z } from 'zod';
import { readFile } from 'fs/promises';
import { UnifiedTool } from './registry.js';
import { executeCommand } from '../utils/commandExecutor.js';
import { CLI } from '../constants.js';

// Read version from package.json
const getVersion = async () => {
  try {
    const packageJson = await readFile(new URL('../../package.json', import.meta.url), 'utf8');
    return JSON.parse(packageJson).version;
  } catch {
    return 'unknown';
  }
};

// Ping tool for testing MCP connection
const pingArgsSchema = z.object({
  message: z.string().default("").describe("Optional message to echo back"),
});

export const pingTool: UnifiedTool = {
  name: "ping",
  description: "Test MCP connection and server responsiveness",
  zodSchema: pingArgsSchema,
  prompt: {
    description: "Test the MCP server connection",
  },
  category: 'utility',
  execute: async (args) => {
    const { message } = args;
    const timestamp = new Date().toISOString();
    
    if (message) {
      return `🏓 Pong! "${message}" (${timestamp})`;
    }
    
    return `🏓 Pong! Codex MCP server is running (${timestamp})`;
  }
};

// Help tool
const helpArgsSchema = z.object({});

export const helpTool: UnifiedTool = {
  name: "help",
  description: "Get information about available Codex MCP tools and usage",
  zodSchema: helpArgsSchema,
  prompt: {
    description: "Show help information for Codex MCP tools",
  },
  category: 'utility',
  execute: async () => {
    return `# Codex CLI MCP Server Help

## Available Tools

### ask-codex
Execute OpenAI Codex with comprehensive parameter support.
- **prompt** (required): Your query or instruction
- **model** (optional): gpt-5, o3, o3-mini, oss
- **sandbox** (optional): read-only, workspace-write, danger-full-access
- **approval** (optional): untrusted, on-failure, on-request, never
- **image** (optional): Image file path(s) to include
- **config** (optional): Configuration overrides
- **timeout** (optional): Maximum execution time (default: 120s)

### exec-codex
Non-interactive Codex execution for automation.
- **prompt** (required): Command or instruction
- **model** (optional): Model to use
- **sandbox** (optional): Sandbox mode

### apply-diff
Apply latest Codex-generated diff to git repository.
- **dryRun** (optional): Preview changes without applying
- **validate** (optional): Validate before applying

### ping
Test MCP server connection.
- **message** (optional): Message to echo

## Configuration

Set environment variables:
- \`OPENAI_API_KEY\`: Your OpenAI API key
- \`CODEX_MODEL\`: Default model (gpt-5, o3, etc.)
- \`CODEX_SANDBOX_MODE\`: Default sandbox mode

Or configure via \`~/.codex/config.toml\`

## Examples

\`\`\`
ask-codex "Explain this code: @main.py"
ask-codex "Fix the bug in login function" sandbox="workspace-write"
ask-codex "Generate unit tests" model="o3" approval="on-request"
\`\`\`

For more information, visit: https://github.com/openai/codex`;
  }
};

// Version tool
const versionArgsSchema = z.object({});

export const versionTool: UnifiedTool = {
  name: "version",
  description: "Get version information for Codex CLI and MCP server",
  zodSchema: versionArgsSchema,
  category: 'utility',
  execute: async () => {
    try {
      // Get versions
      const [codexVersion, mcpVersion] = await Promise.all([
        executeCommand(CLI.COMMANDS.CODEX, [CLI.FLAGS.VERSION]),
        getVersion()
      ]);

      return `# Version Information

## Codex CLI
\`\`\`
${codexVersion}
\`\`\`

## Codex MCP Server
- Version: ${mcpVersion}
- MCP SDK: @modelcontextprotocol/sdk ^0.5.0
- Node.js: ${process.version}
- Platform: ${process.platform}`;
    } catch (error) {
      const mcpVersion = await getVersion();
      return `# Version Information

## Codex MCP Server
- Version: ${mcpVersion}
- MCP SDK: @modelcontextprotocol/sdk ^0.5.0
- Node.js: ${process.version}
- Platform: ${process.platform}

## Codex CLI
❌ Error getting Codex CLI version: ${error instanceof Error ? error.message : 'Unknown error'}

Please ensure Codex CLI is installed:
\`\`\`bash
npm install -g @openai/codex
\`\`\``;
    }
  }
};