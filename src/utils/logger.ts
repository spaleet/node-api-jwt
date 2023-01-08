import pino, { LoggerOptions } from 'pino';
import dayjs from 'dayjs';

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
} as LoggerOptions)

export default log;