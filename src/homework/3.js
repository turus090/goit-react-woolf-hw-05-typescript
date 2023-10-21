"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormComponent = void 0;
var react_1 = require("react");
function FormComponent() {
    var _a = (0, react_1.useState)(""), value = _a[0], setValue = _a[1];
    var handleChange = function (event) {
        setValue(event.target.value);
    };
    return <input type="text" value={value} onChange={handleChange}/>;
}
exports.FormComponent = FormComponent;
