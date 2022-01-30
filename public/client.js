// var socket = io();


const app = {
  data() {
    return {
      gomoku: new Gomoku(),
    };
  },
  methods: {
      onClick(x,y) {
          this.gomoku.move(x,y)
      }
  }
};

Vue.createApp(app).mount("#app");
