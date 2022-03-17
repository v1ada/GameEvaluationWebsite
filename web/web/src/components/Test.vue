<template>
  <div class="news-card-container">
    <el-card class="news-card" style="margin: 20px 0">
      <div slot="header">
        <span>最新资讯</span>
        <slot name="show-more"></slot>
      </div>
      <item-card v-for="item in 4" :key="item">
        <template #img-box>
          <img src="../assets/img/图片.png" alt="" />
        </template>
        <template #item-title>
          <p>资讯标题 {{ item }}</p>
        </template>
        <template #item-info>
          <el-row>
            <el-col class="new-abstract">
              <p>
                【索尼已成功为《死亡搁浅》中的道路构建功能申请到了专利】
                索尼已成功为《死亡搁浅》中的道路构建功能申请到了专利，该功能允许玩家在游戏中根据实时的网络数据使用其他玩家搭建的...
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col class="new-author" :span="20"><p>资讯作者</p></el-col>
            <el-col class="new-date" :span="4"><p>发布日期</p></el-col>
          </el-row>
        </template>
      </item-card>
    </el-card>
  </div>
</template>

<script>
import ItemCard from './Item-card.vue';

export default {
  name: 'NewsCard',
  components: {
    ItemCard,
  },
};
</script>

<style lang="less" scoped>
span {
  font-size: 20px;
  color: #2a2424;
  font-weight: 600;
}
.img-box {
  img {
    width: 192px;
    height: 108px;
  }
}
.item-text {
  width: 100%;
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
  .new-abstract {
    font-size: 14px;
    color: #646464;
  }
  .new-author,
  .new-date {
    font-size: 12px;
    color: #969696;
  }
}
</style>
