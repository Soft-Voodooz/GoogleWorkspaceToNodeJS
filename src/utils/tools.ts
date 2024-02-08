class OtherUtils {
    private static uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    public static isEmailValid(value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    public static getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) return error.message;
        if (error && typeof error === "object" && "message" in error) return String((error.message));
        if (typeof error === "string") return error;
        return "Unknown error";
    };

    public static isValidUUID(uuid: string): boolean {
        return this.uuidRegex.test(uuid);
    };

    public static verifyTwoWords = (word1: string, word2: string) => word1 === word2;
};

export default OtherUtils;