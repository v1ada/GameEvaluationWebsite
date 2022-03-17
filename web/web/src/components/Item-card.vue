<template>
  <div class="item-card-container">
    <el-card class="item-card" shadow="hover" :body-style="{ padding: '10px' }">
      <router-link :to="path" class="router-link">
        <div class="item-card-body">
          <div class="img-box">
            <slot name="img-box"></slot>
          </div>
          <div class="item-text">
            <div class="item-title">
              <slot name="item-title"></slot>
            </div>
            <div class="item-info">
              <slot name="item-info"></slot>
            </div>
          </div>
        </div>
      </router-link>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['path'],
};
</script>

<style lang="less" scoped>
.item-card {
  margin: 5px 0;
  .router-link {
    text-decoration: none;
  }
}
.item-card-body {
  display: flex;
  .img-box {
    margin-right: 10px;
  }
  .item-text {
    display: flex;
    flex-direction: column;
    width: 100%;
    .item-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    .item-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
