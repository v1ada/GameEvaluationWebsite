<template>
  <div class="Evaluation-container">
    <!-- 评价表单 -->
    <el-card class="evaluate-form-card">
      <el-form
        class="evaluate-form"
        ref="evaluation"
        :model="evaluation"
        :rules="rules"
        @submit.native.prevent="submitEvaluation('evaluation')"
      >
        <el-form-item prop="content">
          <el-input
            class="form-content"
            type="textarea"
            v-model="evaluation.content"
            placeholder="请输入内容"
            maxlength="200"
            rows="6"
            :show-word-limit="true"
            resize="none"
            @input="changeInput($event)"
          />
        </el-form-item>
        <div class="box">
          <el-form-item prop="score">
            <span class="rate-title">游戏评分</span>
            <el-rate class="form-rate" v-model="evaluation.score" />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <!-- 评价列表 -->
    <el-card class="evaluate-list-card">
      <div slot="header">
        <h2 class="card-title">游戏评价</h2>
      </div>
      <div class="evaluate-list-body">
        <item-card v-for="item in 5" :key="item" path="">
          <template #img-box>
            <img
              src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
              alt=""
            />
          </template>
          <template #item-header>
            <span class="username">用户名</span>
            <el-rate class="user-rate" :value="4" disabled />
          </template>
          <template #item-main>
            <p class="evaluate-content">
              评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
            </p>
          </template>
          <template #item-footer>
            <span class="evaluate-time">2022/3/21</span>

            <i
              class="iconfont icon-dianzan_kuai"
              :style="{ color: dianzanColor }"
              @click="dianzanClick"
            >
              {{ dianzanNum }}
            </i>
          </template>
        </item-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from '@/components/Item-card.vue';
export default {
  components: {
    ItemCard,
  },
  name: 'Evaluation',
  data() {
    return {
      // 评价信息对象
      evaluation: {
        content: '',
        score: 0,
      },
      // 校验规则
      rules: {
        content: [{ required: true, message: '请输入评价内容', trigger: 'blur' }],
        score: [{ required: true, message: '请选择游戏评分', trigger: 'blur' }],
      },
      // 点赞
      dianzanColor: '#ddd',
      dianzanState: false,
      dianzanNum: 0,
    };
  },
  computed: {
    finalScore() {
      return this.evaluation.score * 2;
    },
  },
  methods: {
    // 提交表单
    submitEvaluation(formName) {
      // 表单校验，返回valid是否通过校验
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.evaluation.score = this.finalScore;
            this.evaluation.parent_game = this.$route.params.id;
            console.log(this.evaluation);
            // await this.$http.post('/rest/evaluations/add', this.evaluation);
            await this.$http.post('/rest/evaluations/add', this.evaluation);
            this.$message({
              message: '提交评价成功',
              type: 'success',
            });
            // this.$router.push('/articles/list');
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeInput($event) {
      this.$forceUpdate();
    },
    // 点赞点击事件
    dianzanClick() {
      if (!this.dianzanState) {
        this.dianzanColor = '#f7ba2a';
        this.dianzanState = true;
        this.dianzanNum++;
      } else {
        this.dianzanColor = '#ddd';
        this.dianzanState = false;
        this.dianzanNum--;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Evaluation-container {
  .evaluate-form-card {
    margin: 10px 0;
    .evaluate-form {
      display: flex;
      // justify-content: space-between;
      .el-form-item {
        margin: 0;
      }
      .form-content {
        width: 800px;
        height: 150px;
        font-size: 16px;
      }
      .box {
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .rate-title {
          font-size: 18px;
        }
        .form-rate {
          margin-bottom: 20px;
          /deep/ .el-rate__icon {
            font-size: 30px;
          }
        }
        .el-button {
          color: #fff;
          background-color: #333;
          border-color: #333;
        }
        .el-button:focus,
        .el-button:hover {
          background: #3d3d3d;
          border-color: #646464;
          color: #fff;
        }
      }
    }
  }
  .evaluate-list-card {
    .card-title {
      margin: 0;
    }
    .evaluate-list-body {
      /deep/ .img-box {
        img {
          border-radius: 50%;
          width: 64px;
        }
      }
      /deep/ .item-header {
        display: flex;
        padding: 10px 0;
        font-size: 18px;
        .username {
          margin-right: 10px;
        }
        .user-rate {
          .el-rate__icon {
            font-size: 24px;
          }
        }
      }
      /deep/ .item-footer {
        display: flex;
        justify-content: space-between;
        .icon-dianzan_kuai {
          font-size: 24px;
          // color: #f7ba2a;
        }
      }
    }
  }
}
</style>
