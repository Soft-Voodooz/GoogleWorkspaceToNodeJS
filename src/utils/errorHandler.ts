import OtherUtils from './tools';

class ErrorHandler {
    send(httpRespondler: any ,errorCode: number, errorMessage: string) {
        try {
            return httpRespondler.status(errorCode).send(
                Object.freeze({
                    headers: {
                        "Content-Type": "application/json",
                        "Last-Modified": new Date().toUTCString(),
                    },
                    statusCode: errorCode,
                    body: errorMessage
                }),
            );
        } catch (error) {
            return OtherUtils.getErrorMessage(error);
        };
    };

    error(errorCode: number, errorMessage: string) {

        try {
            const error =  Object.freeze({
                headers: {
                    "Content-Type": "application/json",
                    "Last-Modified": new Date().toUTCString(),
                },
                statusCode: errorCode,
                body: errorMessage,
            });
            console.log(error.body);
            return error;
        } catch (error) {
            return OtherUtils.getErrorMessage(error);
        };
    };
};

export default new ErrorHandler();