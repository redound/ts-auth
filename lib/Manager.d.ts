import Session from "./Session";
import EventEmitter from "ts-core/lib/Events/EventEmitter";
import Dictionary from "ts-core/lib/Data/Dictionary";
import { AccountTypeInterface } from "./AccountTypeInterface";
export declare const ManagerEvents: {
    LOGIN_ATTEMPT_FAIL: string;
    LOGIN_ATTEMPT_SUCCESS: string;
    LOGIN: string;
    LOGOUT: string;
    SESSION_SET: string;
    SESSION_CLEARED: string;
};
export default class Manager {
    protected $q: ng.IQService;
    events: EventEmitter;
    protected _accountTypes: Dictionary<any, AccountTypeInterface>;
    protected _session: Session;
    static $inject: string[];
    constructor($q: ng.IQService);
    registerAccountType(name: any, account: AccountTypeInterface): this;
    getAccountTypes(): Dictionary<any, AccountTypeInterface>;
    getSession(): Session;
    setSession(session: Session): void;
    clearSession(): this;
    loggedIn(): boolean;
    getAccountType(name: any): AccountTypeInterface;
    login(accountTypeName: any, credentials: {}): ng.IPromise<Session>;
    logout(): ng.IPromise<void>;
}
