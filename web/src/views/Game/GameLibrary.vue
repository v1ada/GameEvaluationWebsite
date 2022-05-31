<template>
  <div class="gameLibrary-container">
    <div class="main">
      <game-filter />
      <games-list />
    </div>

    <div class="side">
      <!-- 新闻组件 -->
      <news :showMore="true" :showFooter="false" :showPaging="false" />
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
  // 新闻组件样式
  .news-container {
    width: 400px;
    /deep/ .news-card {
      margin: 0;
      .new-cover {
        width: 96px;
        height: 72px;
      }
      .new-title {
        margin: 5px 0;
        font-size: 15px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-info {
        p {
          margin: 5px 0;
        }
        .new-abstract {
          display: none;
        }
        .new-footer {
          display: flex;
          justify-content: space-between;
          .new-author,
          .new-date {
            font-size: 12px;
            color: #969696;
          }
        }
      }
    }
  }
}
</style>
