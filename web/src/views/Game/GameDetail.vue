<template>
  <div class="gameDetail-container">
    <!-- 游戏信息 -->
    <el-card class="game-main">
      <div slot="header" class="game-title">
        <h1>{{ gameDetail.game_name }}</h1>
        <p>{{ gameDetail.origin_name }}</p>
      </div>
      <div class="game-content">
        <!-- swiper轮播图 -->
        <div class="game-picture">
          <swiper
            class="swiper-main"
            :modules="modules"
            :pagination="{ clickable: true }"
            :options="swiperOptionMain"
            ref="swiperMain"
          >
            <swiper-slide v-for="item in gameDetail.game_img_list" :key="item">
              <img :src="item" alt="" />
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
          <swiper
            class="swiper-thumbs"
            :modules="modules"
            :pagination="{ clickable: true }"
            :options="swiperOptionThumbs"
            ref="swiperThumbs"
          >
            <swiper-slide v-for="item in gameDetail.game_img_list" :key="item">
              <img :src="item" alt="" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="game-info">
          <img class="game-cover" :src="gameDetail.game_cover" alt="" />
          <div class="game-descri">
            <div class="game-score">
              <span>游戏评分</span>
              <span class="score" v-if="gameDetail.game_score">{{ gameDetail.game_score }}</span>
              <span class="score none" v-else>暂无评分</span>
            </div>
            <div class="platform">
              <span>游戏平台</span>
              <div class="tag-box">
                <el-tag
                  v-for="item in gameDetail.platform"
                  :key="item"
                  effect="plain"
                  size="medium "
                >
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
      </div>
      <div class="game-brief">
        <h2 class="game-brief-title">游戏简介</h2>
        <p class="game-brief-context">{{ gameDetail.game_brief }}</p>
      </div>
    </el-card>
    <!-- 评价组件 -->
    <!-- 传入父组件请求数据方法 -->
    <evaluation @getGameDetail="getGameDetail" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Evaluation from '../../components/Evaluation/Evaluation.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Evaluation,
  },
  name: 'GameDetail',
  data() {
    return {
      // 游戏详情
      gameDetail: {},
      // 主swiper配置
      swiperOptionMain: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      // 缩略swiper配置
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
      },
    };
  },
  methods: {
    async getGameDetail() {
      try {
        const { data } = await this.$http.get(`/rest/gameInfo/details/${this.$route.params.id}`);
        this.gameDetail = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getGameDetail();
  },
  mounted() {
    // 页面滚动到最顶部
    document.documentElement.scrollTop = 0;
    // swiperMain 和 swiperThumbs 互相控制
    this.$nextTick(() => {
      const swiperMain = this.$refs.swiperMain.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperMain.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperMain;
    });
  },
};
</script>

<style lang="less" scoped>
.game-title * {
  margin: 5px 0;
}
.game-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.game-picture {
  width: 800px;
  background-color: #000100;
  img {
    width: 100%;
  }
}
.swiper-thumbs {
  & .swiper-slide {
    width: 20%;
    opacity: 0.55;
  }
  & .swiper-slide-active {
    opacity: 1;
  }
}
.game-info {
  max-width: 300px;
}
.game-cover {
  width: 100%;
}
.game-descri > * {
  display: flex;
  margin: 10px 0;
  & > span {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 20px;
  }
}
.score {
  font-size: 60px;
  color: #f5ba49;
}
.none {
  font-size: 20px;
}
.tag-box {
  max-width: 200px;
}
.el-tag--plain {
  margin: 2px;
}
.game-brief * {
  margin: 10px 0;
}
</style>
