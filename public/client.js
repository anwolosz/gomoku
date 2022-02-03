const app = {
  data() {
    return {
      gomoku: new Gomoku(),
      gomokuConnection: new GomokuConnection(),
      roomName: "",
      connectRoom: "",
    };
  },
  mounted() {
    this.gomokuConnection.onConnect();
    this.gomokuConnection.receiveMove(this.gomoku);
    this.gomokuConnection.receiveRoomId();
    this.gomokuConnection.receiveIsFirstPlayer(this.gomoku);
  },
  methods: {
    onClick(x, y) {
      this.gomokuConnection.sendMove(this.gomoku, x, y);
    },
    onCreateRoom() {
      this.gomokuConnection.createRoom(this.roomName);
    },
    onConnectRoom() {
      this.gomokuConnection.connectRoom(this.connectRoom);
    },
  },
};

Vue.createApp(app).mount("#app");
