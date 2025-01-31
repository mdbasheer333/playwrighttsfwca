import { createCipheriv } from 'crypto';

// Function to encrypt the password using AES-256-CBC
function encryptPassword(password, secretKey, ivHex) {
    // Ensure the secret key is 32 bytes (256 bits) long
    const key = Buffer.from(secretKey, 'hex');  // Converting hex to buffer
    if (key.length !== 32) {
        throw new Error('Secret key must be 32 bytes for AES-256');
    }

    // Ensure the IV is 16 bytes long (128 bits)
    const iv = Buffer.from(ivHex, 'hex');  // Converting hex to buffer
    if (iv.length !== 16) {
        throw new Error('IV must be 16 bytes for AES-256-CBC');
    }

    // Create the cipher with AES-256-CBC
    const cipher = createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the password
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the encrypted password as a hex string
    return encrypted;
}

// Example usage
const secretKey = 'fee11a632ed36bd27333de47ad32bb016776e7b50628b74191adbbb35739449d';  // 32 bytes (256 bits)
const ivHex = '44337331e06d6a01b72fe258df1703595c4c9f4037f5e628f7b22286667a7034'.slice(0, 32);  // 16 bytes

// #### uncomment this and run the code to generate app password
//const encryptedPassword = encryptPassword('app_password_here', secretKey, ivHex);
//console.log('Encrypted Password:', encryptedPassword);

export {secretKey, ivHex};