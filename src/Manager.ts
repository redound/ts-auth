import Session from "./Session";
import EventEmitter from "ts-core/lib/Events/EventEmitter";
import Dictionary from "ts-core/lib/Data/Dictionary";
import {AccountTypeInterface} from "./AccountTypeInterface";

export const ManagerEvents = {
    LOGIN_ATTEMPT_FAIL: 'login-attempt-fail',
    LOGIN_ATTEMPT_SUCCESS: 'login-attempt-success',
    LOGIN: 'login',
    LOGOUT: 'logout',
    SESSION_SET: 'session-set',
    SESSION_CLEARED: 'session-cleared'
};

export default class Manager {

    public events:EventEmitter = new EventEmitter();

    protected _accountTypes:Dictionary<any, AccountTypeInterface> = new Dictionary<any, AccountTypeInterface>();
    protected _session:Session = null;

    public static $inject = ['$q'];

    public constructor(protected $q:ng.IQService) {

    }

    public registerAccountType(name, account:AccountTypeInterface) {
        this._accountTypes.set(name, account);
        return this;
    }

    public getAccountTypes() {
        return this._accountTypes;
    }

    public getSession() {
        return this._session;
    }

    public setSession(session:Session) {
        this._session = session;
        this.events.trigger(ManagerEvents.SESSION_SET, {session: this._session});
    }

    public clearSession() {
        var session = this._session;
        this._session = null;
        this.events.trigger(ManagerEvents.SESSION_CLEARED, {session: session});
        return this;
    }

    public loggedIn() {
        return !!this._session;
    }

    public getAccountType(name) {
        return this._accountTypes.get(name);
    }

    /**
     * Try to authenticate a user.
     * @param accountTypeName   Which accountType to use.
     * @param credentials       Object containing the required credentials.
     */
    public login(accountTypeName:any, credentials:{}):ng.IPromise<Session> {

        var accountType:AccountTypeInterface = this._accountTypes.get(accountTypeName);

        if (!accountType) {
            return this.$q.reject();
        }

        return accountType.login(credentials).then<Session>((session:Session) => {

            this.setSession(session);

            this.events.trigger(ManagerEvents.LOGIN_ATTEMPT_SUCCESS, {
                credentials: credentials,
                session: this.getSession()
            });

            this.events.trigger(ManagerEvents.LOGIN, {
                credentials: credentials,
                session: this.getSession()
            });

            return this.getSession();

        }).catch((e) => {

            this.events.trigger(ManagerEvents.LOGIN_ATTEMPT_FAIL, {
                credentials: credentials,
                session: null
            });

            return this.$q.reject(e);
        });
    }

    public logout(accountTypeName:any):ng.IPromise<void> {

        var accountType:AccountTypeInterface = this._accountTypes.get(accountTypeName);

        if (!accountType) {
            return this.$q.reject();
        }

        if (!this.loggedIn()) {
            return this.$q.reject();
        }

        return accountType.logout(this.getSession()).then(() => {
            this.events.trigger(ManagerEvents.LOGOUT, {
                session: this.getSession()
            });
        }).finally(() => {
            this.clearSession();
        });
    }
}
