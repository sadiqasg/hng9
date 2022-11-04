const postService = (req, res) => {
    const operation_type = req.body.operation_type || req.query.operation_type;

    const checkSubStr = (string, substing) => {
        return string.indexOf(substing) !== -1 ? true : false;
    };

    if (!operation_type) return res.status(400).json("Missing operation_type");
    const operation =
        checkSubStr(operation_type, "add") ||
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
            .json(
                "Please put correct operation - either addition, subtraction, or multiplication"
            );

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
        : req.query.x
        ? parseInt(req.query.x)
        : null;
    const y = req.body.y
        ? req.body.y
        : tempY
        ? tempY
        : req.query.y
        ? parseInt(req.query.y)
        : null;

    if (!x || !y)
        return res.status(400).json("Please add integer values for X and Y");

    const result =
        operation === "addition"
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
    res.status(400).json(
        "Please make sure you are inputing correct values before I carry cane"
    );
};

module.exports = { postService };
