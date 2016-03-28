"use strict";
var Session = (function () {
    function Session(_accountTypeName, _identity, _startTime, _expirationTime, _token) {
        this._accountTypeName = _accountTypeName;
        this._identity = _identity;
        this._startTime = _startTime;
        this._expirationTime = _expirationTime;
        this._token = _token;
    }
    Session.prototype.setIdentity = function (identity) {
        this._identity = identity;
    };
    Session.prototype.getIdentity = function () {
        return this._identity;
    };
    Session.prototype.setToken = function (token) {
        this._token = token;
    };
    Session.prototype.getToken = function () {
        return this._token;
    };
    Session.prototype.setExpirationTime = function (time) {
        this._expirationTime = time;
    };
    Session.prototype.getExpirationTime = function () {
        return this._expirationTime;
    };
    Session.prototype.setStartTime = function (time) {
        this._startTime = time;
    };
    Session.prototype.getStartTime = function () {
        return this._startTime;
    };
    Session.prototype.setAccountTypeName = function (accountTypeName) {
        this._accountTypeName = accountTypeName;
    };
    Session.prototype.getAccountTypeName = function () {
        return this._accountTypeName;
    };
    Session.prototype.toJson = function () {
        return {
            accountTypeName: this.getAccountTypeName(),
            identity: this.getIdentity(),
            startTime: this.getStartTime(),
            expirationTime: this.getExpirationTime(),
            token: this.getToken()
        };
    };
    Session.fromJson = function (obj) {
        return new this(obj.accountTypeName, obj.identity, obj.startTime, obj.expirationTime, obj.token);
    };
    return Session;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Session;
