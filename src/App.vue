<template>
  <div id="app">

    <span class="stat-item">Energy: {{ user.energy }}<font-awesome-icon :icon="['fas', 'star']"
                                                                        :style="{ marginLeft: '5px',color: '#631878' }"/></span>
    <span class="stat-item">Coins: {{ user.coins }}<font-awesome-icon :icon="['fas', 'coins']"
                                                                      :style="{ marginLeft: '5px',color: '#D39C2F' }"/></span>

    <ul id="decisions-list">
      <li v-for="item in decisions" :key="item.id" v-if="item.isVisible">
        <img :src="require(`${item.imageUrl}`)" class="decision-image"/>
        <div class="decision-description">{{ item.description }}</div>
      </li>
    </ul>
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
      alert('approve clicked')
    },
    reject: function (event) {
      alert('reject clicked')
    }
  },
  data () {
    return {
      user: {energy: 77, coins: 100},
      decisions: [
        {
          id: '1',
          isVisible: true,
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {coins: 2, energy: 4}
        },
        {
          id: '2',
          isVisible: false,
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {coins: 2, energy: 4}
        },
        {
          id: '3',
          isVisible: false,
          description: 'Asaf needs help with his homework in math. Would you like to assist?',
          imageUrl: './assets/Parenting-Help.jpg',
          cost: {coins: 2, energy: 4}
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

#decisions-list {
  list-style-type: none;
  padding: 0px;
}

#decisions-list li {
  border: 1px solid black;
  padding: 8px;
  border-radius: 5px;
  background: #F7F6F6;
}

#decisions-list .decision-description {
  margin: 20px 0;
}

#decisions-list .decision-image {
  width: 100%;
  border-radius: 5px;
}

#action-container {
  text-align: center;
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

</style>
