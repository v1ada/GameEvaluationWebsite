<template>
  <div class="gameDetail-container">
    <!-- 游戏信息 -->
    <el-card class="game-main" :body-style="{ display: 'flex', justifyContent: 'space-between' }">
      <div slot="header" class="game-title">
        <h2>{{ gameDetail.game_name }}</h2>
        <p>{{ gameDetail.origin_name }}</p>
      </div>
      <div class="game-picture">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in gameDetail.game_img_list" :key="item">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="game-info">
        <img class="game-cover" :src="gameDetail.game_cover" alt="" />
        <div class="game-descri">
          <div class="game-score">
            <span>游戏评分</span>
            <span class="score">9.8</span>
          </div>
          <div class="platform">
            <span>游戏平台</span>
            <div class="tag-box">
              <el-tag v-for="item in gameDetail.platform" :key="item" effect="plain" size="medium ">
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div class="game-type">
            <span>游戏类型</span>
            <div class="tag-box">
              <el-tag
                v-for="item in gameDetail.game_type"
                :key="item"
                effect="plain"
                size="medium "
              >
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div class="game-date">
            <span>发售时间</span>
            <span class="date">{{ gameDetail.game_date }}</span>
          </div>
          <div class="game-developer">
            <span>开发厂商</span>
            <span class="developer">{{ gameDetail.game_developer }}</span>
          </div>
          <div class="game-publisher">
            <span>发行厂商</span>
            <span class="publisher">{{ gameDetail.game_publisher }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 评价组件 -->
    <evaluation />
  </div>
</template>

<script>
import Evaluation from '../components/Evaluation/Evaluation.vue';
export default {
  components: {
    Evaluation,
  },
  name: 'GameDetail',
  data() {
    return {
      // 游戏详情
      gameDetail: {},
    };
  },
  methods: {
    async getGameDetail() {
      try {
        const { data } = await this.$http.get(`/rest/gameInfo/${this.$route.params.id}`);
        this.gameDetail = data;
      } catch (err) {
        console.log(err);
      }
    },
    goToHeader() {
      document.documentElement.scrollTop = 0;
    },
  },
  created() {
    this.getGameDetail();
  },
  mounted() {
    this.goToHeader();
  },
};
</script>

<style lang="less" scoped>
.gameDetail-container {
  // background-color: #fff;
  .game-main {
    .game-title * {
      margin: 0;
    }
    .game-picture {
      width: 800px;
      img {
        width: 800px;
      }
    }
    .game-info {
      max-width: 300px;
      .game-cover {
        width: 100%;
      }
      .game-descri {
        & > * {
          display: flex;
          font-size: 14px;
          margin: 10px 0 0 0;
          color: #646464;
          .score {
            font-size: 50px;
          }
          .score,
          .date,
          .developer,
          .publisher {
            margin-left: 15px;
          }
          .tag-box {
            margin-left: 20px;
            width: 210px;
            span {
              margin: 2px 2px;
              color: #333;
              border-color: #d1d1d1;
            }
          }
        }
      }
    }
  }
}
</style>
