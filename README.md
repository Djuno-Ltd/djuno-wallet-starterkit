# Wallet SDK

This repository provides a `wallet_sdk` built with React and utilizes various dependencies like Djuno, Redux Toolkit, and TailwindCSS. It is intended for developers integrating a wallet SDK into their applications.

## Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (v16 or higher)
- A Djuno Access Key (for interacting with Djuno API)

  - Set your Djuno Access Key in an environment variable:

    ```bash
    REACT_APP_DJUNO_WALLET_ACCESS_KEY=your-djuno-access-key
    ```

## 🛠️ Getting Started (Local Development)

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Djuno-Ltd/djuno-wallet-starterkit.git
   cd djuno-wallet-starterkit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the `.env.local` file and add your Djuno Access Key:

   ```bash
   REACT_APP_DJUNO_WALLET_ACCESS_KEY=your-djuno-access-key
   ```

- Get or create a new wallet [access key](https://djuno.io/wallet-api/api-keys) from your Djuno Cloud panel

4. Run the application:

   ```bash
   npm start
   ```

Your application should now be live at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Running with Docker Compose

If you'd like to run the app as a production-ready static site served by Nginx:

1. **Ensure your `.env.local` is set up** as shown above.

2. **Build and run the container:**

```bash
docker compose up --build
```

## Dependencies

This project uses the following dependencies:

- `@djuno/wallet-hook` - Hook for interacting with the Djuno wallet.
- `@djuno/wallet-sdk` - Djuno Wallet SDK for building wallet integrations.

For the full list of dependencies, please refer to the `package.json` file.

## Scripts

The project includes the following npm scripts:

- `start`: Start the development server.

  ```bash
  npm start
  ```

- `build`: Build the project for production.

  ```bash
  npm run build
  ```

- `eject`: Eject from Create React App's configuration (useful if you want to customize the build setup).

  ```bash
  npm run eject
  ```

- `prettier`: Format your code using Prettier.
  ```bash
  npm run prettier
  ```

## Configuration

You can configure your project via the `eslintConfig` and `browserslist` fields in `package.json`:

- **ESLint Configuration**:
  - Uses `react-app` and `react-app/jest` for linting.
- **Browserslist**:
  - Ensures compatibility with the latest browsers in production and development environments.

## Links

- [Djuno Wallet API Documentation](https://docs.djuno.io/en/articles/10108745-wallet-api-reference)
- [Djuno Wallet Hook - README](https://github.com/Djuno-Ltd/djuno-wallet-sdk/blob/main/packages/wallet-hook/README.md)
- [Djuno Wallet SDK - README](https://github.com/Djuno-Ltd/djuno-wallet-sdk/blob/main/packages/wallet-sdk/README.md)

## License

This project is licensed under the MIT License.
