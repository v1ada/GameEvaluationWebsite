<template>
  <div class="gamesList-card-container">
    <el-card class="gamesList-card">
      <div class="gameList-item">
        <item-card v-for="item in gamesData" :key="item.game_id" :path="`/game/${item._id}`">
          <template #img-box>
            <img class="game-cover" :src="item.game_logo" alt="" />
          </template>
          <template #item-header>
            <p class="game-name">{{ item.game_name }}</p>
            <p class="origin-name">{{ item.origin_name }}</p>
          </template>
          <template #item-main>
            <p class="platform">
              游戏平台
              <!-- <span v-for="platform in item.platform" :key="platform">{{ platform }}</span> -->
              <el-tag
                v-for="platform in item.platform"
                :key="platform"
                effect="plain"
                size="medium "
              >
                {{ platform }}
              </el-tag>
            </p>
            <p class="game-type">
              游戏类型
              <span v-for="game_type in item.game_type" :key="game_type">{{ game_type }}</span>
            </p>
            <p class="game-date">
              发售时间
              <span>{{ item.game_date }}</span>
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
  name: 'GamesListCard',
  components: { ItemCard },
  data() {
    return {
      gamesData: [],
    };
  },
  methods: {
    async getGamesData() {
      try {
        const { data } = await this.$http.get('/rest/gameInfo');
        this.gamesData = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getGamesData();
  },
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
    .game-name {
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
