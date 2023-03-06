import { platform } from 'os'

export const hello = async (name: string) => `hello ${name}! from ${platform()}`