class ResponseError extends Error {
    constructor(status, message){
        super(status, message);
        this.status = status;
    }
}

export {
    ResponseError
}