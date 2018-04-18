<template>
  <div class="hamster">
    <div class="header">
      <div class="btn-container">
        <el-button type="primary" @click="startGame">开始游戏</el-button>
        <el-button @click="endGame">结束游戏</el-button>
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
            class="cell">
            <img
              class="hamster"
              v-if="cellHavingHamster.includes(`${i}${j}`)" 
              src="../assets/hamster.jpeg"
              alt="">
          </td>
        </tr>
      </tbody>
    </table>

    <el-dialog
      title="战绩"
      :visible.sync="dialogVisible"
      width="80%">
      <span>分数：{{ this.tempScoreInfo.score }}分</span>
      /
      <span>命中率: {{ this.tempScoreInfo.hitRate }}%</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">继续游戏</el-button>
        <el-button type="primary" @click="jumpScorePage">查看分数</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      hitRate: 0,
      timeLeft_secs: 60,
      cellHavingHamster: [],
      tempScoreInfo: {},

      timeLeftInterval: null,
      releaseInterval: null,

      dialogVisible: false,
    }
  },
  methods: {
    hitHamsterHandler(coordinate) {
      this.score += 1
      this.hitRate = ((this.score / 60) * 100).toFixed(2)

      const index = this.cellHavingHamster.indexOf(coordinate.join(''))

      if (index !== -1) {
        this.cellHavingHamster.splice(index, 1)
      }
    },

    calculateTimeLeft() {
      this.timeLeftInterval = setInterval(() => {
        this.timeLeft_secs -= 1

        if (this.timeLeft_secs == 0) {
          return endGame()
        }
      }, 1000)
    },

    releaseHamster() {
      const tempI = Math.floor(Math.random() * 3 + 1)
      const tempJ = Math.floor(Math.random() * 3 + 1)
      const hamsterCoordinate = `${tempI}${tempJ}`

      this.cellHavingHamster.push(hamsterCoordinate)

      setTimeout(() => {
        const index = this.cellHavingHamster.indexOf(hamsterCoordinate)

        if (index !== -1) {
          this.cellHavingHamster.splice(index, 1)
        }
      }, 3000)
    },

    startGame() {
      this.releaseInterval = setInterval(this.releaseHamster, 1000)
      this.calculateTimeLeft()
    },

    endGame() {
      clearInterval(this.timeLeftInterval)
      clearInterval(this.releaseInterval)

      this.tempScoreInfo = {
        score: this.score,
        hitRate: this.hitRate,
      }
      this.dialogVisible = true

      this.score = 0
      this.hitRate = 0
      this.timeLeft_secs =  60
      this.cellHavingHamster = []
    },

    jumpScorePage() {
      this.$router.push('/score')
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
    width: 30%;
    height: 30%;
    text-align: center;
    vertical-align: center;

    .hamster {
      width: 100px;
      height: 100px;
    }
  }
}
</style>

