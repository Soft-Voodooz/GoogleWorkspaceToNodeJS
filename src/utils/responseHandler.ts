import OtherUtils from './tools';

class ResponseHandler {
    send( httpRespondler: any, responseCode: number, response: unknown, additionnalData: unknown = null) {
        try {
            let contentType: string = "application/json";
            if (typeof response === "string") contentType = "text/html";

            return httpRespondler.status(responseCode).send(
                Object.freeze({
                    headers: {
                        "Content-Type": contentType,
                        "Last-Modified": new Date().toUTCString(),
                    },
                    statusCode: responseCode,
                    body: response,
                    additionnalData,
                })
            );
        } catch (error) {
            return OtherUtils.getErrorMessage(error);
        };
    };

    response(responseCode: number, response: unknown) {
        try {
            let contentType: string = "application/json";
            if (typeof response === "string") contentType = "text/html";
            return Object.freeze({
                headers: {
                    "Content-Type": contentType,
                    "Last-Modified": new Date().toUTCString(),
                },
                statusCode: responseCode,
                body: response,
            });
        } catch (error) {
            return OtherUtils.getErrorMessage(error);
        };
    };
};

export default new ResponseHandler();