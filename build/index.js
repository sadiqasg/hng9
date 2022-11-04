"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const services_1 = require("./services");
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.status(200).json({
        slackUsername: "codeHashira",
        backend: true,
        age: 32,
        bio: "Hello! I am a Backend Developer",
    });
});
app.post("/stage2", (req, res) => {
    try {
        (0, services_1.postService)(req, res);
    }
    catch (error) {
        console.log(error);
        res.status(400).json("Error");
    }
});
app.post("/stage2-task", (req, res) => {
    const { operation_type, x, y } = req.body;
    // This object serves as the enum for 'operation_type'
    let OperationEnum;
    (function (OperationEnum) {
        OperationEnum["Addition"] = "addition";
        OperationEnum["Subtraction"] = "subtraction";
        OperationEnum["Multiplication"] = "multiplication";
    })(OperationEnum || (OperationEnum = {}));
    // This function parses the operation_type string
    const parseOpType = (opType) => {
        const possibleOpTypes = [
            "add",
            "sum",
            "subtract",
            "difference",
            "multiply",
            "product",
        ];
        let matchedType = OperationEnum.Addition;
        if (typeof opType === "string") {
            for (let possibleOpType of possibleOpTypes) {
                if (opType.toLowerCase().indexOf(possibleOpType) > -1) {
                    switch (possibleOpType) {
                        case "sum":
                        case "add":
                            matchedType = OperationEnum.Addition;
                            break;
                        case "difference":
                        case "subtract":
                            matchedType = OperationEnum.Subtraction;
                            break;
                        case "product":
                        case "multiply":
                            matchedType = OperationEnum.Multiplication;
                            break;
                    }
                }
            }
        }
        return matchedType;
    };
    const matchedOpType = parseOpType(operation_type);
    let result = 0;
    switch (matchedOpType) {
        case OperationEnum.Addition:
            result = parseInt(x) + parseInt(y);
            break;
        case OperationEnum.Subtraction:
            result = parseInt(x) - parseInt(y);
            break;
        case OperationEnum.Multiplication:
            result = parseInt(x) * parseInt(y);
            break;
        default:
            break;
    }
    return res
        .status(200)
        .json({
        slackUsername: "codeHashira",
        result: result,
        operation_type: matchedOpType,
    })
        .end();
});
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
