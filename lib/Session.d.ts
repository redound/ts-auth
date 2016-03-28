export default class Session {
    protected _accountTypeName: string;
    protected _identity: number;
    protected _startTime: number;
    protected _expirationTime: number;
    protected _token: string;
    constructor(_accountTypeName: string, _identity: number, _startTime: number, _expirationTime: number, _token: string);
    setIdentity(identity: any): void;
    getIdentity(): number;
    setToken(token: any): void;
    getToken(): string;
    setExpirationTime(time: any): void;
    getExpirationTime(): number;
    setStartTime(time: any): void;
    getStartTime(): number;
    setAccountTypeName(accountTypeName: any): void;
    getAccountTypeName(): string;
    toJson(): {
        accountTypeName: string;
        identity: number;
        startTime: number;
        expirationTime: number;
        token: string;
    };
    static fromJson(obj: any): Session;
}
