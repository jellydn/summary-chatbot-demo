import { z } from 'zod';
import { $ } from 'zx';

import { logger } from './logger';

const messageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
});

const requestSchema = z.array(messageSchema);

export const sendMessage = async (
    data: Array<z.infer<typeof messageSchema>>,
    model: string,
) => {
    logger.info('sendMessage %o', data);
    const messages = requestSchema.parse(data);

    const instructions = messages
        .map((message) => {
            if (message.role === 'assistant') {
                return `" ${message.content}"`;
            }

            return message.content;
        })
        .join(' ');

    logger.info('instructions %o', instructions);

    const { exitCode, stdout, stderr } =
        await $`ollama run ${model} ${instructions}`;

    if (exitCode !== 0) {
        throw new Error(stderr);
    }

    logger.info('done');
    return stdout;
};
