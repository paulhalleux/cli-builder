### CLI

This tools provide wrappers around Yargs to build CLIs.

### Usage

You can create commands using `BaseCommand` type.

```ts
type GreetCommandOptions = {
  name: string;
};

export const GreetCommand: BaseCommand<GreetCommandOptions> = {
  command: "greet",
  describe: "Greet a user",
  positional: {
    name: { type: "string", description: "Name of the user to greet" },
  },
  handler(argv: ArgumentsCamelCase<GreetCommandOptions>): void {
    console.log(`Hello ${argv.name}`);
  },
};
```

This command can be registered using the command manager.

```ts
#!/usr/bin/env node

import { GreetCommand } from "./GreetCommand";

(async () => {
  const manager = new YargsCommandManager("test");
  manager.register(GreetCommand);
  await manager.run();
})();
```

### Register cli

You can now add the cli to the package.json file:

```json
{
  ...
  "bin": {
    "command-name": "dist/cli.js"
  },
  ...
}
```

Finally you can run `npm link` to test to link the command and test it.