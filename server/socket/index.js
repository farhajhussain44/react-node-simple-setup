
export const SocketConnection = (io) => {

  io.on('connection', async (socket) => {
    try {
      console.log('connected');
 
    } catch (e) {
      return 0;
    }

    socket.on('disconnect', async () => {
      try {
        console.log('disconnected', socket.id);
      } catch (e) {
        return 0;
      }
    });
  });
};