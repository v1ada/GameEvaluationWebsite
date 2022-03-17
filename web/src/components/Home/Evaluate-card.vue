<template>
  <div class="evaluate-card-container">
    <el-card class="evaluate-card" shadow="false">
      <div slot="header">
        <span>最新评价</span>
      </div>
      <div class="evaluate-card-body">
        <ul class="evaluate-list">
          <li v-for="item in 6" :key="item">
            <router-link class="evaluate-link" to="/game/library">
              <!-- 卡片项组件 -->
              <item-card path="#">
                <template #img-box>
                  <img class="game-cover" src="../../assets/img/图片.png" alt="" />
                </template>
                <template #item-title>
                  <p class="game-name">游戏名 {{ item }}</p>
                </template>
                <template #item-info>
                  <p class="evaluate-content">
                    【索尼已成功为《死亡搁浅》中的道路构建功能申请到了专利】
                    索尼已成功为《死亡搁浅》中的道路构建功能申请到了专利，该功能允许玩家在游戏中根据实时的网络数据使用其他玩家搭建的...
                  </p>
                  <div class="eva-footer">
                    <p class="eva-author">评价作者</p>
                    <p class="eva-date">2021-12-12</p>
                  </div>
                </template>
              </item-card>
            </router-link>
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
};
</script>

<style lang="less" scoped>
.evaluate-card {
  span {
    font-size: 20px;
    color: #2a2424;
    font-weight: 600;
  }
  .evaluate-card-body {
    .evaluate-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 0;
      padding: 0;
      list-style-type: none;
      li {
        width: 500px;
      }
      .evaluate-link {
        text-decoration: none;
      }
      .img-box {
        .game-cover {
          width: 120px;
          height: 108px;
        }
      }
      .item-title {
        p {
          margin: 5px 0;
        }
      }
      .item-info {
        p {
          margin: 5px 0;
        }
        .evaluate-content {
          font-size: 16px;
          color: #646464;
        }
        .eva-footer {
          display: flex;
          justify-content: space-between;
          .eva-author,
          .eva-date {
            font-size: 14px;
            color: #969696;
          }
        }
      }
    }
  }
}
</style>
