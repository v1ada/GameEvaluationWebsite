<template>
  <div class="home-container">
    <el-card class="carousel-card" :body-style="{ padding: '5px' }">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="item in articlesData" :key="item._id">
          <router-link :to="`/new/${item._id}`">
            <div>
              <p class="carousel-title">{{ item.title }}</p>
              <img class="carousel-img" :src="item.cover" alt="" />
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <!-- 新闻组件 -->
    <news :showMore="true" :showFooter="false" :showPaging="false" />

    <!-- 推荐组件 -->
    <recommend-card />

    <!-- 评价组件 -->
    <evaluate-card />
  </div>
</template>

<script>
import RecommendCard from '@/components/Home/Recommend-card.vue';
import EvaluateCard from '@/components/Home/Evaluate-card.vue';
import News from '@/components/News-card.vue';

export default {
  components: {
    RecommendCard,
    EvaluateCard,
    News,
  },
  name: 'Home',
  data() {
    return {
      articlesData: [],
    };
  },
  methods: {
    async getNewsCover() {
      try {
        const { data } = await this.$http.get(`/rest/articles?page=1&sort=pubTimeDesc`);
        this.articlesData = data.result;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getNewsCover();
  },
};
</script>

<style lang="less" scoped>
.carousel-card {
  .el-empty {
    background-color: #444;
  }
  .el-carousel__item {
    .carousel-img {
      width: 100%;
      height: 500px;
    }
    .carousel-title {
      position: absolute;
      bottom: 0;
      left: 10px;
      font-size: 35px;
      font-weight: 700;
      color: #fff;
      text-shadow: 3px 3px 5px #000;
    }
  }
}
.news-container {
  /deep/ .news-card {
    margin: 20px 0;
  }
}
</style>
