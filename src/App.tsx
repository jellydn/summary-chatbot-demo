import {
    Button,
    ButtonGroup,
    Route,
    Router,
    Text,
    useText,
} from '@urban-bot/core';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

import { sendMessage } from './summary-ai';

const LLM_MODELS = ['llama2', 'vicuna', 'codellama'];
const useModelStore = create<{
    model: string;
    setModel: (model: string) => void;
}>((set) => ({
    model: 'llama2',
    setModel(model: string) {
        if (LLM_MODELS.includes(model)) {
            set({ model });
        } else {
            throw new Error('Invalid model');
        }
    },
}));

const useMessageStore = create<{
    status: 'idle' | 'pending' | 'error';
    ask: (
        question: string,
        model: string,
        type: 'summary' | 'qa',
    ) => Promise<string>;
}>((set) => ({
    status: 'idle',
    async ask(content: string, model: string, type: 'summary' | 'qa') {
        if (!content) {
            throw new Error('Content is empty');
        }

        set({
            status: 'pending',
        });

        const template: {
            role: 'assistant';
            content: string;
        } =
            type === 'summary'
                ? {
                      role: 'assistant',
                      content: `
                Your output should use the following template in markdown format:
                ### Summary
                ### Highlights

                Your task is to summaries the text I have given you in up to five concise bullet points, starting with a short highlight. Choose an appropriate emoji for each bullet point.
                `,
                  }
                : {
                      role: 'assistant',
                      content: `
                List the highlights of the content in the form of Q&As, no less than 3 Q&As. Here is an example of the template output you should use:
                ### Who are you?
                I am AI.

                Be sure not to write out the template examples.
                `,
                  };
        try {
            const message = await sendMessage(
                [
                    template,
                    {
                        role: 'user',
                        content,
                    },
                ],
                model,
            );
            set({
                status: 'idle',
            });
            return `
${message}
Hope you like it! 🤖

Generated by ${model} model at ${new Date().toLocaleString()} - You can change the model at /settings.
`;
        } catch (error) {
            set({
                status: 'error',
            });

            throw error;
        }
    },
}));

function SummaryContent({ type }: { readonly type: 'summary' | 'qa' }) {
    const model = useModelStore((state) => state.model);
    const usageMsg = model
        ? `Hello! I'm the summary bot. I'm using ${model} model.`
        : `Hello! I'm the summary bot. Please select a model at /settings.`;
    const [text, setText] = useState(usageMsg);
    const [errorMsg, setErrorMsg] = useState('');
    const askQuestion = useMessageStore((state) => state.ask);
    const isProcessing = useMessageStore((state) => state.status === 'pending');

    // Reset text when model is type changed
    useEffect(() => {
        setText(usageMsg);
    }, [type, usageMsg]);

    useText(({ text }) => {
        if (text !== usageMsg && model) {
            askQuestion(text, model, type)
                .then(setText)
                .catch((error) => {
                    setErrorMsg((error as Error).message);
                });
        } else {
            setText(usageMsg);
        }
    });

    if (errorMsg) {
        return <Text>Oops! Error: {errorMsg}</Text>;
    }

    if (isProcessing) {
        return (
            <Text>
                Bot:{' '}
                {type === 'qa'
                    ? 'Working on Q&A format...'
                    : 'Working on summary...'}
                .
            </Text>
        );
    }

    return <Text>{text}</Text>;
}

function Settings() {
    const model = useModelStore((state) => state.model);
    const setModel = useModelStore((state) => state.setModel);
    const onSelectedModel = (model: string) => {
        setModel(model);
    };

    return (
        <>
            <Text isNewMessageEveryRender>
                {model ? `Current model is ${model}` : 'Model is not selected.'}
            </Text>
            <ButtonGroup title="AI Model" isNewMessageEveryRender={false}>
                <Button
                    onClick={() => {
                        onSelectedModel('llama2');
                    }}
                >
                    LLAMA2
                </Button>
                <Button
                    onClick={() => {
                        onSelectedModel('vicuna');
                    }}
                >
                    VICUNA
                </Button>
                <Button
                    onClick={() => {
                        onSelectedModel('codellama');
                    }}
                >
                    CODELLAMA
                </Button>
            </ButtonGroup>

            <Text isNewMessageEveryRender={false}>
                You can change the model at any time. The model will be used for
                the next message you send for /summary or /qa.
            </Text>
        </>
    );
}

export function App() {
    return (
        <>
            <Text>Welcome to ITMan Bot! Type /summary, /qa or /settings.</Text>
            <Router>
                <Route path="/summary">
                    <SummaryContent type="summary" />
                </Route>
                <Route path="/qa">
                    <SummaryContent type="qa" />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
            </Router>
        </>
    );
}
