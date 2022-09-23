"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfMonth = exports.getBeginOfMonth = exports.getEndOfDay = exports.getBeginOfDay = exports.addYears = exports.addMonths = exports.addDays = exports.addHours = exports.addMinutes = exports.addSeconds = exports.addMiliseconds = exports.formatDateString = void 0;
/**
 * Format date to string
 */
function formatDateString(date) {
    if (!date) {
        return "";
    }
    const d = typeof date === "string" ? new Date(date) : date;
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }
    return [year, month, day].join("-");
}
exports.formatDateString = formatDateString;
/**
 * Add miliseconds
 */
function addMiliseconds(date, miliseconds) {
    const d = new Date(date);
    d.setMilliseconds(d.getMilliseconds() + miliseconds);
    return d;
}
exports.addMiliseconds = addMiliseconds;
/**
 * Add seconds
 */
function addSeconds(date, seconds) {
    const d = new Date(date);
    d.setSeconds(d.getSeconds() + seconds);
    return d;
}
exports.addSeconds = addSeconds;
/**
 * Add minutes
 */
function addMinutes(date, minutes) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + minutes);
    return d;
}
exports.addMinutes = addMinutes;
/**
 * Add hours
 */
function addHours(date, hours) {
    const d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d;
}
exports.addHours = addHours;
/**
 * Add days
 */
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
exports.addDays = addDays;
/**
 * Add months
 */
function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}
exports.addMonths = addMonths;
/**
 * Add years
 */
function addYears(date, years) {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return d;
}
exports.addYears = addYears;
/**
 * Get begin of day
 */
function getBeginOfDay(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
exports.getBeginOfDay = getBeginOfDay;
/**
 * Get end of day
 */
function getEndOfDay(date) {
    let d = typeof date === "string" ? new Date(date) : date;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    d = addDays(d, 1);
    return addMiliseconds(d, -1);
}
exports.getEndOfDay = getEndOfDay;
/**
 * Get begin of month
 */
function getBeginOfMonth(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Date(d.getFullYear(), d.getMonth(), 1);
}
exports.getBeginOfMonth = getBeginOfMonth;
/**
 * Get begin of month
 */
function getEndOfMonth(date) {
    let d = typeof date === "string" ? new Date(date) : date;
    d = new Date(d.getFullYear(), d.getMonth(), 1);
    d = addMonths(d, 1);
    return addDays(d, -1);
}
exports.getEndOfMonth = getEndOfMonth;
