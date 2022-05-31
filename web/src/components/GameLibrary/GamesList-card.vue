<template>
  <div class="gamesList-card-container" ref="gamesListContainer">
    <el-card class="gamesList-card">
      <div class="gameList-item">
        <item-card v-for="item in gamesListData" :key="item.game_id" :path="`/game/${item._id}`">
          <template #img-box>
            <img class="game-cover" :src="item.game_logo" alt="" />
          </template>
          <template #item-header>
            <div class="game-title">
              <p class="game-name">{{ item.game_name }}</p>
              <p class="origin-name">{{ item.origin_name }}</p>
            </div>
            <div class="score-box">
              <p class="game-score" v-if="item.game_score">{{ item.game_score }}</p>
              <p class="game-score none" v-else>暂无评分</p>
            </div>
          </template>
          <template #item-main>
            <div class="game-descri">
              <div class="platform">
                <span>游戏平台</span>
                <div class="tag-box">
                  <el-tag
                    v-for="platform in item.platform"
                    :key="platform"
                    effect="plain"
                    size="medium "
                  >
                    {{ platform }}
                  </el-tag>
                </div>
              </div>
              <div class="game-type">
                <span>游戏类型</span>
                <div class="tag-box">
                  <el-tag
                    v-for="game_type in item.game_type"
                    :key="game_type"
                    effect="plain"
                    size="medium "
                  >
                    {{ game_type }}
                  </el-tag>
                </div>
              </div>
              <div class="game-date">
                <span>发售时间</span>
                <span class="date">{{ item.game_date }}</span>
              </div>
            </div>
          </template>
        </item-card>
      </div>
      <el-empty v-if="!gamesListData.length" description="未查询到游戏" />
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          layout="prev, pager, next, jumper, ->, total"
          :total="gamesListDataTotal"
          :current-page="gamesListPage"
          background
          :hide-on-single-page="true"
          @current-change="currentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from '../Item-card.vue';
import { mapState } from 'vuex';

export default {
  name: 'GamesListCard',
  components: { ItemCard },
  data() {
    return {};
  },
  computed: {
    ...mapState(['gamesListData', 'gamesListDataTotal', 'gamesListPage']),
  },
  methods: {
    // 分发Action 发请求，获取数据改变state
    getGamesListData(payload) {
      this.$store.dispatch('getGamesListData', payload);
    },
    // 分页变化时
    currentChange(currentPage) {
      this.$store.commit('changeGamesListPage', { num: currentPage });
      // 获取分页数据
      this.getGamesListData({ page: this.gamesListPage });
      // 获取游戏列表容器距离顶部的高度
      const containerOffsetTop = this.$refs.gamesListContainer.offsetTop;
      // 网页偏移对应的高度  70为导航栏和容器外边距
      document.documentElement.scrollTop = containerOffsetTop - 70;
    },
  },
  created() {
    this.getGamesListData({ page: this.gamesListPage });
  },
  mounted() {
    // 页面滚动到最顶部
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="less" scoped>
.gamesList-card {
  margin-top: 10px;
  p {
    margin: 5px 0;
  }
}

.game-cover {
  width: 165px;
  margin-right: 10px;
}
/deep/ .item-header {
  display: flex;
  justify-content: space-between;
}
.game-title {
  .game-name {
    font-size: 24px;
  }
  .origin-name {
    font-size: 16px;
    font-weight: 100;
  }
}
.score-box {
  .game-score {
    font-size: 40px;
    margin-right: 20px;
  }
  .none {
    font-size: 20px;
  }
}
.game-descri > * {
  display: flex;
  margin: 10px 0;
  & > span {
    margin: 5px 0;
  }
}
.tag-box,
.date {
  display: inline-block;
  max-width: 400px;
  margin-left: 20px;
}
.el-tag--plain {
  margin: 2px;
}

.paging {
  margin-top: 20px;
}
</style>
