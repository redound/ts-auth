"use strict";
var EventEmitter_1 = require("ts-core/lib/Events/EventEmitter");
var Dictionary_1 = require("ts-core/lib/Data/Dictionary");
exports.ManagerEvents = {
    LOGIN_ATTEMPT_FAIL: 'login-attempt-fail',
    LOGIN_ATTEMPT_SUCCESS: 'login-attempt-success',
    LOGIN: 'login',
    LOGOUT: 'logout',
    SESSION_SET: 'session-set',
    SESSION_CLEARED: 'session-cleared'
};
var Manager = (function () {
    function Manager($q) {
        this.$q = $q;
        this.events = new EventEmitter_1.default();
        this._accountTypes = new Dictionary_1.default();
        this._session = null;
    }
    Manager.prototype.registerAccountType = function (name, account) {
        this._accountTypes.set(name, account);
        return this;
    };
    Manager.prototype.getAccountTypes = function () {
        return this._accountTypes;
    };
    Manager.prototype.getSession = function () {
        return this._session;
    };
    Manager.prototype.setSession = function (session) {
        this._session = session;
        this.events.trigger(exports.ManagerEvents.SESSION_SET, { session: this._session });
    };
    Manager.prototype.clearSession = function () {
        var session = this._session;
        this._session = null;
        this.events.trigger(exports.ManagerEvents.SESSION_CLEARED, { session: session });
        return this;
    };
    Manager.prototype.loggedIn = function () {
        return !!this._session;
    };
    Manager.prototype.getAccountType = function (name) {
        return this._accountTypes.get(name);
    };
    Manager.prototype.login = function (accountTypeName, credentials) {
        var _this = this;
        var accountType = this._accountTypes.get(accountTypeName);
        if (!accountType) {
            return this.$q.reject();
        }
        return accountType.login(credentials).then(function (session) {
            _this.setSession(session);
            _this.events.trigger(exports.ManagerEvents.LOGIN_ATTEMPT_SUCCESS, {
                credentials: credentials,
                session: _this.getSession()
            });
            _this.events.trigger(exports.ManagerEvents.LOGIN, {
                credentials: credentials,
                session: _this.getSession()
            });
            return _this.getSession();
        }).catch(function (e) {
            _this.events.trigger(exports.ManagerEvents.LOGIN_ATTEMPT_FAIL, {
                credentials: credentials,
                session: null
            });
            return _this.getSession();
        });
    };
    Manager.prototype.logout = function (accountTypeName) {
        var _this = this;
        var accountType = this._accountTypes.get(accountTypeName);
        if (!accountType) {
            return this.$q.reject();
        }
        if (!this.loggedIn()) {
            return this.$q.reject();
        }
        return accountType.logout(this.getSession()).then(function () {
            _this.events.trigger(exports.ManagerEvents.LOGOUT, {
                session: _this.getSession()
            });
        }).finally(function () {
            _this.clearSession();
        });
    };
    Manager.$inject = ['$q'];
    return Manager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Manager;
