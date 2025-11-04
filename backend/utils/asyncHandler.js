export const asyncHandler = (fn) => async (req , res ,next) => {
    try {
        await fn(req , res , next);
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message : "error"
        })
    }
}