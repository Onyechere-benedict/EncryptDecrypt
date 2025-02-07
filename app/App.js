/**
 * App.js
 *
 * A React Native component demonstrating data encryption and decryption using CryptoUtil.
 *
 * Instructions:
 *   1. Place CryptoUtil.js in the same directory (or adjust the import path accordingly).
 *   2. Install React Native and its dependencies.
 *   3. Run the app on your device/emulator using:
 *         react-native run-android
 *      or
 *         react-native run-ios
 */

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
// Import the encryption functions from CryptoUtil.js
import { encrypt, decrypt } from './CryptoUtil';

const App = () => {
    const [plaintext, setPlaintext] = useState('');
    const [key, setKey] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    // Handler to encrypt the input text
    const handleEncrypt = () => {
        try {
            const encrypted = encrypt(plaintext, key);
            setEncryptedText(encrypted);
            // Clear any previous decrypted output
            setDecryptedText('');
        } catch (error) {
            alert("Encryption Error: " + error.message);
        }
    };

    // Handler to decrypt the encrypted text
    const handleDecrypt = () => {
        try {
            const decrypted = decrypt(encryptedText, key);
            setDecryptedText(decrypted);
        } catch (error) {
            alert("Decryption Error: " + error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Data Encryption & Decryption</Text>

                <Text style={styles.label}>Plaintext:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter text to encrypt"
                    value={plaintext}
                    onChangeText={setPlaintext}
                />

                <Text style={styles.label}>Secret Key:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter secret key"
                    value={key}
                    onChangeText={setKey}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Encrypt" onPress={handleEncrypt} />
                </View>

                {encryptedText ? (
                    <>
                        <Text style={styles.label}>Encrypted Text:</Text>
                        <Text style={styles.result}>{encryptedText}</Text>
                    </>
                ) : null}

                {encryptedText ? (
                    <View style={styles.buttonContainer}>
                        <Button title="Decrypt" onPress={handleDecrypt} />
                    </View>
                ) : null}

                {decryptedText ? (
                    <>
                        <Text style={styles.label}>Decrypted Text:</Text>
                        <Text style={styles.result}>{decryptedText}</Text>
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginTop: 4,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 16,
    },
    result: {
        fontSize: 16,
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginTop: 4,
    },
});

export default App;
