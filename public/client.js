const app = {
  data() {
    return {
      gomoku: new Gomoku("X", "Y"),
      gomokuConnection: new GomokuConnection(),
    };
  },
  mounted() {
    this.gomokuConnection.receiveMove(this.gomoku);
    this.gomokuConnection.receiveRoomNumber();
    this.gomokuConnection.receiveIsFirstPlayer(this.gomoku);
  },
  methods: {
    onClick(x, y) {
      this.gomoku.move(x, y, this.gomokuConnection.id);
      this.gomokuConnection.sendMove(this.gomokuConnection.roomNumber, x, y);
    },
  },
};

Vue.createApp(app).mount("#app");
