"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTemplateWithDataObject = exports.mapTemplate = void 0;
function mapTemplate(template, ...params) {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return params[number] || match;
    });
}
exports.mapTemplate = mapTemplate;
function mapTemplateWithDataObject(template, data) {
    Object.keys(data).forEach((key) => {
        template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
    });
    return template;
}
exports.mapTemplateWithDataObject = mapTemplateWithDataObject;
