<template>
  <div class="hamster">
    <div class="header">
      <div class="btn-container">
        <el-button type="primary">开始游戏</el-button>
        <el-button>结束游戏</el-button>
      </div>
      <div class="game-infos">
        <span>分数: {{ score }}分</span>
        /
        <span>命中率: {{ hitRate }}%</span>
        /
        <span>倒计时: {{ timeLeft_secs }}s</span>
      </div>
    </div>

    <table class="playground">
      <tbody>
        <tr v-for="i in [1, 2, 3]" :key="i">
          <td
            v-for="j in [1, 2, 3]"
            :key="j"
            @click="hitHamsterHandler([i, j])"
            class="cell"
            v-if="cellHavingHamster.includes(`${i}${j}`)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      hitRate: 0,
      timeLeft_secs: 0,
      cellHavingHamster: [],
    }
  },
  methods: {
    hitHamsterHandler(coordinate) {
      const [i, j] = coordinate
    },

    calculateTimeLeft() {

    },

    releaseHamster() {
      
    },

    startGame() {

    },

    endGame() {

    },
  },
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.hamster {
  height: 100vh;
}

/*
 * header
 */

.header {
  height: 20%;

  .btn-container {
    text-align: center;
    padding-top: 20px;
  }

  .game-infos {
    text-align: center;
    line-height: 50px;
  }
}

/*
 * playground 
 */

.playground {
  width: 100%;
  height: 80%;

  .cell {
    background-color: rgba(64, 158, 255, 0.11);
  }
}
</style>

