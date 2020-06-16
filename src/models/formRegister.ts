export interface formRegister {
    email: string,
    provider: string,
    providerUserId: string,
    token: string,
    tokenSecret: string,
    name: string,
    nickname?: string,
    avatar: string
    deviceId: string
    deviceOs: string
    appVersion: string
}
