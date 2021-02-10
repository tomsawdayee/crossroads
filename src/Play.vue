<template>
  <div>
    <vue-splash
      class="splash"
      :show="showSplash"
      :logo="require('./assets/crossroads.png')"
      color="#00bfa5"
      :size="300"
      :fixed="true"
    />
    <div id="header">
      <div class="logo-wrap">
        <h1 class="header-title">CROSSROADS</h1>
        <h3 class="header-sub-title">Round #1</h3>
      </div>
      <div class="profile-wrap">
        <img :src="require('./assets/profile.png')" width="60px" id="profile-image"/>
        <span class="stat-wrap">
          <span class="stat-item">{{ this.user.energy.value - this.user.energy.delta }}<font-awesome-icon :icon="['fas', 'star']"
                                                                      :style="{ marginLeft: '5px',color: '#631878' }"/></span>
          <span class="stat-item">{{ this.user.coins.value - this.user.coins.delta }}<font-awesome-icon :icon="['fas', 'coins']"
                                                                     :style="{ marginLeft: '5px',color: '#D39C2F' }"/></span>
        </span>
      </div>
    </div>

    <Tinder ref="tinder" key-name="id" :queue.sync="queue" @submit="onSubmit" v-if="!this.gameEnded">
      <template slot-scope="{data}">
        <div class="decision-container" >
          <div class="decision-badge">
            <div class="cost-wrap">
              <div v-if="data.cost.energy" class="cost-container">
                <font-awesome-icon :icon="['fas', 'star']"
                                   :style="{ marginRight: '2px', color: '#631878' }"/>
                <span>{{ data.cost.energy }}</span>
              </div>
              <div v-if="data.cost.coins" class="cost-container">
                <font-awesome-icon :icon="['fas', 'coins']"
                                   :style="{ marginRight: '2px', color: '#D39C2F' }"/>
                <span>{{ data.cost.coins }}</span>
              </div>
            </div>
          </div>
          <img :src="require(`${data.imageUrl}`)" class="decision-image"/>
          <div class="decision-description">{{ data.description }}</div>
        </div>
      </template>

      <img class="like-pointer" slot="like"  src="./assets/yes_stamp.png">
      <img class="nope-pointer" slot="nope"  src="./assets/no_stamp.png">
    </Tinder>

    <div class="game-over" v-if="this.gameEnded && !this.showProfile">
      <img :src="require('./assets/gameOverDecisions.jpg')" class="game-over" v-on:click="gameOver" v-if="this.reasonForEnd === this.reasonForEndOptions.DECISIONS"/>
      <img :src="require('./assets/gameOverEnergy.jpg')" class="game-over" v-on:click="gameOver" v-if="this.reasonForEnd === this.reasonForEndOptions.ENERGY"/>
      <img :src="require('./assets/gameOverCosts.jpg')" class="game-over" v-on:click="gameOver" v-if="this.reasonForEnd === this.reasonForEndOptions.COINS"/>
      <div class="decision-description">{{ "" }}</div>
    </div>

    <div id="action-container" v-if="!this.gameEnded">
      <div>
        <button id="postpone-button" v-on:click="submitQuestion('postpone')" class="action-button" v-if="renderedItem.canPostpone">
          <font-awesome-icon size="3x" :icon="['fas', 'hourglass-half']" :style="{ color: 'white' }" />
        </button>
      </div>
      <div>
        <button id="reject-button" v-on:click="submitQuestion('no')" class="action-button">
          <font-awesome-icon size="3x" :icon="['fas', 'times']" :style="{ color: 'white' }"/>
        </button>
      </div>
      <div>
        <button id="accept-button" v-on:click="submitQuestion('yes')" class="action-button">
          <font-awesome-icon size="3x" :icon="['fas', 'check']" :style="{ color: 'white' }"/>
        </button>
      </div>
    </div>

    <Profile v-if="this.showProfile"></Profile>
  </div>
</template>

<script>
import Profile from "./views/Profile.vue";
import Tinder from 'vue-tinder'
//check an option of delay between decisions
//greater weights
//add swipe

