import 'dotenv/config';

interface ProcessEnv {
    PORT?: string | number;
};

export const config: ProcessEnv = {
    PORT: process.env.PORT ,
};
