/**
 * backendExample.js
 *
 * Demonstrates usage of the CryptoUtil module in a Node/React backend environment.
 *
 * To run:
 *   1. Make sure CryptoUtil.js is in the same directory.
 *   2. Run `node backendExample.js` in your terminal.
 */

const { encrypt, decrypt } = require('./CryptoUtil');

const plaintext = "HelloWorld";
const secretKey = "mySecretKey";

console.log("Plaintext:", plaintext);
console.log("Secret Key:", secretKey);

const encrypted = encrypt(plaintext, secretKey);
console.log("Encrypted Text:", encrypted);

const decrypted = decrypt(encrypted, secretKey);
console.log("Decrypted Text:", decrypted);
