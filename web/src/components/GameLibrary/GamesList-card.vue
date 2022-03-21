<template>
  <div class="gamesList-card-container">
    <el-card class="gamesList-card">
      <div class="gameList-item">
        <item-card v-for="item in 5" :key="item" path="/game/123">
          <template #img-box>
            <img class="game-cover" src="@/assets/img/图片.png" alt="" />
          </template>
          <template #item-header>
            <p class="china-name">塞尔达传说：旷野之息{{ item }}</p>
            <p class="origin-name">The Legend of Zelda：Breath of the Wild{{ item }}</p>
          </template>
          <template #item-main>
            <p class="platform">
              游戏平台
              <span>Switch</span>
            </p>
            <p class="game-type">
              游戏标签
              <span>开放世界</span>
            </p>
            <p class="game-date">
              发售时间
              <span>2021-10-31</span>
            </p>
          </template>
        </item-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from '../Item-card.vue';
export default {
  components: { ItemCard },
  name: 'GamesListCard',
};
</script>

<style lang="less" scoped>
.gamesList-card {
  margin: 10px 0;
  .gameList-item {
    .game-cover {
      width: 165px;
      border: 1px solid #111;
      margin-right: 10px;
    }
    .china-name {
      font-size: 20px;
      margin: 5px 0;
    }
    .origin-name {
      font-size: 16px;
      font-weight: 100;
      margin: 5px 0 10px 0;
    }
    .platform,
    .game-type,
    .game-date {
      margin: 20px 0 0 0;
      color: #646464;
      span {
        margin-left: 15px;
        color: #333;
      }
    }
    .platform {
      span {
        padding: 0 5px;
        border: 1px solid #464646;
        border-radius: 2px;
      }
    }
    .game-type {
      span {
        padding: 0 10px;
        border: 1px solid #a6a6a6;
        border-radius: 10px;
      }
    }
  }
}
</style>
