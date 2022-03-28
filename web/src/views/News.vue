<template>
  <div class="news-container">
    <el-card class="news-card">
      <div slot="header" class="header">
        <span>最新资讯</span>
        <slot name="show-more"></slot>
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
          <div class="new-footer">
            <p class="new-author"></p>
            <p class="new-date">{{ item.publishTime }}</p>
          </div>
        </template>
      </item-card>
      <!-- 分页 -->
      <div class="paging">
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
import ItemCard from '../components/Item-card.vue';

export default {
  name: 'News',
  components: {
    ItemCard,
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
    currentChange(currentPage) {
      this.articlesListPage = currentPage;
      // 获取分页数据
      this.getNewsData({ page: this.gamesListPage });
      // 网页偏移到顶部
      document.documentElement.scrollTop = 0;
    },
  },
  created() {
    this.getNewsData();
  },
};
</script>

<style lang="less" scoped>
.news-card {
  background-color: #f8f8f9;
  .header {
    span {
      font-size: 20px;
      color: #2a2424;
      font-weight: 600;
    }
  }
  .new-cover {
    width: 192px;
    height: 108px;
  }
  .new-title {
    margin: 5px 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .item-main {
    p {
      margin: 5px 0;
    }
    .new-abstract {
      font-size: 14px;
      color: #646464;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .item-footer {
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
  .paging {
    margin-top: 20px;
    /deep/.el-pagination.is-background {
      .el-pager li {
        &:not(.disabled).active {
          background-color: #333;
          color: #fff;
        }
      }
    }
  }
}
</style>
