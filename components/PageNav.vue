<style src="./PageNav.css" lang="postcss" module></style>

<template>
  <nav :class="$style.base">
    <div :class="$style.wrapper">
      <div :class="[$style.col, $style.rightCol]">
        <Link :class="$style.logoImgWrapper" href="/">
          <OptimizedImage :class="$style.logoImg" :src="logoImg" :progressive="false" alt="logo" />
        </Link>
      </div>
      <div :class="[$style.col, $style.leftCol]">
        <div :class="$style.searchInputWrapper">
          <SearchInput />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchInput from './SearchInput';

export default {
  data: () => ({
    logoImg:
      'https://lh3.googleusercontent.com/GWKvlXElFO095znbPRbexWAhGOoPAgdpZTGIhTUmLwCk6qiPShZaO9wHcpnuCyj9Ao14qgTixzWF6Bhgyna__6LXVvMSLgrdoiTcO4BsSpVu0M7_7Mf2xkdjDPgjUqhIHUUIs3BbgIQvOyCxVXf3gNI-K5N_W37xqfcWhED68B26bfit31qx0nGWyfGwPKT8Y9A2yWJrQPbfkWaOJB0Qqu4Swr3zYCrozrXVRtqbe0BtXILmmTmGeVQ9Ed7YgVyJIoSPFCwIXnkDijdUk2-ixB-NeBZ0IN_TkMh1bxbLUswN9ZwBcMStCM3KZUS6N0Nq6R2S8A3ISgBLN8YU7hT48Fr5y6EBd_BHmXpXBphXVCPGocGCz1AAutaNK1ocpIrTcuqLiXiSRJOm4Ae5ErX_h2EsXHmpEelJHx7d3Em2UkkI0v2rCRQQfkgxl-SFIae272f6ggj778HotznlLrHr1cSQI0uJOmK0cNRc9iUF3-TZFrsOz65KzDfSyNcIplQDpn8QGVF9HmdysmnWlXVpA-4kHzn6s6ctxcnAbdBuhq68CNvbs8ILpkXlY6Z3C1DkxRQzQ2v612ktTmR7b2nQKBF4TgWoOmD0CpVCqN5dGg=s0',
  }),
  components: {
    SearchInput,
  },
};
</script>
