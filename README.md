# MOTAC Frontend

Frontend for the MOTAC project.

## Documentation

Full documentation can be found [here](#).


## 🚀 Features

- **Next.js** - The React Framework for production.
- **React 18** - A JavaScript library for building user interfaces.
- **TypeScript** - Typed JavaScript at Any Scale.
- **Tailwind CSS** - A utility-first CSS framework for rapidly building custom user interfaces.
- **Prettier** - An opinionated code formatter.
- **ESLint** - A tool for identifying and fixing problems in JavaScript and TypeScript code.
- **Husky** - Git hooks made easy.
- **Lint-Staged** - Run linters on git staged files.
- **React Icons** - Popular icons in React.
- **Commitlint** - Lint commit messages.

## 🛠️ Development

### Running the project

```bash
npm run dev
```

This will start the development server on `http://localhost:3000`.

### Building the project

```bash
npm run build
```

This will build the production-ready version of your project.

### Starting the production server

```bash
npm run start
```

This will start the production server.

### Linting

```bash
npm run lint
```

Runs ESLint to check for linting issues in the project.

### Formatting

```bash
npm run format
```

Runs Prettier to format the code according to the defined style.

### Type Checking

```bash
npm run check-types
```

Runs TypeScript compiler to check types without emitting any files.

### Fix Linting Issues

```bash
npm run lint:fix
```

Automatically fixes linting issues using ESLint.

### Run All Checks

```bash
npm run test-all
```

Runs Prettier check, ESLint check, TypeScript type checking, and then builds the project.

## 🛠️ Tools and Libraries

- **ESLint Plugins:**
  - `eslint-plugin-import` - Import/export linting.
  - `eslint-plugin-jsx-a11y` - Accessibility linting for JSX.
  - `eslint-plugin-react` - Linting for React.
  - `eslint-plugin-react-hooks` - Linting for React hooks.
  - `eslint-plugin-prettier` - Integrates Prettier with ESLint.
  - `eslint-plugin-no-relative-import-paths` - Enforces absolute import paths.

- **Husky** - Git hooks for better commit and code management.
- **Lint-Staged** - Runs linters on staged git files to ensure code quality before commits.
- **Prettier** - Code formatter ensuring a consistent style.
- **TypeScript** - Provides static types to JavaScript for safer and more predictable code.
- **Tailwind CSS** - A utility-first CSS framework to style the application.

## 📦 Installation

To install the dependencies:

```bash
npm install
```

## 🐳 Docker

You can also run the project using Docker:

```bash
docker build -t cms-frontend .
docker run -p 3000:3000 cms-frontend
```

## 📄 License

This project is licensed under the MIT License.

---
