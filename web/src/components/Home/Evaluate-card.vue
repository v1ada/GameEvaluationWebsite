<template>
  <div class="evaluate-card-container">
    <el-card class="evaluate-card" shadow="false">
      <div slot="header">
        <span class="card-title">最新评价</span>
      </div>
      <div class="evaluate-card-body">
        <ul class="evaluate-list">
          <li v-for="item in evaluationsList" :key="item._id">
            <!-- 卡片项组件 -->
            <item-card :path="`game/${item.parent_game._id}`">
              <template #img-box>
                <img class="game-cover" :src="item.parent_game.game_logo" alt="" />
              </template>
              <template #item-header>
                <p class="game-name">{{ item.parent_game.game_name }}</p>
                <el-rate class="user-rate" :value="item.score / 2" disabled />
              </template>
              <template #item-main>
                <p class="evaluate-content">{{ item.content }}</p>
              </template>
              <template #item-footer>
                <span class="eva-author">{{ item.author.nickname }}</span>
                <span class="eva-date">{{ item.publishTime }}</span>
              </template>
            </item-card>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from '../Item-card';

export default {
  name: 'EvaluateCard',
  components: {
    ItemCard,
  },
  data() {
    return {
      // 评价列表
      evaluationsList: [],
    };
  },
  methods: {
    // 获取当前游戏的评价
    async getGameEvaluation() {
      try {
        const { data } = await this.$http.get(`rest/evaluations/eva`);
        this.evaluationsList = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getGameEvaluation();
  },
};
</script>

<style lang="less" scoped>
.card-title {
  font-size: 20px;
  font-weight: 600;
}
.evaluate-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    width: 550px;
  }
}
/deep/.item-card {
  .game-cover {
    width: 120px;
    height: 150px;
  }
  .item-text {
    justify-content: space-between;
  }
  .item-header {
    p {
      font-size: 20px;
      margin: 5px 0;
    }
    .user-rate {
      float: right;
      min-width: 150px;
      .el-rate__icon {
        font-size: 24px;
      }
    }
  }
  .evaluate-content {
    color: #646464;
    // 超过 3 行 省略
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    .eva-author {
      font-weight: 600;
      color: #555;
    }
    .eva-date {
      font-size: 14px;
      color: #969696;
    }
  }
}
</style>
