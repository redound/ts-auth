import Session from "./Session";

export interface AccountTypeInterface  {

    login(data): ng.IPromise<Session>;
    authenticate(identity): ng.IPromise<void>;
    logout(session): ng.IPromise<void>;
}
