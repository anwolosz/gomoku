const app = {
  data() {
    return {
      gomoku: new Gomoku(),
      gomokuConnection: new GomokuConnection(),
    };
  },
  mounted() {
    this.gomokuConnection.onConnect();
    this.gomokuConnection.receiveMove(this.gomoku);
    this.gomokuConnection.changeStatus();
    this.gomokuConnection.start(this.gomoku);
    this.gomokuConnection.error();
  },
  methods: {
    onClick(x, y) {
      this.gomokuConnection.sendMove(this.gomoku, x, y);
    },
    onCreateRoom() {
      this.gomokuConnection.createRoom();
    },
    onConnectRoom() {
      this.gomokuConnection.connectRoom();
    },
  },
};

Vue.createApp(app).mount("#app");
