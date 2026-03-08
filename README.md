# half-birthday-cli

A modern CLI version of the half-birthday website, built with React and [Ink](https://github.com/vadimdemedes/ink).

This tool calculates your half-birthday using two methods:
- **Traditional:** Exactly six months after your birth date.
- **Accurate (Midpoint):** The exact midpoint of the year, taking the birth time into account.

## Installation

You can run it directly using `npx`:

```bash
npx half-birthday-cli
```

Or install it globally:

```bash
npm install -g half-birthday-cli
half-birthday
```

## Usage

When you run the command, enter your birthday in a standard format (e.g., `YYYY-MM-DD HH:mm`).

```bash
❯ half-birthday
```

## Features

- **Interactive UI:** Built with Ink for a rich terminal experience.
- **Dual Calculations:** Uses `@seancrosby/half-birthday-calc` for reliable logic.
- **Time Support:** Accurate half-birthday calculation uses the time of birth.

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/seancrosby/half-birthday-cli.git
   cd half-birthday-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## License

ISC
