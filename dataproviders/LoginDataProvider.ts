import { test as base } from "@playwright/test"
import { Credentials } from "../enums/Credentials"

export type TestOptions = {
    email: string;
    password: string;
};

export const test = base.extend<TestOptions>({
  email: [Credentials.EMAIL, { option: true }],
  password: [Credentials.PASSWORD, { option: true }],
});

