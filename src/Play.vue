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
        <img :src="require('./assets/asaf.png')" width="60px" id="profile-image"/>
        <span class="stat-wrap">
          <span class="stat-item">{{ this.user.energy.value - this.user.energy.delta }}<font-awesome-icon :icon="['fas', 'star']"
                                                                      :style="{ marginLeft: '5px',color: '#631878' }"/></span>
          <span class="stat-item">{{ this.user.coins.value - this.user.coins.delta }}<font-awesome-icon :icon="['fas', 'coins']"
                                                                     :style="{ marginLeft: '5px',color: '#D39C2F' }"/></span>
        </span>
      </div>
    </div>

    <div class="decision-container" v-if="!this.gameEnded">
      <div class="decision-badge">
        <div class="cost-wrap">
          <div v-if="renderedItem.cost.energy" class="cost-container">
            <font-awesome-icon :icon="['fas', 'star']"
                               :style="{ marginRight: '2px', color: '#631878' }"/>
            <span>{{ renderedItem.cost.energy }}</span>
          </div>
          <div v-if="renderedItem.cost.coins" class="cost-container">
            <font-awesome-icon :icon="['fas', 'coins']"
                               :style="{ marginRight: '2px', color: '#D39C2F' }"/>
            <span>{{ renderedItem.cost.coins }}</span>
          </div>
        </div>
      </div>
      <img :src="require(`${renderedItem.imageUrl}`)" class="decision-image"/>
      <div class="decision-description">{{ renderedItem.description }}</div>
    </div>

    <div class="game-over" v-if="this.gameEnded && !this.showProfile">
      <img :src="require('./assets/gameOver.jpg')" class="game-over" v-on:click="gameOver" v-if="this.reasonForEnd === this.reasonForEndOptions.DECISIONS"/>
      <img :src="require('./assets/gameOver.jpg')" class="game-over" v-on:click="gameOver" v-if="this.reasonForEnd === this.reasonForEndOptions.ENERGY"/>
      <img :src="require('./assets/gameOver.jpg')" class="game-over" v-on:click="gameOver" v-if="this.reasonForEnd === this.reasonForEndOptions.COINS"/>
      <div class="decision-description">{{ "" }}</div>
    </div>

    <div id="action-container" v-if="!this.gameEnded">
      <button id="postpone-button" v-on:click="reject" class="action-button" v-if="renderedItem.canPostpone">
        <font-awesome-icon size="3x" :icon="['fas', 'hourglass-half']" :style="{ color: 'white' }" />
      </button>
      <button id="reject-button" v-on:click="reject" class="action-button">
        <font-awesome-icon size="3x" :icon="['fas', 'times']" :style="{ color: 'white' }"/>
      </button>
      <button id="accept-button" v-on:click="approve" class="action-button">
        <font-awesome-icon size="3x" :icon="['fas', 'check']" :style="{ color: 'white' }"/>
      </button>
    </div>

    <Profile v-if="this.showProfile"></Profile>
  </div>
</template>

<script>
import Profile from "./views/Profile.vue";

export default {
  name: 'Play',
  components: {Profile},
  methods: {
    approve: function (event) {
      let index = this.currentIndex
      const decision = this.decisions[index]

      //check enough energy/enough money
      //check an option of delay between decisions
      //add effect in reject/approve
      //greater weights
      //every effect should have minus value too
      //shorter page
      //game over two option image
      //youre too tired in order to continue
      //the decisions for today are over
      //if (enough energy) end game DONE
      //add swipe

      if(decision) {
        this.user.energy.delta += decision.cost.energy || 0
        this.user.coins.delta += decision.cost.coins || 0

        this.user.health.delta += decision.effect.health || 0
        this.user.happiness.delta += decision.effect.happiness || 0
        this.user.intelligence.delta += decision.effect.intelligence || 0
        this.user.leadership.delta += decision.effect.leadership || 0
        this.user.relationships.delta += decision.effect.relationships || 0

        this.currentIndex++
      }

      if(this.currentIndex === this.decisions.length) {
        this.gameEnded = true
        this.reasonForEnd = this.reasonForEndOptions.DECISIONS
      }

      if(this.user.energy === 0) {
        this.gameEnded = true
        this.reasonForEnd = this.reasonForEndOptions.ENERGY
      }

      if(this.user.coins === 0) {
        this.gameEnded = true
        this.reasonForEnd = this.reasonForEndOptions.COINS
      }

      if(this.gameEnded){
        window.qualities = this.user
      }
    },
    reject: function (event) {
      this.currentIndex++
      this.gameEnded = this.currentIndex === this.decisions.length
      if(this.gameEnded){
        window.qualities = this.user
      }
    },
    gameOver: function (event) {
      this.showProfile = true
    }
  },
  computed: {
    renderedItem: function () {
      let index = this.currentIndex
      return this.decisions[index]
    }
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
      showSplash: true,
      user: {energy:  {value: 100, delta:0} , coins: {value: 20, delta:0}, health: {value: 20, delta:0}, relationships: {value: 0, delta:0}, intelligence: {value: 0, delta:0}, leadership: {value: 0, delta:0}, happiness: {value: 20, delta:0}},
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
          id: '1',
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {energy: 7},
          effect: {relationships: 2}
        },
        {
          id: '2',
          description: 'Would you like to open a Lemonade stand?',
          canPostpone: true,
          imageUrl: './assets/lemonadeStand.jpg',
          cost: {coins: 3, energy: 10},
          effect: {relationships: 2, happiness: 2}
        },
        {
          id: '3',
          description: 'Your Grandmother is sick, would you like to visit her?',
          imageUrl: './assets/Grandmother.png',
          cost: {energy: 5},
          effect: {happiness: 2, relationships: 2}
        },
        {
          id: '4',
          description: 'Would you like to gather a Team and clean a beach?',
          imageUrl: './assets/cleanBeach.jpg',
          cost: {energy: 10},
          effect: {leadership: 3, happiness: 1}
        },
        {
          id: '5',
          description: 'Would you like to go jogging',
          imageUrl: './assets/GoJogging.jpg',
          cost: {energy: 10},
          effect: {health: 3}
        },
        {
          id: '6',
          description: 'Would you like to do meditation',
          imageUrl: './assets/doMeditation.jpg',
          cost: {energy: 2},
          effect: {health: 3, happiness: 3}
        },
        {
          id: '7',
          description: 'How about going to the university?',
          imageUrl: './assets/GoToUniversity.jpg',
          cost: {coins: 1, energy: 15},
          effect: {intelligence: 10, happiness: 1, relationships: 2}
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
  margin-top: 25px;
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
  height: 380px;
  object-fit: cover;
}

.game-over {
  width: 100%;
  border-radius: 10px;
  height: 380px;
  object-fit: cover;
}

#action-container {
  text-align: center;
  margin-top: 25px;
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
}

.action-button#accept-button {
  background-color: #629C44;
}

.action-button#reject-button {
  background-color: #B70F0A;
  margin-right: 20px;
}

.action-button#postpone-button {
  background-color: #0000FF;
  margin-right: 20px;
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
  z-index: 1;
}

.header-title {
  color: #6CB1A4;
  margin: 5px;
}

.header-sub-title {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
