<style src="./MemberCard.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <Link :href="info.permalink">
      <div :class="$style.image">
        <FaceImage :src="info.avatar" />
      </div>
      <div :class="$style.description">
        <p :class="$style.descriptionLine">
          <small :class="$style.status">{{status}}</small>
        </p>
        <p :class="$style.descriptionLine">
          <span :class="$style.name">
            <span>{{info.title}}</span>
            <FontAwesome name="angle-right" />
          </span>
        </p>
      </div>
    </Link>
  </div>
</template>

<script>
import FaceImage from './FaceImage';

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    status() {
      const info = this.info;
      return info.category === '99_OB'
        ? `${info.year_of_graduation}年度卒業`
        : `${info.category.split('_')[1]}${info.school_year || ''}`;
    },
  },
  components: {
    FaceImage,
  },
};
</script>
