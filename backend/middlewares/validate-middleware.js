// Validating the user response
const validate = (schema) => async(req,res,next) =>{
    try {
        console.log("In validate-middleware try block")
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        console.log("In validate-middleware error block")
        const message = error.errors[0].message;
        console.log(message);
        res.status(400).json({msg:message})
    }
}

module.exports = validate;