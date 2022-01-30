const app = {
  data() {
    return {
      gomoku: new Gomoku(),
      gomokuConnection: new GomokuConnection(),
    };
  },
  mounted() {
    this.gomokuConnection.getMove(this.gomoku);
  },
  methods: {
    onClick(x, y) {
      this.gomoku.move(x, y);
      this.gomokuConnection.sendMove(x, y);
    },
  },
};

Vue.createApp(app).mount("#app");
