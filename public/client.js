// var socket = io();


const app = {
  data() {
    return {
      gomoku: new Gomoku(),
    };
  },
  methods: {
      onClick(x,y) {
          this.gomoku.onClick(x,y)
      }
  }
};

Vue.createApp(app).mount("#app");
