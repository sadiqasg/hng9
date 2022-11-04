import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const port: number | string = process.env.PORT || 8000;

import { postService } from "./services";

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({
        slackUsername: "codeHashiral",
        backend: true,
        age: 32,
        bio: "Hello! I am a Backend Developer",
    });
});

app.post("/stage2", (req, res) => {
    try {
        postService(req, res);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error");
    }
});

app.post("/stage2-task", (req: Request, res: Response) => {
    const { operation_type, x, y } = req.body;

    // This object serves as the enum for 'operation_type'
    enum OperationEnum {
        Addition = "addition",
        Subtraction = "subtraction",
        Multiplication = "multiplication",
    }

    // This function parses the operation_type string
    const parseOpType = (opType: string | OperationEnum) => {
        const possibleOpTypes = [
            "add",
            "sum",
            "subtract",
            "difference",
            "multiply",
            "product",
        ];

        let matchedType: OperationEnum = OperationEnum.Addition;

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
