import crypto from 'crypto';
const encryptationType = 'aes-256-gcm';
const bufferEncryptation = 'hex';
const EncodingType = 'base64'

class AesEncryptation {
    AesKey_: any;
    AesKey: any;
    AesIV: any;
    
    constructor() {
        const Encryptkey = crypto.createECDH('secp256k1');
        Encryptkey.generateKeys();
        const publicKey = Encryptkey.getPublicKey().toString(EncodingType);

        const Decryptkey = crypto.createECDH('secp256k1');
        Decryptkey.generateKeys();
        const _publicKey = Decryptkey.getPublicKey().toString(EncodingType);

        this.AesKey = Encryptkey.computeSecret(publicKey, EncodingType, bufferEncryptation);
        this.AesKey_ = Decryptkey.computeSecret(_publicKey, EncodingType, bufferEncryptation);
        this.AesIV = crypto.randomBytes(16);
    }

    encrypt(jsonObject: Object): string {
        const val = JSON.stringify(jsonObject);
        const key = Buffer.from(this.AesKey, bufferEncryptation);
        const cipher = crypto.createCipheriv(encryptationType, key, this.AesIV);
        let encrypted = cipher.update(val, 'utf-8', bufferEncryptation);
        encrypted += cipher.final(bufferEncryptation);
        return encrypted;
    }

    //TODO: Method to decrypt string
}

export default AesEncryptation;