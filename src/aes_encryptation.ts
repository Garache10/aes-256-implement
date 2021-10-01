import crypto from 'crypto';
const encryptationType = 'aes-256-gcm';
const bufferEncryptation = 'hex';
const EncodingType = 'base64'

class AesEncryptation {
    SharedKey: string;
    AesIV: Buffer;

    constructor() {
        const Encryptkey = crypto.createECDH('secp256k1');
        Encryptkey.generateKeys();
        const publicKey = Encryptkey.getPublicKey().toString(EncodingType);
        this.SharedKey = Encryptkey.computeSecret(publicKey, EncodingType, bufferEncryptation);
        this.AesIV = crypto.randomBytes(16);
    }

    //this encryption generates a payload too it should be two methods but this is a demo
    encrypt(jsonObject: string): string {
        const val = jsonObject;
        const key = Buffer.from(this.SharedKey, bufferEncryptation);
        const cipher = crypto.createCipheriv(encryptationType, key, this.AesIV);
        let encrypted = cipher.update(val, 'utf-8', bufferEncryptation);
        encrypted += cipher.final(bufferEncryptation);
        const payload = this.AesIV.toString('hex') + encrypted + cipher.getAuthTag().toString('hex');
        return Buffer.from(payload, 'hex').toString('base64');
    }

    //this method decrypts from a payload that it receives by parameter
    decrypt(sharedKey:string, payload:string): string {
        const hex_payload = Buffer.from(payload, 'base64').toString('hex');
        const payload_iv = hex_payload.substr(0, 32);
        const payload_encrypted = hex_payload.substr(32, hex_payload.length - 32 - 32);
        const payload_auth_tag = hex_payload.substr(hex_payload.length - 32, 32);
        const decipher = crypto.createDecipheriv(
            encryptationType,
            Buffer.from(sharedKey, bufferEncryptation),
            Buffer.from(payload_iv, bufferEncryptation)
        );
        decipher.setAuthTag(Buffer.from(payload_auth_tag, 'hex'));
        let decrypted = decipher.update(payload_encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}

export default AesEncryptation;