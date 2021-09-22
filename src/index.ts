import AesEncryptation from './aes_encryptation';

const AesBob = new AesEncryptation();
const AesAlice = new AesEncryptation();

const Pass = "ContrasenaMuyFuerte";
const Encrypted = AesBob.encrypt(Pass);

console.table({
    "Pass" : Pass,
    "Pass Encrypted " : Encrypted,
    "Pass Decrypted " : AesAlice.decript(AesBob.SharedKey, Encrypted),
});