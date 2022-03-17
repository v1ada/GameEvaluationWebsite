<template>
  <div class="gameDetail-container">
    <el-card class="game-main" :body-style="{ display: 'flex', justifyContent: 'space-between' }">
      <div slot="header" class="game-title">
        <h2>塞尔达传说：旷野之息</h2>
        <p>The Legend of Zelda：Breath of the Wild</p>
      </div>
      <div class="game-picture">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in 9" :key="item">
            <img
              src="https://img01.vgtime.com/photo/web/160616170441201.jpg?x-oss-process=image/resize,m_pad,color_000000,w_1050,h_660"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="game-info">
        <img
          class="game-cover"
          src="https://img01.vgtime.com/game/cover/2017/01/13/17011315401782.png?x-oss-process=image/resize,m_lfit,w_300"
          alt=""
        />
        <div class="game-descri">
          <div class="game-score">
            <span>游戏评分</span>
            <span class="score">9.8</span>
          </div>
          <div class="platform">
            <p>游戏平台</p>
            <div class="tag-box">
              <el-tag v-for="item in platform" :key="item" effect="plain" size="medium ">
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div class="game-type">
            <p>游戏类型</p>
            <div class="tag-box">
              <el-tag v-for="item in game_type" :key="item" effect="plain" size="medium ">
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div class="game-date">
            <span>发售时间</span>
            <span class="date">2021-10-31</span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 评价表单 -->
    <el-card class="evaluate-form-card">
      <el-form class="evaluate-form">
        <el-form-item prop="content">
          <el-input
            class="form-content"
            type="textarea"
            v-model="form_content"
            placeholder="请输入内容"
            maxlength="100"
            rows="3"
            :show-word-limit="true"
            resize="none"
            @input="changeInput($event)"
          />
        </el-form-item>
        <div class="box">
          <el-form-item prop="rate">
            <span class="rate-title">游戏评分</span>
            <el-rate class="form-rate" v-model="form_score" />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GameDetail',
  data() {
    return {
      platform: ['NS', 'PS4', 'XB1', 'PC', 'iOS', 'Android', 'PS3', 'PSP', 'PS'],
      game_type: ['动作', '角色扮演', '沙箱', '第三人称', '射击', '开放世界', '剧情'],
      from_content: '',
      form_score: null,
      rules: {
        content: [{ required: true, message: '请输入评价内容', trigger: 'blur' }],
        rate: [{ required: true, message: '请选择游戏评分', trigger: 'blur' }],
      },
    };
  },
  computed: {
    finalScore() {
      return this.form_score * 2;
    },
  },
  methods: {
    changeInput($event) {
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="less" scoped>
.gameDetail-container {
  // background-color: #fff;
  .game-main {
    .game-title * {
      margin: 0;
    }
    .game-picture {
      width: 800px;
      img {
        width: 800px;
      }
    }
    .game-info {
      max-width: 300px;
      .game-cover {
        width: 100%;
      }
      .game-score,
      .platform,
      .game-type,
      .game-date {
        display: flex;
        font-size: 14px;
        margin: 10px 0 0 0;
        color: #646464;
        p {
          margin: 0;
          width: 40%;
          line-height: 32px;
        }
        .score {
          font-size: 50px;
        }
        .score,
        .date {
          margin-left: 15px;
          color: #333;
        }
        .tag-box {
          span {
            margin: 2px 2px;
            color: #333;
            border-color: #d1d1d1;
          }
        }
      }
    }
  }
  .evaluate-form-card {
    margin: 10px 0;
    .evaluate-form {
      display: flex;
      // justify-content: space-between;
      .el-form-item {
        margin: 0;
      }
      .form-content {
        width: 600px;
        height: 120px;
      }
      .box {
        margin-left: 50px;
        .rate-title {
          font-size: 18px;
        }
        .form-rate {
          margin-bottom: 20px;
          /deep/ .el-rate__icon {
            font-size: 30px;
          }
        }
        /* el-button */
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
}
</style>
