# Nirvana CLI Tool 🚀

A powerful, fully-functional CLI tool built with **Node.js** and **TypeScript**, following **Object-Oriented Programming (OOP)** principles.

## ✨ Features

- **OOP Architecture**: Clean, extensible command-based structure using `BaseCommand` and `CommandRegistry`.
- **API Integrations**: Real-time data from 3 different APIs (GitHub, Weather, Quotes).
- **10+ Custom Commands**: A wide variety of system, utility, and information commands.
- **Rich UI**: Colored output using `chalk` and formatted tables/lines.
- **Robust Error Handling**: Validation and fallback mechanisms for API requests.

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wcr-karan/Nirvana.git
   cd Nirvana
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   # Or manual compilation
   npx tsc
   ```

4. **Link the CLI (Optional)**:
   ```bash
   npm link
   ```

## 📜 Available Commands

| Command | Usage | Description |
|---------|-------|-------------|
| `greet` | `mycli greet <name>` | Greet a person with a custom message |
| `fileinfo` | `mycli fileinfo <file>` | Get detailed information about a file |
| `github` | `mycli github <username>` | Fetch GitHub user statistics (API) |
| `weather` | `mycli weather <city>` | Get current weather conditions (API) |
| `quote` | `mycli quote` | Get a random inspirational quote (API) |
| `sysinfo` | `mycli sysinfo` | Show current system hardware/OS info |
| `ls` | `mycli ls [path]` | List files in a directory with icons |
| `hash` | `mycli hash <text>` | Generate SHA256 hash of a string |
| `random` | `mycli random [min] [max]` | Generate a random number |
| `clear` | `mycli clear` | Clear the terminal screen |
| `version` | `mycli --version` | Show current tool version |
| `help` | `mycli --help` | Show list of all available commands |

## 🏗️ Project Structure

```text
src/
├── core/
│   ├── BaseCommand.ts      # Abstract Base Class
│   └── CommandRegistry.ts  # Registry for Command Pattern
├── commands/               # Command Implementations
│   ├── GreetCommand.ts
│   ├── GitHubCommand.ts
│   └── ...
└── index.ts                # Entry Point
```

## 🤝 Contributing

Feel free to open issues or submit pull requests to enhance the tool!

---
Made with ❤️ by Karan
