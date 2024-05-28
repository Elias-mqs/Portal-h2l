import * as CryptoJS from "crypto-js";

///////// CRIPTOGRAFAR REQUISIÇÕES /////////
function cript(dados) {
    const passCryp = process.env.NEXT_PUBLIC_PASSCRYP
    const encryptedForm = CryptoJS.AES?.encrypt(JSON.stringify(dados), passCryp).toString()
    const data = { code: encryptedForm }
    return data
}
///////// DESCRIPTOGRAFAR REQUISIÇÕES /////////
function decript(dados) {
    const passCryp = process.env.NEXT_PUBLIC_PASSCRYP
    let bytes = CryptoJS.AES.decrypt(dados, passCryp);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
}

export { cript, decript }