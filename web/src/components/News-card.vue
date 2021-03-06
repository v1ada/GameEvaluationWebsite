<template>
  <div :class="`news-container ${type}`">
    <el-card class="news-card">
      <div slot="header" class="header">
        <span class="title">最新资讯</span>
        <router-link class="show-more-link" to="/news" v-if="showMore">
          <span>更多</span>
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </div>
      <!-- 卡片项组件 -->
      <item-card v-for="item in articlesData" :key="item._id" :path="`/new/${item._id}`">
        <template #img-box>
          <img class="new-cover" :src="item.cover" />
        </template>
        <template #item-header>
          <p class="new-title" :title="item">
            {{ item.title }}
          </p>
        </template>
        <template #item-main>
          <p class="new-abstract">
            {{ item.content }}
          </p>
        </template>
        <template #item-footer>
          <div class="new-footer" v-if="showFooter">
            <p class="new-author"></p>
            <p class="new-date">{{ item.publishTime }}</p>
          </div>
        </template>
      </item-card>
      <!-- 分页 -->
      <div class="paging" v-if="showPaging">
        <el-pagination
          layout="prev, pager, next, jumper, ->, total"
          :total="articlesTotal"
          background
          @current-change="currentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from './Item-card.vue';

export default {
  name: 'News',
  components: {
    ItemCard,
  },
  // 控制是否显示 footer和分页
  props: {
    type: { type: String, default: '' },
    showMore: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: true },
    showPaging: { type: Boolean, default: true },
  },
  data() {
    return {
      articlesData: [],
      articlesTotal: 0,
      articlesListPage: 1,
    };
  },
  methods: {
    // 发送请求获取数据
    async getNewsData() {
      try {
        const { data } = await this.$http.get(
          `/rest/articles?page=${this.articlesListPage}&sort=pubTimeDesc`
        );
        this.articlesData = data.result;
        this.articlesTotal = data.total;
      } catch (err) {
        console.log(err);
      }
    },
    // 分页变化事件
    currentChange(currentPage) {
      this.articlesListPage = currentPage;
      // 获取分页数据
      this.getNewsData({ page: this.articlesListPage });
      // 网页偏移到顶部
      document.documentElement.scrollTop = 0;
    },
  },
  created() {
    this.getNewsData();
  },
};
</script>

<style lang="scss" scoped>
.news-card {
  background-color: #f8f8f9;
}
.header {
  .title {
    font-size: 20px;
    font-weight: 600;
  }
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
.new-cover {
  width: 192px;
  height: 108px;
}
.new-title {
  margin: 5px 0;
  overflow: hidden;
  // 超过 1 行隐藏，显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.new-abstract {
  margin: 5px 0;
  font-size: 14px;
  color: #646464;
  overflow: hidden;
  // 超过 2 行隐藏，显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
.paging {
  margin-top: 20px;
}
// 侧边栏模式
.news-container.side {
  width: 400px;
  /deep/ .news-card {
    .new-cover {
      width: 96px;
      height: 72px;
    }
    .new-title {
      font-size: 15px;
    }
  }
}
</style>
