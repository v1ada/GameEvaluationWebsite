<template>
  <div class="gamesList-card-container" ref="gamesListContainer">
    <el-card class="gamesList-card">
      <div class="gameList-item">
        <item-card v-for="item in gamesListData" :key="item.game_id" :path="`/game/${item._id}`">
          <template #img-box>
            <img class="game-cover" :src="item.game_logo" alt="" />
          </template>
          <template #item-header>
            <p class="game-name">{{ item.game_name }}</p>
            <p class="origin-name">{{ item.origin_name }}</p>
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
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          layout="prev, pager, next, jumper, ->, total"
          :total="gamesListDataTotal"
          background
          :current-page="gamesListPage"
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
  margin: 10px 0;
  .gameList-item {
    .game-cover {
      width: 165px;
      border: 1px solid #111;
      margin-right: 10px;
    }
    .game-name {
      font-size: 24px;
      margin: 5px 0;
    }
    .origin-name {
      font-size: 16px;
      font-weight: 100;
      margin: 5px 0 10px 0;
    }
    .game-descri {
      & > * {
        display: flex;
        margin: 10px 0 0 0;
        & > span {
          line-height: 32px;
        }
        .tag-box {
          margin-left: 20px;
          width: 410px;
          span {
            margin: 2px 2px;
            border: 1px solid #a6a6a6;
            border-radius: 5px;
            color: #505050;
          }
        }
        .date {
          margin-left: 20px;
        }
      }
    }
  }
  .paging {
    margin-top: 20px;
    /deep/.el-pagination.is-background {
      .el-pager li {
        &:not(.disabled).active {
          background-color: #333;
          color: #fff;
        }
      }
    }
  }
}
</style>
