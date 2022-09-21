module.exports = (req, res, next) => {
    const auth = req.header("Authorization")
    if (auth !== "my_pass") {
        res.status(401).end("Not authenticated");
        return
    }
    next()
}
