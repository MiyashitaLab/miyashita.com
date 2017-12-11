<style src="./SearchInput.css" lang="postcss" module></style>

<template>
  <form method="GET" action="https://research.miyashita.com/search/" :class="$style.base">
    <input type="text" placeholder="論文データベース検索" name="q" :class="$style.input" />
    <FontAwesome name="search" />
  </form>
</template>
