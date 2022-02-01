const app = {
  data() {
    return {
      gomoku: new Gomoku(),
      gomokuConnection: new GomokuConnection(),
    };
  },
  mounted() {
    this.gomokuConnection.receiveMove(this.gomoku);
    this.gomokuConnection.receiveRoomNumber();
    this.gomokuConnection.receiveIsFirstPlayer();
  },
  methods: {
    onClick(x, y) {
      this.gomoku.move(x, y);
      this.gomokuConnection.sendMove(this.gomokuConnection.roomNumber, x, y);
    },
  },
};

Vue.createApp(app).mount("#app");
