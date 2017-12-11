<style lang="postcss" module>
@import '~/styles/variables.css';

.base {
  display: flex;
  padding-top: 1rem;
  justify-content: center;
}

.wrapper {
  display: inline-flex;
  max-width: 100%;
  justify-content: center;
  flex-wrap: nowrap;
  list-style-type: none;
  box-shadow: 0 2px 5px 0 color(var(--black) alpha(0.25));
}

.link-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  flex: 0 1 auto;
}

.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 0 1 auto;
  height: 2em;
}

.enabled {
  color: var(--cyan);
  background-color: transparent;

  &:hover {
    color: var(--white);
    background-color: color(var(--cyan) alpha(0.75));
  }
}

.disabled {
  color: color(var(--black) alpha(0.25));

  &:hover {
    color: color(var(--black) alpha(0.25));
  }
}

.current {
  background-color: var(--cyan);
  color: var(--white);

  &:hover {
    color: var(--white);
  }
}
</style>

<template>
  <div :class="$style.base">
    <ul :class="$style.wrapper">
      <li v-if="isShownPrevDots" :class="$style.linkWrapper">
        <span :class="[$style.link, $style.disabled]">...</span>
      </li>
      <template v-for="cnt in pagination">
        <li :key="cnt" :class="$style.linkWrapper">
          <Link v-if="cnt !== current" :class="[$style.link, $style.enabled]" :href="generatePath(cnt)">{{cnt}}</Link>
          <span v-else :class="[$style.link, $style.current]">{{cnt}}</span>
        </li>
      </template>
      <li v-if="isShownNextDots" :class="$style.linkWrapper">
        <span :class="[$style.link, $style.disabled]">...</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  computed: {
    pagination() {
      const startShowCount = Math.max(this.current - 2, 1);
      const lastShowCount = Math.min(this.current + 2, this.maxCount);
      const pagenation = [];
      for (let cnt = startShowCount; cnt <= lastShowCount; cnt++) {
        pagenation.push(cnt);
      }
      return pagenation;
    },
    isShownPrevDots() {
      return this.current - 2 > 1;
    },
    isShownNextDots() {
      return this.current + 2 < this.maxCount;
    },
  },
  methods: {
    generatePath(cnt) {
      if (cnt <= 1) {
        return this.basePath;
      }
      return `${this.basePath}page/${cnt}/`;
    },
  },
};
</script>
