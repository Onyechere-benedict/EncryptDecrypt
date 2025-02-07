/**
 * CryptoUtil.js
 *
 * Provides encryption and decryption functions using a custom algorithm.
 * The algorithm encrypts data by adding the character code of each plaintext character
 * with the corresponding (cyclic) character code from the secret key.
 * The resulting code is then converted to a 2-digit hexadecimal string.
 *
 * Usage:
 *   const { encrypt, decrypt } = require('./CryptoUtil');
 *   const encryptedText = encrypt("HelloWorld", "mySecretKey");
 *   const decryptedText = decrypt(encryptedText, "mySecretKey");
 *
 * Example:
 *   Plaintext: "HelloWorld"
 *   Secret Key: "mySecretKey"
 *   Encrypted: (a hex string, e.g., "d3a1f0…")
 *   Decrypted: "HelloWorld"
 *
 * Note: The algorithm is case sensitive.
 */

export function encrypt(plaintext, key) {
	if (!plaintext || !key) {
		throw new Error("Plaintext and key must be provided.");
	}
	let encrypted = "";
	// Iterate through each character of the plaintext
	for (let i = 0; i < plaintext.length; i++) {
		const charCode = plaintext.charCodeAt(i);
		const keyCode = key.charCodeAt(i % key.length);
		// Custom encryption: add the key's char code and wrap around using modulo 256
		const encryptedCode = (charCode + keyCode) % 256;
		// Convert to 2-digit hexadecimal string
		let hex = encryptedCode.toString(16);
		if (hex.length < 2) {
			hex = "0" + hex;
		}
		encrypted += hex;
	}
	return encrypted;
}

export function decrypt(encrypted, key) {
	if (!encrypted || !key) {
		throw new Error("Encrypted text and key must be provided.");
	}
	if (encrypted.length % 2 !== 0) {
		throw new Error("Invalid encrypted text length.");
	}
	let decrypted = "";
	// Process the hex string two characters at a time
	for (let i = 0; i < encrypted.length; i += 2) {
		const hex = encrypted.substr(i, 2);
		const encryptedCode = parseInt(hex, 16);
		const keyCode = key.charCodeAt((i / 2) % key.length);
		// Reverse the encryption process
		const charCode = (encryptedCode - keyCode + 256) % 256;
		decrypted += String.fromCharCode(charCode);
	}
	return decrypted;
}

// Export for Node.js environments or attach to window for browser usage.
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = { encrypt, decrypt };
} else {
	window.CryptoUtil = { encrypt, decrypt };
}
