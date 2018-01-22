<style src="./ReadmoreCard.css" lang="postcss" module></style>

<template>
  <ItemCard :wide="wide">
    <Link :class="$style.base" :href="href">
      <div>
        <FontAwesome :class="$style.iconCircle" name="arrow-right" />
      </div>
      <div :class="$style.textWrapper">
        <span :class="$style.text">
          <strong>もっと見る</strong>
        </span>
      </div>
    </Link>
  </ItemCard>
</template>

<script>
import ItemCard from './ItemCard';

export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ItemCard,
  },
};
</script>
