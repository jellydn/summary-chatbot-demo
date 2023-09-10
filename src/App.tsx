import {
    Button,
    ButtonGroup,
    Route,
    Router,
    Text,
    useText,
} from '@urban-bot/core';
import { useState } from 'react';

function revertText(text: string) {
    return text.split('').reverse().join('');
}

function Echo() {
    const [text, setText] = useState(revertText('Say something'));

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            Bot: <b>{revertText(text)}</b>
        </Text>
    );
}

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <ButtonGroup title={count} isNewMessageEveryRender={false}>
            <Button onClick={increment}>+1</Button>
            <Button onClick={decrement}>-1</Button>
        </ButtonGroup>
    );
}

export function App() {
    return (
        <>
            <Text>Welcome to ITMan Bot! Type /echo or /counter.</Text>
            <Router>
                <Route path="/echo">
                    <Echo />
                </Route>
                <Route path="/counter">
                    <Counter />
                </Route>
            </Router>
        </>
    );
}
