<template>
  <div>
    <h2 id="qualities-header">My Qualities</h2>
    <div class="qualities-grid">
      <div class="quality-label">Relationships</div>
      <Bar
        :min="min"
        :max="max"
        :value="qualities.relationships.value"
        :delta="qualities.relationships.delta"
      ></Bar>
      <div class="quality-label">Intelligence</div>
      <Bar
        :min="min"
        :max="max"
        :value="qualities.intelligence.value"
        :delta="qualities.intelligence.delta"
      ></Bar>
      <div class="quality-label">Physical Health</div>
      <Bar
        :min="min"
        :max="max"
        :value="qualities.health.value"
        :delta="qualities.health.delta"
      ></Bar>
      <div class="quality-label">Leadership</div>
      <Bar
        :min="min"
        :max="max"
        :value="qualities.leadership.value"
        :delta="qualities.leadership.delta"
      ></Bar>
      <div class="quality-label">Happiness</div>
      <Bar
        :min="min"
        :max="max"
        :value="qualities.happiness.value"
        :delta="qualities.happiness.delta"
      ></Bar>
    </div>
    <h2 id="trophies-header">My Trophies</h2>
    <div class="trophies-cabinet">Soon enough I'll have my first trophy!</div>
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
export default {
  name: "Profile",
  components: {
    Bar,
  },
  created() {
    if (window.qualities) {
      this.qualities = window.qualities;
    }
  },
  methods: {},
  computed: {},
  data() {
    return {
      min: 0,
      max: 100,
      qualities: {
        relationships: { value: 0, delta: 0 },
        intelligence: { value: 0, delta: 0 },
        health: { value: 0, delta: 0 },
        happiness: { value: 0, delta: 0 },
        leadership: { value: 0, delta: 0 },
      },
    };
  },
};
</script>

<style>
#qualities-header {
  margin-bottom: 8px;
}

.qualities-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 6px;
  row-gap: 6px;
  align-items: center;
  justify-items: start;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 16px 8px;
}

.quality {
  display: flex;
  align-items: center;
}

.quality-label {
  margin-right: 10px;
}

#trophies-header {
  margin-bottom: 8px;
}

.trophies-cabinet {
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 20px 8px;
  color: grey;
  font-style: italic;
}
</style>
