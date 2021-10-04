module.exports.handleResponse = (res) => (data) => {
    res.status(data.status)
        .send(data.body);
}

module.exports.handleError = (err) => {
    const message = err.message || '';
    const status = message.startsWith('Validation')
        ? 422
        : 500;

    return {
        status: status,
        body: {
            message: message || "Unknown error"
        }
    };
};
