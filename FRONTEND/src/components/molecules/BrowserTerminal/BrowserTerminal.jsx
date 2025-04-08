import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

export const BrowserTerminal = () => {

    const terminalRef = useRef(null);
    const socket = useRef(null);

    const {projectId : projectIdFromUrl} = useParams

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            fontFamily: 'monospace',
            fontSize: 14,
            theme: {
                background: '#000000',
                foreground: '#ffffff',
                cursor: '#ffffff',
                cursorAccent: '#000000',
                red: '#ff0000',
                green: '#00ff00',
                yellow: '#ffff00',
                blue: '#0000ff',
            },
            convertEol: true,
        });

        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();

        socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
            query: {
                projectId: projectIdFromUrl,
            },
        });
    
        socket.current.on('connect', () => {
            console.log('Connected to terminal socket');
        });
    
        socket.current.on('shell-output', (data) => {
            term.write(data);
        });

        term.onData((data) => {
            socket.current.emit('shell-input', data);
            console.log(data);
        });

        return () => {
            term.dispose();
            socket.current.disconnect();
        }

},[]);



    return (
        <div
            ref={terminalRef}
            style={{
                width: '100%',
                height: '75px',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontFamily: 'monospace',
                fontSize: '14px',
                padding: '10px',
            }}
            className='terminal'
            id='terminal-container'
        >
            Terminal
        </div>
    ) 

}