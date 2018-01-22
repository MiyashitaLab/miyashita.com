<style src="./ArticleCard.css" lang="postcss" module></style>

<template>
  <ItemCard :wide="wide">
    <Link :class="$style.item" :href="item.permalink">
      <div :class="$style.thumbnailImageWrapper">
        <OptimizedImage :class="$style.thumbnailImage" :src="item.thumbnail || noImage" width="350" />
      </div>
      <p v-if="date" :class="$style.datetime">
        <small>
          <time :datetime="date.toISOString()">{{dateText}}</time>
        </small>
      </p>
      <p :class="$style.title">
        <strong>{{item.title}}</strong>
      </p>
      <small :class="$style.readmore">
        <FontAwesome name="angle-right" />
        <span>続きを読む</span>
      </small>
    </Link>
  </ItemCard>
</template>

<script>
import tinytime from 'tinytime';
import ItemCard from './ItemCard';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', {
  padMonth: true,
  padDays: true,
});

export default {
  data: () => ({
    noImage:
      'https://lh3.googleusercontent.com/ypqAGQLHvNZcOfVHv-960lbtticQC98XJfjpA471NLhFQarU8BTdSJicgTmbACdM6yocLNtgaECXRm7Aw5Eqe2PkL_B7skDuRwAbD9gce8LFlVhXP0CfLskrtXmB9M2Tejc9YG_OkJu1pp-7Z8YSpdFPOwAKyVMBrDn7U_5i_3SBkhtPNQq76T9exLzlaec6hVSsWPXTBY9xb3xCvK7SRprxLCYQcPmv-l76yiaiKeXmExm430qwBHLa2MHO1fm4YUIyca22qVHnODFTsphOdSf9tryT7yAMkcuJmeplDu4cPSera2Ac6s8ILfkX9uIgFBMIjyG2Q2VTfJ6JgCF2FBbbqdiYqnHWl_Bg9mMRW2rkqQ36uK0m0X4jR5d7CabLvXToQdVKbWrG2TZTQow0d_Lbx_zvn5JN3w5QObue_jT7naCpGiKd1jzyZwzeL7LB9gz6BlK1Hc704RlkikxVe57rTq7lnQrtsnJwaHKAKS6EY575rHVrxem6C37GkQNVTesXK1S9nkcNmmx3JoAB9uOY7yuF0fWdTQn1d4Szz7l3S2OzbKQbvsqof9l9YLt1Fb0qogRulsP4iY99SKw50BDm-hS9ViWxwHm9wWYOMw=s0',
  }),
  props: {
    item: {
      type: Object,
      required: true,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    date() {
      return this.item.date && new Date(this.item.date);
    },
    dateText() {
      return this.date && dateTemplate.render(this.date);
    },
  },
  components: {
    ItemCard,
  },
};
</script>