export default {
  name: 'Play',
  components: {Profile, Tinder},
  methods: {
    onSubmit(type, key, item) {
      if (type.type === "like") {
        this.decide("yes");
      } else {
        this.decide("no");
      }
    },

    submitQuestion: function (answer) {
      if (answer === "yes") {
        this.$refs.tinder.decide("like");
      } else {
        this.$refs.tinder.decide("nope");
      }
    },
    decide: function (answer)
    {
      if (answer !== 'postpone') {
        this.processDecision(answer);
      }

      const nextIndex = this.getNextActionIndex(this.currentIndex);

      if (nextIndex >= this.decisions.length) {
        this.gameEnded = true;
        this.reasonForEnd = this.reasonForEndOptions.DECISIONS;
      } else {
        this.currentIndex = nextIndex;
      }

      if (this.user.energy === 0) {
        this.gameEnded = true;
        this.reasonForEnd = this.reasonForEndOptions.ENERGY;
      }

      if (this.user.coins === 0) {
        this.gameEnded = true;
        this.reasonForEnd = this.reasonForEndOptions.COINS;
      }

      if (this.gameEnded) {
        this.user.coins.delta -= this.user.revenues;
        window.qualities = this.user;
      }

      this.queue = Array.from([this.decisions[nextIndex]]);
    },
    processDecision(answer) {
      const decision = this.decisions[this.currentIndex];
      if (decision) {
        let effect = {};
        if (answer === 'yes') {
          effect = decision.effect.approved;
          const cost = decision.cost;
          this.user.energy.delta += cost.energy || 0;
          this.user.coins.delta += cost.coins || 0;
        } else if (answer === 'no') {
          effect = decision.effect.rejected;
        }

        this.user.health.delta += effect.health || 0;
        this.user.happiness.delta += effect.happiness || 0;
        this.user.intelligence.delta += effect.intelligence || 0;
        this.user.leadership.delta += effect.leadership || 0;
        this.user.relationships.delta += effect.relationships || 0;
        this.user.revenues += effect.coins || 0;
      }
    },
    getNextActionIndex(currentIndex) {
      let idx = currentIndex;
      idx++;
      while (idx < this.decisions.length) {
        const cost = this.decisions[idx].cost;
        const energyNeeded = cost.energy || 0;
        const coinsNeeded = cost.coins || 0;
        const currentEnergy = this.user.energy.value - this.user.energy.delta;
        const currentCoins = this.user.coins.value - this.user.coins.delta;
        if ((currentCoins >= coinsNeeded) && (currentEnergy >= energyNeeded)) {
          break;
        }
        idx++;
      }
      return idx;
    },
    gameOver: function (event) {
      this.showProfile = true
    },
    getData () {
      this.queue = Array.from([this.decisions[0]]);
    }
  },
  computed: {
    renderedItem: function () {
      let index = this.currentIndex
      return this.decisions[index]
    }
  },
  created() {
    this.getData()
  },
  mounted () {
    setTimeout(() => {
      this.showSplash = false
    }, 3000)
  },

  // Relationships (R), Intelligence (I), PhysicalHealth (P)
  // Leadership (L), Happiness (H) Resources: Energy, Coins

  //happiness, leadership, health, intelligence, relationships

  data () {
    return {
      queue: [],
      offset: 0,
      history: [],
      showSplash: true,
      user: {energy:  {value: 100, delta:0} , coins: {value: 20, delta:0}, health: {value: 20, delta:0}, relationships: {value: 0, delta:0}, intelligence: {value: 0, delta:0}, leadership: {value: 0, delta:0}, happiness: {value: 20, delta:0}, revenues: 0},
      currentIndex: 0,
      gameEnded: false,
      showProfile:false,
      reasonForEnd: "",
      reasonForEndOptions: {
        DECISIONS: "DECISIONS",
        ENERGY: "ENERGY",
        COINS: "COINS"
      },
      decisions: [
        {
          id: "1",
          description: "It's a sunny day outside and you have just arrived from school. Would you like to play XBOX?",
          imageUrl: './assets/xbox.jpg',
          cost: {energy: 10, coins: 0},
          effect: {
            approved: { relationships: 0, health: -1, leadership: 0, happiness: 1, intelligence: 1 },
            rejected: { relationships: 0, health: 0, leadership: 0, happiness: -2, intelligence: 0 }
          }
        },
        {
          id: "2",
          description: "You didn't call your grandmother for a while. Would you like to give her a call?",
          canPostpone: true,
          imageUrl: './assets/telephone.jpg',
          cost: {energy: 5, coins: 0},
          effect: {
            approved: { relationships: 2, health: 0, leadership: 0, happiness: 1, intelligence: 0 },
            rejected: { relationships: -2, health: 0, leadership: 0, happiness: 0, intelligence: 0 }
          }
        },
        {
          id: "3",
          description: "A group of friends from your neighborhood are going to clean the park for an hour or two. Would you like to join?",
          imageUrl: './assets/cleanPark.jpg',
          cost: {energy: 35, coins: 0},
          effect: {
            approved: { relationships: 5, health: 0, leadership: 0, happiness: 2, intelligence: 0 },
            rejected: { relationships: 0, health: 0, leadership: 0, happiness: 0, intelligence: 0 }
          }
        },
        {
          id: "4",
          description: "You see a wandering dog with a collar. Will you make the effort to find its owners?",
          imageUrl: './assets/dog.jpg',
          cost: {energy: 15, coins: 0},
          effect: {
            approved: { relationships: 0, health: 0, leadership: 0, happiness: 1, intelligence: 0 },
            rejected: { relationships: 0, health: 0, leadership: 0, happiness: -2, intelligence: 0 }
          }
        },
        {
          id: "5",
          description: "The friends that you cleaned the park with want to go bowling. Would you like to join them?",
          imageUrl: './assets/bowling.jpg',
          cost: {energy: 20, coins: 15},
          effect: {
            approved: { relationships: 4, health: 3, leadership: 0, happiness: 2, intelligence: 0 },
            rejected: { relationships: 0, health: -5, leadership: 1, happiness: 0, intelligence: 0 }
          }
        },
        {
          id: "6",
          description: "Would you like to try and break the record in your favorite XBOX game?",
          imageUrl: './assets/xbox.jpg',
          cost: {energy: 10, coins: 0},
          effect: {
            approved: { relationships: 0, health: -3, leadership: 0, happiness: 1, intelligence: 1 },
            rejected: { relationships: 0, health: 0, leadership: 2, happiness: -1, intelligence: 0 }
          }
        },
        {
          id: "7",
          description: "It got really hot outside today. People could really use a cold drink. Would you like to open a lemonade stand?",
          imageUrl: './assets/lemonadeStand.jpg',
          cost: {energy: 20, coins: 10},
          effect: {
            approved: { relationships: 0, health: 0, leadership: 5, happiness: 0, intelligence: 2, coins: 3 },
            rejected: { relationships: 0, health: 0, leadership: 0, happiness: 0, intelligence: 0 }
          }
        },
        {
          id: "8",
          description: "It got cloudy outside. Do you want to complete your math homework?",
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {energy: 10, coins: 0},
          effect: {
            approved: { relationships: -5, health: -1, leadership: 0, happiness: -2, intelligence: 10 },
            rejected: { relationships: 0, health: 0, leadership: 0, happiness: 3, intelligence: -3 }
          }
        },
        {
          id: "9",
          description: "Your grandmother misses you. You didn't even call her. Maybe visit her?",
          imageUrl: './assets/Grandmother.png',
          cost: {energy: 15, coins: 0},
          effect: {
            approved: { relationships: 1, health: 0, leadership: 0, happiness: 1, intelligence: 0, coins: 5 },
            rejected: { relationships: -5, health: 0, leadership: 0, happiness: -2, intelligence: 0 }
          }
        }
      ]
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

body {
  padding: 0 10px;
}
.decision-container {
  list-style-type: none;
  padding: 8px;
  border-radius: 10px;
  background: #F7F6F6;
  position: relative;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
}

.decision-container .decision-description {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 28px;
  padding: 5px;
  font-size: 1.2rem;
}

.decision-container .decision-image {
  width: 100%;
  border-radius: 10px;
  height: 320px;
  object-fit: cover;
}

.game-over {
  width: 100%;
  border-radius: 10px;
  height: 380px;
  object-fit: fill;
  margin-top: 20px;
}

#action-container {
  text-align: center;
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
}

#top-users {
  text-align: center;
  margin-top: 15px;
}

.top-users-title {
  text-align: left;
}

.stat-item {
  margin-right: 10px;
}

.action-button {
  border: none;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  outline: none;
  border: 10px solid #F7F6F6;
  border-style: double;
  cursor: pointer;
}

.action-button#accept-button {
  background-color: #629C44;
}

.action-button#reject-button {
  background-color: #B70F0A;
}

.action-button#postpone-button {
  background-color: #174bda;
  width: 60px;
  height: 60px;
  font-size: 0.4rem;
  border-width: 6px;
}

.decision-badge {
  width: 90px;
  height: 90px;
  background: #F7F6F6;
  position: absolute;
  right: 30px;
  top: -35px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cost-wrap {
  font-size: 22px;
}

.cost-container {
  margin-bottom: 3px;
}

.stat-wrap {
  text-align: left;
  font-size:22px;
}

#header {
  text-align: left;
}

#profile-image {
  border-radius: 50%;
  margin-right:10px;
}

.logo-wrap {
  text-align: center;
}

.profile-wrap {
  display: flex;
  align-items: center;
  margin-top:15px;
}

.splash {
  z-index: 200;
}

.header-title {
  color: #6CB1A4;
  margin: 5px;
}

.header-sub-title {
  margin-top: 10px;
  margin-bottom: 10px;
}
.vue-tinder {
  margin-top: 25px;
  height: 450px;
}

.tinder-card{
  overflow: visible !important;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 55%;
  height: 80px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}
</style>
