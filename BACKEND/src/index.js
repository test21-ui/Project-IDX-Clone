import express from 'express';
import { PORT } from './config/serverconfig.js';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import chokidar from 'chokidar';
import path from 'path';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import { handleContainerCreate } from './containers/handleContainerCreate.js'

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => { 
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api',apiRouter);

app.get('/ping',(req,res) => {
    return res.json({message: 'pong'});
}
);

const editorNamespace = io.of('/editor');

editorNamespace.on('connection', (socket) => {
    console.log('A user connected to the editor namespace');

    let projectId = socket.handshake.query['projectId'];
    console.log(projectId);

    if(projectId) {
        var watcher = chokidar.watch(path.join(`../projects/${projectId}`), {
            persistent: true,
            ignoreInitial: true,
            ignored: (path) => path.includes('node_modules') || path.includes('.git'),
            awaitWriteFinish: {
                stabilityThreshold: 2000, 
            },
        });

        watcher.on('all', (event, path) => {
            console.log(event, path);
            editorNamespace.emit('fileChange', { event, path });
        });
    }

    handleEditorSocketEvents(socket,editorNamespace);

    socket.on('disconnect', async () => {
        await watcher.close();
        console.log('User disconnected from the editor namespace'); 
    });
});

const terminalNamespace = io.of('/terminal');

terminalNamespace.on('connection', (socket) => {
    console.log('A user connected to the terminal namespace');

    let projectId = socket.handshake.query['projectId'];
    
    socket.on("shell-input", (data) => {
        console.log(data);
        terminalNamespace.emit("shell-output", data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from the terminal namespace');
    });

    handleContainerCreate(projectId, socket);

});



server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});