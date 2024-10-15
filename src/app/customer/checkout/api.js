"use server"
import CryptoJS from 'crypto-js';

const merchant_id = "1227551";
const merchant_secret = "Mjk2ODgxMTgxMTg2MjAwODkyMzU2NzQ2MzIzMDU4ODcxMzkzMA==";

export async function createHash(order_id, amount, currency) {
    const combinedString =
        merchant_id +
        order_id +
        amount.toFixed(2) +
        currency +
        CryptoJS.MD5(merchant_secret).toString().toUpperCase();
    const hash = await CryptoJS.MD5(combinedString).toString().toUpperCase();

    return {hash, merchant_id};
}
