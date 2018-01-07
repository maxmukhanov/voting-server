import Server from 'socket.io';

export default function startServer(store) {
    console.log('starting');
    const io = new Server().attach(8090);
    console.log('started');

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        console.log('connection received');
        socket.emit('state', store.getState().toJS());
        socket.on('action', (action) => {
            if (action.type === 'VOTE' || action.type === 'NEXT') {
                store.dispatch(action);
            }
        });
    });
    
}