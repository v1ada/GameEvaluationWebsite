<template>
  <div class="Evaluation-container">
    <!-- 评价表单 -->
    <el-card class="evaluate-form-card">
      <el-form
        class="evaluate-form"
        ref="evaluationForm"
        :model="evaluationForm"
        :rules="rules"
        @submit.native.prevent="submitEvaluation('evaluationForm')"
      >
        <!-- 评价内容文本域 -->
        <el-form-item prop="content">
          <el-input
            class="form-content"
            type="textarea"
            v-model="evaluationForm.content"
            :placeholder="loginState ? '请输入评价内容' : '登录后才可发表评价'"
            maxlength="200"
            rows="6"
            :show-word-limit="true"
            resize="none"
            :disabled="!loginState || userData.isBan"
            @input="changeInput($event)"
          />
        </el-form-item>
        <div class="box">
          <!-- 星级评分 -->
          <el-form-item prop="score">
            <span class="rate-title">游戏评分</span>
            <el-rate
              class="form-rate"
              v-model="evaluationForm.score"
              :disabled="!loginState || userData.isBan"
            />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" v-if="loginState && !userData.isBan">提交</el-button>
            <el-button @click="$router.push('/login')" v-else-if="!userData.isBan">登录</el-button>
            <p class="banStateTip" v-else>你已被禁言</p>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <!-- 评价列表 -->
    <el-card class="evaluate-list-card">
      <div slot="header">
        <h2 class="card-title">游戏评价</h2>
      </div>

      <div class="evaluate-list-body" v-if="evaluationsList.length !== 0">
        <item-card v-for="item in evaluationsList" :key="item._id" path="">
          <template #img-box>
            <img :src="item.author.profile_photo" alt="" />
          </template>
          <template #item-header>
            <div class="box-left">
              <span class="nickname">{{ item.author.nickname }}</span>
              <el-rate class="user-rate" :value="item.score / 2" disabled />
            </div>
            <!-- 删除评价按钮 (只有本人或者管理员能删除)-->
            <i
              @click="removeEvaluation(item)"
              class="el-icon-delete"
              v-if="userData._id === item.author._id || userData.type === 1"
            ></i>
          </template>
          <template #item-main>
            <p class="evaluate-content">{{ item.content }}</p>
          </template>
          <template #item-footer>
            <span class="evaluate-time">{{ item.publishTime }}</span>
          </template>
        </item-card>
      </div>
      <el-empty description="该游戏暂无评价" v-else />
    </el-card>
  </div>
</template>

<script>
import ItemCard from '@/components/Item-card.vue';
import { mapState } from 'vuex';
export default {
  components: {
    ItemCard,
  },
  name: 'Evaluation',
  data() {
    return {
      // 评价表达对象
      evaluationForm: {
        content: '',
        score: 0,
      },
      // 校验规则
      rules: {
        content: [{ required: true, message: '请输入评价内容', trigger: 'blur' }],
        score: [{ required: true, message: '请选择游戏评分', trigger: 'blur' }],
      },
      // 评价列表
      evaluationsList: [],
    };
  },
  computed: {
    // 评价信息
    evaluationInfo() {
      return {
        parent_game: this.$route.params.id,
        author: this.userData._id,
        content: this.evaluationForm.content,
        score: this.evaluationForm.score * 2,
      };
    },
    ...mapState(['userData', 'loginState']),
  },
  methods: {
    // 获取当前游戏的评价
    async getGameEvaluation() {
      try {
        const { data } = await this.$http.get(`rest/evaluations/eva?id=${this.$route.params.id}`);
        this.evaluationsList = data;
        // 更新游戏的评价平均分
        const avgScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;
        await this.$http.put(`/rest/gameInfo/${this.$route.params.id}`, {
          game_score: avgScore.toFixed(1),
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 提交表单
    submitEvaluation(formName) {
      // 表单校验，返回valid是否通过校验
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            // 检查用户是否在该游戏下发表过评价，避免重复发表
            const evaIsExist = this.evaluationsList.some((item) => {
              return item.author._id === this.userData._id;
            });
            if (evaIsExist) {
              this.$message({
                message: '你已发表过评价',
                type: 'error',
              });
              this.evaluationForm = { content: '', score: 0 };
              throw new Error('你已发表过评价');
            }
            await this.$http.post('/rest/evaluations/add', this.evaluationInfo);
            this.$message({
              message: '提交评价成功',
              type: 'success',
            });
            // 刷新页面重新获取数据
            this.$router.go(0);
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
    // 删除评价
    async removeEvaluation(item) {
      this.$confirm('是否删除评价', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          // 评价模型中删除对应ID的评价
          await this.$http.delete(`/rest/evaluations/delete/${item._id}`);
          this.$message({
            message: '删除评价成功',
            type: 'success',
          });
          // 刷新页面重新获取数据
          this.$router.go(0);
        } catch (err) {
          console.log(err);
          this.$message({
            message: '删除评价失败',
            type: 'error',
          });
        }
      });
    },
  },
  async created() {
    await this.getGameEvaluation();
    // 调用父组件获取数据请求方法，更新平均分
    this.$emit('getGameDetail');
  },
};
</script>

<style lang="less" scoped>
.Evaluation-container {
  .evaluate-form-card {
    margin: 10px 0;
    .evaluate-form {
      display: flex;
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
          &:focus,
          &:hover {
            background: #3d3d3d;
            border-color: #646464;
            color: #fff;
          }
        }
        .banStateTip {
          font-size: 20px;
          color: red;
          font-weight: 700;
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
        justify-content: space-between;
        margin: 10px 0;
        font-size: 18px;
        .box-left {
          display: flex;
          .nickname {
            margin-right: 10px;
          }
          .user-rate {
            .el-rate__icon {
              font-size: 24px;
            }
          }
        }
      }
      /deep/ .item-main {
        .evaluate-content {
          margin: 10px 0;
        }
      }
      /deep/ .item-footer {
        .evaluate-time {
          float: right;
          color: #969696;
        }
      }
    }
  }
}
</style>
