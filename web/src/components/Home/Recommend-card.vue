<template>
  <div class="Recommend-card-container">
    <el-card class="recommend-card" style="margin: 20px 0; background-color: #f8f8f9">
      <div slot="header" class="header">
        <span>游戏推荐</span>
      </div>
      <div class="card-box">
        <!-- 游戏平台卡片 -->
        <el-card class="platform-card" shadow="false" :body-style="{ paddingBottom: '0px' }">
          <div slot="header" class="header">
            <span>游戏平台</span>
          </div>
          <div class="link-container">
            <router-link class="platform-link" to="/game/library">
              <div class="platform-link-img-div" style="background: #171a21">
                <img src="../../assets/icon/platform/steam-white-64.png" alt="" />
              </div>
              <p>Steam</p>
            </router-link>
            <router-link class="platform-link" to="/game/library">
              <div class="platform-link-img-div" style="background: #00439c">
                <img src="../../assets/icon/platform/playstation-white-64.png" alt="" />
              </div>
              <p>PlayStation</p>
            </router-link>
            <router-link class="platform-link" to="/game/library">
              <div class="platform-link-img-div" style="background: #0f760f">
                <img src="../../assets/icon/platform/xbox-white-64.png" alt="" />
              </div>
              <p>Xbox</p>
            </router-link>
            <router-link class="platform-link" to="/game/library">
              <div class="platform-link-img-div" style="background: #fa0000">
                <img src="../../assets/icon/platform/nintendo-switch-white-64.png" alt="" />
              </div>
              <p>Switch</p>
            </router-link>
          </div>
        </el-card>
        <!-- 高分游戏卡片 -->
        <el-card class="top-card" shadow="false">
          <div slot="header" class="header">
            <span>高分游戏</span>
            <router-link class="show-more-link" to="/game/library">
              <span>更多</span>
              <i class="el-icon-d-arrow-right"></i>
            </router-link>
          </div>
          <div class="top-card-body">
            <ul class="game-list">
              <li v-for="item in 8" :key="item">
                <router-link class="game-link" to="/game/library">
                  <!-- 卡片项组件 -->
                  <item-card path="#">
                    <template #img-box>
                      <img class="game-cover" src="../../assets/img/图片.png" alt="" />
                    </template>
                    <template #item-title>
                      <p class="game-name">游戏名 {{ item }}</p>
                    </template>
                    <template #item-info>
                      <p class="game-platform">PS4 iOS</p>
                      <p class="game-gene">动作 角色扮演 沙箱</p>
                    </template>
                  </item-card>
                </router-link>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import ItemCard from '../Item-card';
export default {
  components: { ItemCard },
  name: 'RecommendCard',
};
</script>

<style lang="less" scoped>
.el-card {
  margin: 5px 0;
  border: none;
  .header {
    span {
      font-size: 20px;
      color: #2a2424;
      font-weight: 600;
    }
  }
}
.card-box {
  .header {
    span {
      font-size: 18px;
      color: #333;
    }
  }
  .platform-card {
    .link-container {
      display: flex;
      justify-content: space-between;
      padding: 0 100px;
      .platform-link {
        text-decoration: none;
        text-align: center;
        color: #333;
        font-weight: bold;
        .platform-link-img-div {
          display: inline-block;
          padding: 20px;
          border-radius: 10px;
        }
      }
    }
  }
  .top-card {
    margin-top: 20px;
    .header {
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
    .game-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 0;
      padding: 0;
      list-style-type: none;
      li {
        width: 460px;
      }
      .game-link {
        text-decoration: none;
      }
      .img-box {
        .game-cover {
          width: 120px;
          height: 108px;
        }
      }
      .item-title {
        p {
          margin: 10px 0;
        }
      }
      .item-info {
        p {
          margin: 5px 0;
        }
        .game-platform {
          font-size: 14px;
          color: #646464;
        }
        .game-gene {
          font-size: 14px;
          color: #646464;
        }
      }
    }
  }
}
</style>
