<template>
  <div class="newDetail-container">
    <div class="main">
      <!-- 新闻详情 -->
      <el-card class="newDetail-card">
        <div slot="header">
          <h1 class="new-title">{{ newDetail.title }}</h1>
          <div class="new-footer">
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
      <news :showFooter="false" :showPaging="false">
        <template v-slot:show-more>
          <router-link class="show-more-link" to="/news">
            <span>更多</span>
            <i class="el-icon-d-arrow-right"></i>
          </router-link>
        </template>
      </news>
    </div>
  </div>
</template>

<script>
import News from './News.vue';

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

<style lang="less" scoped>
// 新闻详情样式
.newDetail-container {
  display: flex;
  justify-content: space-between;
  .newDetail-card {
    width: 750px;
    .new-title {
      margin: 10px 0;
    }
    .new-footer {
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
        margin: 5px 0;
        width: 100%;
      }
    }
  }
  // 新闻组件样式
  .news-container {
    width: 400px;
    /deep/ .news-card {
      margin: 0;
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
      .new-cover {
        width: 96px;
        height: 72px;
      }
      .new-title {
        margin: 5px 0;
        font-size: 15px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-info {
        p {
          margin: 5px 0;
        }
        .new-abstract {
          display: none;
        }
        .new-footer {
          display: flex;
          justify-content: space-between;
          .new-author,
          .new-date {
            font-size: 12px;
            color: #969696;
          }
        }
      }
    }
  }
}
</style>
