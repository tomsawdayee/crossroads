<template>
  <div id="app">
    <div id="header">
      <div class="logo-wrap">
        <img :src="require('./assets/crossroads-upper-header-color.png')" width="300px"/>
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
  name: 'App',
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

  // Relationships (R), Intelligence (I), PhysicalHealth (P)
  // Leadership (L), Happiness (H) Resources: Energy, Coins

  data() {
    return {
      user: {
        energy: 77,
        coins: 100,
        physicalHealth: 50,
        relationships: 50,
        intelligence: 50,
        leadership: 50,
        happiness: 50
      },
      currentIndex: 0,
      decisions: [
        {
          id: '1',
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {coins: 2, energy: 4},
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
#app {
  width: 400px;
  margin: 50px auto 0;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 17px;
}

.decision-container {
  list-style-type: none;
  padding: 0px;
  border: 1px solid black;
  padding: 8px;
  border-radius: 5px;
  background: #F7F6F6;
  position: relative;
  margin-top: 15px;
}

.decision-container .decision-description {
  margin: 20px 0;
}

.decision-container .decision-image {
  width: 100%;
  border-radius: 5px;
}

#action-container {
  text-align: center;
  margin-top: 15px;
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
  height: 60px;
  width: 60px;
  border-radius: 50%;
  outline: none;
}

.action-button#accept-button {
  background-color: #629C44;
}

.action-button#reject-button {
  background-color: #B70F0A;
  margin-right: 20px;
}

.decision-badge {
  width: 70px;
  height: 70px;
  background: #F7F6F6;
  position: absolute;
  right: 20px;
  top: -25px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cost-wrap {
  font-size: 16px;
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
}

</style>
