import AesEncryptation from './aes_encryptation';

const AesEncrypt = new AesEncryptation();
const AesDecrypt = new AesEncryptation();
const Pass = "ContrasenaMuyFuerte"; //This const represents Password to encrypt
const Encrypted = AesEncrypt.encrypt(Pass);

console.table({
    "Pass" : Pass,
    "Pass Encrypted " : Encrypted,
    "Pass Decrypted " : AesDecrypt.decrypt(AesEncrypt.SharedKey, Encrypted)
});