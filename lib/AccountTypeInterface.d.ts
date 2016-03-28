import Session from "./Session";
export interface AccountTypeInterface {
    login(data: any): ng.IPromise<Session>;
    authenticate(identity: any): ng.IPromise<void>;
    logout(session: any): ng.IPromise<void>;
}
