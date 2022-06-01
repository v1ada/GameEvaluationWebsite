<template>
  <div class="item-card-container">
    <el-card class="item-card" :shadow="hover" :body-style="{ padding: '10px' }">
      <router-link :to="path" class="router-link" v-if="path">
        <div class="item-card-body">
          <div class="img-box">
            <slot name="img-box"></slot>
          </div>
          <div class="item-text">
            <div class="item-header">
              <slot name="item-header"></slot>
            </div>
            <div class="item-main">
              <slot name="item-main"></slot>
            </div>
            <div class="item-footer">
              <slot name="item-footer"></slot>
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
  data() {
    return {
      hover: 'never',
    };
  },
  created() {
    if (this.path) {
      this.hover = 'hover';
    }
  },
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
}
.item-text {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  color: #333;
  .item-header {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
