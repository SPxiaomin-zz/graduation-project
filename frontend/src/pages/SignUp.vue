<template>
  <div class="sign">
    <div class="image-container">
      <img src="../assets/hamster-head.jpeg" alt="">
    </div>

    <SignIn v-if="signUp" v-on:toggleSignUp="toggleSignUp"></SignIn>
    <SignUp v-else v-on:toggleSignUp="toggleSignUp"></SignUp>
  </div>
</template>

<script>
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'

export default {
  data () {
    return {
      signUp: false,
    }
  },
  components: {
    SignUp,
    SignIn,
  },
  methods: {
    toggleSignUp() {
      this.signUp = !this.signUp
    },
  },
}
</script>

<style scoped>
.sign {
  padding: 75px 30px;
}

.image-container {
  text-align: center;
}

img {
  width: 200px;
  border: 1px solid rgba(64, 158, 255, 0.41);
  border-radius: 50%;
}
</style>
