<style src="./CardList.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <div v-if="!wrap" :class="$style.scrollButton" @click="onClickLeft">
      <FontAwesome
        name="angle-left"
        :class="{ [$style.scrollButtonDisabled]: isFirst }"
      />
    </div>

    <div :class="$style.outer">
      <div
        :class="{
          [$style.inner]: true,
          [$style.innerWrap]: wrap,
        }"
        :style="{ transform: `translate3D(-${100 * scroll / 3}%, 0, 0)` }"
      >
        <slot/>
      </div>
    </div>

    <div v-if="!wrap" :class="$style.scrollButton" @click="onClickRight">
      <FontAwesome
        name="angle-right"
        :class="{ [$style.scrollButtonDisabled]: isLast }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    scroll: 0,
  }),
  props: {
    wrap: { type: Boolean, default: false },
    itemsLength: { type: Number, required: true },
  },
  computed: {
    isFirst() {
      return this.scroll === 0;
    },
    isLast() {
      return this.scroll >= this.itemsLength - 3;
    },
  },
  methods: {
    onClickLeft() {
      this.scroll = Math.max(this.scroll - 1, 0);
    },
    onClickRight() {
      this.scroll = Math.min(this.scroll + 1, this.itemsLength - 3);
    },
  },
};
</script>
