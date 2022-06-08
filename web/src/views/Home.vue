<template>
  <div class="home-container">
    <el-card class="carousel-card" :body-style="{ padding: '5px' }">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in articlesData" :key="item._id">
          <router-link :to="`/new/${item._id}`">
            <div>
              <p class="carousel-title">{{ item.title }}</p>
              <img class="carousel-img" :src="item.cover" alt="" />
            </div>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import RecommendCard from '@/components/Home/Recommend-card.vue';
import EvaluateCard from '@/components/Home/Evaluate-card.vue';
import News from '@/components/News-card.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    RecommendCard,
    EvaluateCard,
    News,
  },
  name: 'Home',
  data() {
    return {
      articlesData: [],
      swiperOption: {
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
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

<style lang="scss" scoped>
.carousel-card {
  --swiper-theme-color: #eee;
  .swiper-slide {
    .carousel-img {
      width: 100%;
      height: 500px;
    }
    .carousel-title {
      position: absolute;
      bottom: 30px;
      left: 10px;
      font-size: 35px;
      font-weight: 700;
      color: #fff;
      text-shadow: 3px 3px 5px #000;
    }
  }
  /deep/ .swiper-pagination-bullet {
    width: 40px;
    height: 5px;
    border-radius: 0;
    background: #eee;
    opacity: 0.5;
    &-active {
      opacity: 1;
    }
  }
}

.news-container {
  /deep/ .news-card {
    margin: 20px 0;
  }
}
</style>
