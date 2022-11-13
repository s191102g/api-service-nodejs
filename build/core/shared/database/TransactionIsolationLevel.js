"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionIsolationLevel = void 0;
var TransactionIsolationLevel;
(function (TransactionIsolationLevel) {
    TransactionIsolationLevel["ReadUncommitted"] = "READ UNCOMMITTED";
    TransactionIsolationLevel["ReadCommitted"] = "READ COMMITTED";
    TransactionIsolationLevel["RepeatableRead"] = "REPEATABLE READ";
    TransactionIsolationLevel["Serializable"] = "SERIALIZABLE";
})(TransactionIsolationLevel = exports.TransactionIsolationLevel || (exports.TransactionIsolationLevel = {}));
