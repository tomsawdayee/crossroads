<template>
  <div class="bar-container">
    <div
      v-if="+value + +delta > 0"
      class="bar-fill my-gradient-light-blue"
      :style="{ width: calcBarWidth(+value + +delta) }"
    ></div>
    <div
      v-if="value > 0"
      class="bar-fill my-gradient-blue"
      :style="{ width: calcBarWidth(value) }"
    ></div>
    <div class="bar-value">
      {{ +value + +delta }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Bar",
  props: ["min", "max", "value", "delta"],
  methods: {
    calcBarWidth(val) {
      const width = Math.max(
        12,
        Math.min((val / (this.max - this.min)) * 100, 100)
      );
      return `calc(${width}% - 6px)`;
    },
  },
  computed: {},
  data() {
    return {};
  },
};
</script>

<style>
.bar-container {
  background-color: gray;
  border-radius: 15px;
  width: 100%;
  min-width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  -webkit-box-shadow: inset 0px 2px 10px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0px 2px 10px 0px rgba(0, 0, 0, 0.6);
  box-shadow: inset 0px 2px 10px 0px rgba(0, 0, 0, 0.6);
}

.bar-fill {
  border-radius: 13px;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translate(0, -50%);
}

.my-gradient-blue {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#b8e1fc+0,a9d2f3+10,90bae4+25,90bcea+37,90bff0+50,6ba8e5+51,a2daf5+83,bdf3fd+100;Blue+Gloss+%231 */
  background: #b8e1fc; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #b8e1fc 0%,
    #a9d2f3 10%,
    #90bae4 25%,
    #90bcea 37%,
    #90bff0 50%,
    #6ba8e5 51%,
    #a2daf5 83%,
    #bdf3fd 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #b8e1fc 0%,
    #a9d2f3 10%,
    #90bae4 25%,
    #90bcea 37%,
    #90bff0 50%,
    #6ba8e5 51%,
    #a2daf5 83%,
    #bdf3fd 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #b8e1fc 0%,
    #a9d2f3 10%,
    #90bae4 25%,
    #90bcea 37%,
    #90bff0 50%,
    #6ba8e5 51%,
    #a2daf5 83%,
    #bdf3fd 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b8e1fc', endColorstr='#bdf3fd',GradientType=0 ); /* IE6-9 */
}

.my-gradient-light-blue {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#e6f0a3+0,d2e638+50,c3d825+51,dbf043+100;Green+Gloss+%232 */
  background: #e6f0a3; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #e6f0a3 0%,
    #d2e638 50%,
    #c3d825 51%,
    #dbf043 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #e6f0a3 0%,
    #d2e638 50%,
    #c3d825 51%,
    #dbf043 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #e6f0a3 0%,
    #d2e638 50%,
    #c3d825 51%,
    #dbf043 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6f0a3', endColorstr='#dbf043',GradientType=0 ); /* IE6-9 */
}

.bar-value {
  color: white;
  text-shadow: 1px 1px 1px #000000;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
