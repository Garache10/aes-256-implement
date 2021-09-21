import AesEncryptation from './aes_encryptation';

const Aes = new AesEncryptation();
const Pass = "Marmota5000";
const Encrypted = Aes.encrypt(Pass);
console.table({
    "Pass" : Pass,
    "Pass Encrypted " : Encrypted,
    "Pass Decrypted " : "Hola"
});