<template>
  <div class="newDetail-container">
    <div class="main">
      <!-- 新闻详情 -->
      <el-card class="newDetail-card">
        <div slot="header" class="header">
          <h1 class="new-title">{{ newDetail.title }}</h1>
          <div class="header-footer">
            <p class="new-author">资讯作者</p>
            <p class="new-date">{{ newDetail.publishTime }}</p>
          </div>
        </div>
        <div class="newContent">
          {{ newDetail.content }}
        </div>
        <div class="newPicture">
          <img v-for="item in newDetail.pictureList" :key="item._id" :src="item.url" />
        </div>
      </el-card>
    </div>

    <div class="side">
      <!-- 新闻列表 -->
      <news type="side" :showMore="true" :showFooter="false" :showPaging="false" />
    </div>
  </div>
</template>

<script>
import News from '@/components/News-card.vue';

export default {
  name: 'NewDetail',
  components: {
    News,
  },
  data() {
    return {
      newDetail: {
        title: '',
        content: '',
        pictureList: [],
      },
    };
  },
  methods: {
    async getNewDetail() {
      try {
        const { data } = await this.$http.get(`/rest/articles/details/${this.$route.params.id}`);
        this.newDetail = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    $route: function () {
      this.newDetail = {};
      this.getNewDetail();
    },
  },
  created() {
    this.getNewDetail();
  },
};
</script>

<style lang="scss" scoped>
// 新闻详情样式
.newDetail-container {
  display: flex;
  justify-content: space-between;
}
.newDetail-card {
  width: 750px;
}
.new-title {
  margin: 10px 0;
}
.header-footer {
  display: flex;
  justify-content: space-between;
  .new-author,
  .new-date {
    font-size: 12px;
    color: #969696;
    margin: 10px 0;
  }
}
.newPicture {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
