# Project Requirements

-   `pnpm`
-   `node v20`

## Setup Steps

1. Ensure you have pnpm installed `npm -g i pnpm`
2. Ensure you have Node v20.0.0 or later installed `nvm install 20`
3. Generate an RSA private key `openssl genrsa -out private_key.pem`
    1. Ensure that you copy this value into the `.env` of the server.
4. Generate a matching RSA public key `openssl rsa -in private_key.pem -pubout -out public_key.pem`
    1. Ensure that you copy this value into the `.env` of the client.
5. Run `./main.py` in the directory of the server.
6. Run `pnpm run dev` in the directory of the client.
7. Open in browser.