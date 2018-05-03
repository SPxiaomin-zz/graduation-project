<template>
  <div class="hamster">
    <div class="header">

      <div class="btn-container">
        <el-button type="primary" @click="startGame" :disabled="playing">开始游戏</el-button>
        <el-button @click="endGame" :disabled="!playing">结束游戏</el-button>
      </div>

      <div class="game-infos">
        <span>分数: {{ score }}分</span>
        /
        <span>命中率: {{ hitRate }}%</span>
        /
        <span>倒计时: {{ timeLeft_secs }}s</span>
      </div>

      <div class="funs-container">
        <el-input
          class="mouse-present-sequence"
          placeholder="老鼠出现次序(<6)"
          v-model="firstMousesString"
          :disabled="playing"></el-input>

        <el-select
          v-model="speed"
          placeholder="调速"
          :disabled="playing">
          <el-option
            v-for="item in speedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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

      playing: false,

      timeLeftInterval: null,
      releaseInterval: null,

      dialogVisible: false,

      firstMousesString: '',
      firstMouses: [],

      speedOptions: [
        { label: '1倍速度', value: 1 },
        { label: '3倍速度', value: 3 },
        { label: '6倍速度', value: 6 },
      ],
      speed: 1,
    }
  },
  computed: {
  },
  watch: {
    firstMousesString() {
      this.firstMouses = this.firstMousesString.slice(0, 6).split('')
    },
  },
  methods: {
    hitHamsterHandler(coordinate) {
      if (!this.playing) return

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
          return this.endGame()
        }
      }, 1000)
    },

    releaseHamster() {
      let hamsterCoordinate

      if (this.firstMouses.length) {
        const position = this.firstMouses.shift() 
        hamsterCoordinate = {
          1: '11',
          2: '12',
          3: '13',
          4: '21',
          5: '22',
          6: '23',
          7: '31',
          8: '32',
          9: '33',
        }[position]

        this.cellHavingHamster.push(hamsterCoordinate)
      } else {
        const tempI = Math.floor(Math.random() * 3 + 1)
        const tempJ = Math.floor(Math.random() * 3 + 1)
        hamsterCoordinate = `${tempI}${tempJ}`
  
        this.cellHavingHamster.push(hamsterCoordinate)
      }


      setTimeout(() => {
        const index = this.cellHavingHamster.indexOf(hamsterCoordinate)

        if (index !== -1) {
          this.cellHavingHamster.splice(index, 1)
        }
      }, 3000 / this.speed)
    },

    startGame() {
      this.playing = true

      this.releaseInterval = setInterval(this.releaseHamster, 1000)
      this.calculateTimeLeft()
    },

    endGame() {
      this.playing = false

      clearInterval(this.timeLeftInterval)
      clearInterval(this.releaseInterval)

      this.tempScoreInfo = {
        score: this.score,
        hitRate: this.hitRate,
      }
      this.dialogVisible = true
      
      fetch('/hamster/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `score=${this.score}&hitRate=${this.hitRate}`,
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })

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
  height: 25%;

  .btn-container {
    text-align: center;
    padding-top: 20px;
  }

  .game-infos {
    text-align: center;
    line-height: 50px;
  }

  .funs-container {
    display: flex;
  }

  .mouse-present-sequence {
    width: auto;
  }
}

/*
 * playground 
 */

.playground {
  width: 100%;
  height: 75%;

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

