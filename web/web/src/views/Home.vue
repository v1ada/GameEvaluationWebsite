<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <el-card class="carousel-card" :body-style="{ padding: '5px' }">
      <el-carousel trigger="click">
        <el-carousel-item v-for="item in carouselImg" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <!-- 新闻组件 -->
    <news>
      <template v-slot:show-more>
        <router-link class="show-more-link" to="/news">
          <span>更多</span>
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </template>
    </news>

    <!-- 推荐组件 -->
    <recommend-card />

    <!-- 评价组件 -->
    <evaluate-card />
  </div>
</template>

<script>
import RecommendCard from '../components/Home/Recommend-card.vue';
import EvaluateCard from '../components/Home/Evaluate-card.vue';
import News from './News.vue';

export default {
  components: {
    RecommendCard,
    EvaluateCard,
    News,
  },
  name: 'Home',
  data() {
    return {
      carouselImg: [
        'https://img01.vgtime.com/game/cover/2021/06/16/210616141057302_u54.jpeg?x-oss-process=image/resize,m_pad,color_000000,w_1150,h_300',
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.home-container {
  .carousel-card {
    .el-empty {
      background-color: #444;
    }
    .el-carousel__item {
      img {
        width: 100%;
        height: 300px;
      }
    }
  }
  .news-container {
    /deep/ .news-card {
      margin: 20px 0px;
      .header {
        .show-more-link {
          float: right;
          padding: 3px 0;
          text-decoration: none;
          span,
          i {
            font-size: 14px;
            color: #646464;
          }
        }
      }
    }
  }
}
</style>
