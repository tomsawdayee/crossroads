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
<!--        <img :src="require('./assets/crossroads-upper-header-color.png')" width="300px"/>-->
        <h1 class="header-title">CROSSROADS</h1>
        <h3 class="header-sub-title">Round #1</h3>
      </div>
      <div class="profile-wrap">
        <img :src="require('./assets/asaf.png')" width="60px" id="profile-image"/>
        <span class="stat-wrap">
          <span class="stat-item">{{ user.energy }}<font-awesome-icon :icon="['fas', 'star']"
                                                                      :style="{ marginLeft: '5px',color: '#631878' }"/></span>
          <span class="stat-item">{{ user.coins }}<font-awesome-icon :icon="['fas', 'coins']"
                                                                     :style="{ marginLeft: '5px',color: '#D39C2F' }"/></span>
        </span>
      </div>
    </div>

    <div class="decision-container">
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

    <div id="action-container">
      <button id="reject-button" v-on:click="reject" class="action-button">
        <font-awesome-icon size="3x" :icon="['fas', 'times']" :style="{ color: 'white' }"/>
      </button>
      <button id="accept-button" v-on:click="approve" class="action-button">
        <font-awesome-icon size="3x" :icon="['fas', 'check']" :style="{ color: 'white' }"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Play',
  methods: {
    approve: function (event) {
      let index = this.currentIndex
      const decision = this.decisions[index]
      this.user.energy -= decision.cost.energy || 0
      this.user.coins -= decision.cost.coins || 0

      //This should occur in the backend
      this.user.physicalHealth += decision.effect.physicalHealth || 0
      this.user.happiness += decision.effect.happiness || 0
      this.user.intelligence += decision.effect.intelligence || 0
      this.user.leadership += decision.effect.leadership || 0
      this.currentIndex++
    },
    reject: function (event) {
      this.currentIndex++
    }
  },
  computed: {
    renderedItem: function () {
      let index = this.currentIndex
      return this.decisions[index]
    }
  },
  mounted(){
    setTimeout(() => {
      this.showSplash = false;
    }, 3000)
  },

  // Relationships (R), Intelligence (I), PhysicalHealth (P)
  // Leadership (L), Happiness (H) Resources: Energy, Coins

  data () {
    return {
      showSplash: true,
      user: {energy: 77, coins: 100, physicalHealth: 50, relationships: 50, intelligence: 50, leadership: 50, happiness: 50},
      currentIndex: 0,
      decisions: [
        {
          id: '1',
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {energy: 3},
          effect: {relationships: 2}
        },
        {
          id: '2',
          description: 'Your Grandmother is sick, would you like to visit her?',
          imageUrl: './assets/Grandmother.png',
          cost: {coins: 5, energy: 6},
          effect: {}
        },
        {
          id: '3',
          description: 'Would you like to gather a Team and clean a beach?',
          imageUrl: './assets/cleanBeach.jpg',
          cost: {coins: 2, energy: 3},
          effect: {leadership: 3, happiness: 1}
        },
        {
          id: '4',
          description: 'Would you like to go jogging',
          imageUrl: './assets/GoJogging.jpg',
          cost: {coins: 3, energy: 7},
          effect: {physicalHealth: 3}
        },
        {
          id: '5',
          description: 'Would you like to do meditation',
          imageUrl: './assets/doMeditation.jpg',
          cost: {coins: 2, energy: 7},
          effect: {happiness: 3}
        },
        {
          id: '6',
          description: 'How about going to the university?',
          imageUrl: './assets/GoToUniversity.jpg',
          cost: {coins: 1, energy: 6},
          effect: {intelligence: 10}
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
