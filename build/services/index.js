"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const postService = (req, res) => {
    // return console.log(req.params);
    const operation_type = req.body.operation_type || req.params.operation_type;
    const checkSubStr = (string, substing) => {
        return string.indexOf(substing) !== -1 ? true : false;
    };
    if (!operation_type)
        return res.status(400).json("Missing operation_type");
    const operation = checkSubStr(operation_type, "add") ||
        checkSubStr(operation_type, "addition")
        ? "addition"
        : checkSubStr(operation_type, "subtraction") ||
            checkSubStr(operation_type, "substract")
            ? "subtraction"
            : checkSubStr(operation_type, "multiplication") ||
                checkSubStr(operation_type, "multiply")
                ? "multiplication"
                : null;
    if (!operation)
        return res
            .status(400)
            .json("Please put correct operation - either addition, subtraction, or multiplication");
    const operation_string = operation_type.split(" ");
    const numbArr = [];
    for (let i = 0; i < operation_string.length; i++) {
        if (parseInt(operation_string[i])) {
            numbArr.push(operation_string[i]);
        }
    }
    const tempX = numbArr.length ? parseInt(numbArr[0]) : null;
    const tempY = numbArr.length ? parseInt(numbArr[1]) : null;
    const x = req.body.x
        ? req.body.x
        : tempX
            ? tempX
            : req.params.x
                ? parseInt(req.params.x)
                : null;
    const y = req.body.y
        ? req.body.y
        : tempY
            ? tempY
            : req.params.y
                ? parseInt(req.params.y)
                : null;
    if (!x || !y)
        return res.status(400).json("Please add integer values for X and Y");
    const result = operation === "addition"
        ? x + y
        : operation === "subtraction"
            ? x - y
            : operation === "multiplication"
                ? x * y
                : null;
    if (result) {
        return res.status(201).json({
            slackUsername: "codeHashira",
            result: result,
            operation_type: operation,
        });
    }
    res.status(400).json("Please make sure you are inputing correct values before I carry cane");
};
exports.postService = postService;
module.exports = { postService: exports.postService };
