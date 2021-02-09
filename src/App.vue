<template>
  <div id="app">

    <span class="stat-item">Energy: {{ user.energy }}<font-awesome-icon :icon="['fas', 'star']"
                                                                        :style="{ marginLeft: '5px',color: '#631878' }"/></span>
    <span class="stat-item">Coins: {{ user.coins }}<font-awesome-icon :icon="['fas', 'coins']"
                                                                    :style="{ marginLeft: '5px',color: '#D39C2F' }"/></span>
    <div class="decision-container">
      <div class="decision-badge">
        <div class="cost-wrap">
          <div v-if="renderedItem.effect.energy" class="cost-container">
            <font-awesome-icon :icon="['fas', 'star']"
                               :style="{ marginRight: '2px', color: '#631878' }"/>
            <span>{{ renderedItem.effect.energy }}</span>
          </div>
          <div v-if="renderedItem.effect.coins" class="cost-container">
            <font-awesome-icon :icon="['fas', 'coins']"
                               :style="{ marginRight: '2px', color: '#D39C2F' }"/>
            <span>{{ renderedItem.effect.coins }}</span>
          </div>
          <div v-if="renderedItem.effect.physicalHealth" class="cost-container">
            <font-awesome-icon :icon="['fas', 'heartbeat']"
                               :style="{ marginRight: '2px', color: '#FF0707' }"/>
            <span>{{ renderedItem.effect.physicalHealth }}</span>
          </div>
          <div v-if="renderedItem.effect.happiness" class="cost-container">
            <font-awesome-icon :icon="['fas', 'heartbeat']"
                               :style="{ marginRight: '2px', color: '#FF0707' }"/>
            <span>{{ renderedItem.effect.happiness }}</span>
          </div>
          <div v-if="renderedItem.effect.intelligence" class="cost-container">
            <font-awesome-icon :icon="['fas', 'brain']"
                               :style="{ marginRight: '2px', color: '#FF0707' }"/>
            <span>{{ renderedItem.effect.intelligence }}</span>
          </div>
          <div v-if="renderedItem.effect.leadership" class="cost-container">
            <font-awesome-icon :icon="['fas', 'users']"
                               :style="{ marginRight: '2px', color: '#631878' }"/>
            <span>{{ renderedItem.effect.leadership }}</span>
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

    <div id="top-scores">
        <div class= "top-users-title">
          Top Users
        </div>
        <ul>
          <li v-for="topUser in topUsers" :key="topUser.id">

             {{ "Name : " + topUser.name}}
             <font-awesome-icon :icon="['fas', 'star']" :style="{ marginRight: '2px', color: '#631878' }"/>
             {{" Energy: " + topUser.energy}}
             {{" Coins: " + topUser.coins }}
             <font-awesome-icon :icon="['fas', 'coins']"
                                 :style="{ marginRight: '2px', color: '#D39C2F' }"/>
            </li>
        </ul>
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
      this.user.energy += decision.effect.energy || 0
      this.user.coins += decision.effect.coins || 0
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

  data () {
    return {
      user: {energy: 77, coins: 100, physicalHealth: 50, relationships: 50, intelligence: 50, leadership: 50, happiness: 50},
      currentIndex: 0,
      topUsers: [
          { id: "user1", name : "Eitan", energy: 95, coins: 1010},
          { id: "user2", name : "Yulia", energy: 90, coins: 953}
      ],
      decisions: [
        {
          id: '1',
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          effect: {relationships: 2, energy: -3}
        },
        {
          id: '2',
          description: 'Your Grandmother is sick, would you like to visit her?',
          imageUrl: './assets/Grandmother.png',
          effect: {coins: -2, energy: 3}
        },
        {
          id: '3',
          description: 'Would you like to gather a Team and clean a beach?',
          imageUrl: './assets/cleanBeach.jpg',
          effect: {leadership: 3, happiness: 1}
        },
        {
          id: '4',
          description: 'Would you like to go jogging',
          imageUrl: './assets/GoJogging.jpg',
          effect: {physicalHealth: 3, energy: -2}
        },
        {
          id: '5',
          description: 'Would you like to do meditation',
          imageUrl: './assets/doMeditation.jpg',
          effect: {happiness: 3, energy: -2}
        },
        {
          id: '6',
          description: 'How about going to the university?',
          imageUrl: './assets/GoToUniversity.jpg',
          effect: {intelligence: 10, coins: -3}
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
  margin-top:15px;
}

#top-users {
  text-align: center;
  margin-top:15px;
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
  width: 60px;
  height: 60px;
  background: #F7F6F6;
  position: absolute;
  right: 20px;
  top: -25px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.cost-wrap {
  font-size: 14px;
  margin-top: 12px;
}

.cost-container {
  margin-bottom: 3px;
}

</style>
