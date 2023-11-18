exports.handler = async () => {
    const mySecret = process.env.MONGODB_URI;
    return {
        statusCode:200,
        body: `hello world! I have a ${mySecret}`
    };
};
        