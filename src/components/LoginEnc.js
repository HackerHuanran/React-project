import * as CryptoJS from 'crypto-js';

export function enc(value,key){
    console.log(value);
    console.log(key);
    var key = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(value);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    console.log(encrypted.toString())
    return encrypted.toString();
    // return encrypted.ciphertext.toString();
}