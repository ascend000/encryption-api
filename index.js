const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for external access

// Unique Key (Keep this secret on the server side)
const uniqueKey = "Password1012120824";

// Encryption mapping
const mapping = {
    'a': 'm', 'b': 'q', 'c': 'r', 'd': 'f', 'e': 'p',
    'f': 'h', 'g': 'o', 'h': 'i', 'i': 's', 'j': 'l',
    'k': 'e', 'l': 'w', 'm': 'v', 'n': 'a', 'o': 'k',
    'p': 'n', 'q': 'g', 'r': 'z', 's': 'c', 't': 'b',
    'u': 'y', 'v': 'x', 'w': 'd', 'x': 'j', 'y': 't',
    'z': 'u', 'A': 'M', 'B': 'Q', 'C': 'R', 'D': 'F',
    'E': 'P', 'F': 'H', 'G': 'O', 'H': 'I', 'I': 'S',
    'J': 'L', 'K': 'E', 'L': 'W', 'M': 'V', 'N': 'A',
    'O': 'K', 'P': 'N', 'Q': 'G', 'R': 'Z', 'S': 'C',
    'T': 'B', 'U': 'Y', 'V': 'X', 'W': 'D', 'X': 'J',
    'Y': 'T', 'Z': 'U', '0': '7', '1': '3', '2': '8',
    '3': '0', '4': '9', '5': '4', '6': '1', '7': '5',
    '8': '6', '9': '2'
};

// Reverse mapping for decryption
const reverseMapping = Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [value, key])
);

// Encryption function (with uniqueKey)
const encrypt = (text) => {
    const textWithKey = `${text},${uniqueKey}`; // Append uniqueKey
    return textWithKey.split('').map(char => mapping[char] || char).join('');
};

// Decryption function (with uniqueKey verification)
const decrypt = (text) => {
    const decryptedText = text.split('').map(char => reverseMapping[char] || char).join('');

    // Verify uniqueKey
    if (!decryptedText.endsWith(`,${uniqueKey}`)) {
        return "Invalid key or corrupted message";
    }

    return decryptedText.replace(`,${uniqueKey}`, '');
};

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Secure Encryption API' });
});

// Encrypt endpoint
app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const encryptedText = encrypt(text);
    res.json({ encrypted: encryptedText });
});

// Decrypt endpoint
app.post('/decrypt', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const decryptedText = decrypt(text);
    res.json({ decrypted: decryptedText });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Encryption API running on port ${PORT}`);
});
