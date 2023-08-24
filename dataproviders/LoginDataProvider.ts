import { Credentials } from "../enums/Credentials"
import { getRandomString } from "../utils/data-helpers"

export const validLoginData = [{
    mail: Credentials.EMAIL,
    password: Credentials.PASSWORD
},]

export const invalidMailLoginData = [{
    password: Credentials.PASSWORD
},]

export const invalidPasswordLoginData = [{
    mail: Credentials.EMAIL
},]