<template>
  <div class="gameLibrary-container">
    <div class="main">
      <game-filter />
      <games-list />
    </div>

    <div class="side">
      <!-- 新闻组件 -->
      <news type="side" :showMore="true" :showFooter="false" :showPaging="false" />
    </div>
  </div>
</template>

<script>
import GameFilter from '@/components/GameLibrary/Filter-card.vue';
import GamesList from '@/components/GameLibrary/GamesList-card.vue';
import News from '@/components/News-card.vue';

export default {
  name: 'GameLibrary',
  components: {
    GameFilter,
    GamesList,
    News,
  },
};
</script>

<style lang="less" scoped>
.gameLibrary-container {
  display: flex;
  justify-content: space-between;
  //主内容样式
  .main {
    display: inline-block;
    width: 750px;
  }
}
</style>
