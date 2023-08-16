const crypto = require("crypto")

export async function getRandomNummber() {
    return Math.floor(Math.random() * 10000 + 1)
}

export async function getRandomString() {
    return crypto.randomBytes(6).toString("hex")
}