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
            <p class="new-author">资讯作者</p>
            <p class="new-date">{{ item.publishTime }}</p>
          </div>
        </template>
      </item-card>
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
    };
  },
  methods: {
    async getNewsData() {
      try {
        const result = await this.$http.get('/rest/articles');
        this.articlesData = result.data.reverse();
      } catch (err) {
        console.log(err);
      }
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
}
</style>
