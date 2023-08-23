const crypto = require("crypto")

export async function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function getRandomString() {
    return crypto.randomBytes(6).toString("hex")
}