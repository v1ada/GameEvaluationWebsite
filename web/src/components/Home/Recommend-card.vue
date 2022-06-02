<template>
  <div class="Recommend-card-container">
    <el-card class="recommend-card" style="margin: 20px 0; background-color: #f8f8f9">
      <div slot="header" class="header">
        <span>游戏推荐</span>
      </div>
      <div class="card-box">
        <!-- 游戏平台卡片 -->
        <el-card class="platform-card" shadow="false" :body-style="{ paddingBottom: '0px' }">
          <div slot="header" class="header">
            <span>游戏平台</span>
          </div>
          <div class="link-container">
            <router-link class="platform-link" to="/game/library/PC">
              <div class="platform-link-img-div" style="background: #171a21">
                <img src="../../assets/icon/platform/steam-white-64.png" alt="" />
              </div>
              <p>Steam</p>
            </router-link>
            <router-link class="platform-link" to="/game/library/PS4">
              <div class="platform-link-img-div" style="background: #00439c">
                <img src="../../assets/icon/platform/playstation-white-64.png" alt="" />
              </div>
              <p>PlayStation</p>
            </router-link>
            <router-link class="platform-link" to="/game/library/XB1">
              <div class="platform-link-img-div" style="background: #0f760f">
                <img src="../../assets/icon/platform/xbox-white-64.png" alt="" />
              </div>
              <p>Xbox</p>
            </router-link>
            <router-link class="platform-link" to="/game/library/NS">
              <div class="platform-link-img-div" style="background: #fa0000">
                <img src="../../assets/icon/platform/nintendo-switch-white-64.png" alt="" />
              </div>
              <p>Switch</p>
            </router-link>
          </div>
        </el-card>
        <!-- 高分游戏卡片 -->
        <el-card class="top-card" shadow="false">
          <div slot="header" class="header">
            <span>高分游戏</span>
            <router-link class="show-more-link" to="/game/library">
              <span>更多</span>
              <i class="el-icon-d-arrow-right"></i>
            </router-link>
          </div>
          <div class="top-card-body">
            <ul class="game-list">
              <li v-for="item in gamesListData" :key="item.game_id">
                <item-card :path="`/game/${item._id}`">
                  <template #img-box>
                    <img class="game-cover" :src="item.game_logo" alt="" />
                  </template>
                  <template #item-header>
                    <div class="game-title">
                      <p class="game-name">{{ item.game_name }}</p>
                    </div>
                    <div class="score-box">
                      <p class="game-score" v-if="item.game_score">{{ item.game_score }}</p>
                      <p class="game-score none" v-else>暂无评分</p>
                    </div>
                  </template>
                  <template #item-main>
                    <p class="game-platform" v-text="item.platform.join('，')"></p>
                    <p class="game-gene" v-text="item.game_type.join('，')"></p>
                  </template>
                </item-card>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from '../Item-card';
import { mapState } from 'vuex';
export default {
  components: { ItemCard },
  name: 'RecommendCard',
  computed: {
    ...mapState(['gamesListData']),
  },
  methods: {
    // 分发Action 发请求，获取数据改变state
    getGamesListData() {
      // 清空筛选条件
      this.$store.commit('changeFilter', {
        platform: [],
        type: [],
        sort: 'scoreDesc',
      });
      this.$store.dispatch('getGamesListData', { page: 1 });
    },
  },
  created() {
    this.getGamesListData();
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  border: none;
  .header {
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
  p {
    margin: 5px 0;
  }
}
.platform-card {
  .link-container {
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
    .platform-link {
      text-decoration: none;
      text-align: center;
      font-weight: bold;
      color: #333;
      .platform-link-img-div {
        padding: 20px;
        border-radius: 10px;
      }
    }
  }
}
.top-card {
  margin-top: 20px;
  .header {
    .show-more-link {
      float: right;
      text-decoration: none;
      span,
      i {
        font-size: 14px;
        color: #646464;
      }
    }
  }
  .game-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style-type: none;
    li {
      width: 460px;
    }
  }
}
/deep/ .item-card {
  .img-box {
    .game-cover {
      width: 130px;
      height: 130px;
    }
  }
  .item-text {
    justify-content: space-between;
    .item-header {
      display: flex;
      justify-content: space-between;
      .game-score {
        font-size: 24px;
        margin: 0 10px;
        &.none {
          font-size: 18px;
        }
      }
    }
    .game-platform,
    .game-gene {
      font-size: 14px;
      color: #646464;
    }
  }
}
</style>
