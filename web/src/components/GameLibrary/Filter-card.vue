<template>
  <div class="game-filter-container">
    <el-card class="game-filter-card">
      <div slot="header" class="header">
        <span>游戏库</span>
      </div>
      <el-form
        :model="filterForm"
        :rules="rules"
        ref="filterForm"
        label-width="100px"
        class="filter-form"
      >
        <el-form-item label="游戏平台" prop="platform">
          <el-checkbox
            label="全部平台"
            name="allPlatform"
            v-model="allPlatform"
            @change="allOptionChange($event, 'allPlatform')"
          />
          <el-checkbox-group
            v-model="filterForm.platform"
            @change="checkGroupChange($event, 'platform')"
          >
            <el-checkbox label="PC" name="platform" />
            <el-checkbox label="PS4" name="platform" />
            <el-checkbox label="XB1" name="platform" />
            <el-checkbox label="NS" name="platform" />
            <el-checkbox label="PS5" name="platform" />
            <el-checkbox label="XSX|S" name="platform" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="游戏类型" prop="type">
          <el-checkbox
            label="全部类型"
            name="allType"
            v-model="allType"
            @change="allOptionChange($event, 'allType')"
          />
          <el-checkbox-group v-model="filterForm.type" @change="checkGroupChange($event, 'type')">
            <el-checkbox label="动作" name="type" />
            <el-checkbox label="冒险" name="type" />
            <el-checkbox label="平台" name="type" />
            <el-checkbox label="角色扮演" name="type" />
            <el-checkbox label="射击" name="type" />
            <el-checkbox label="开放世界" name="type" />
            <el-checkbox label="沙箱" name="type" />
            <el-checkbox label="科幻" name="type" />
            <el-checkbox label="恐怖" name="type" />
            <el-checkbox label="多人" name="type" />
            <el-checkbox label="益智" name="type" />
            <el-checkbox label="竞速" name="type" />
            <el-checkbox label="VR" name="type" />
            <el-checkbox label="剧情" name="type" />
            <el-checkbox label="回合制" name="type" />
            <el-checkbox label="模拟" name="type" />
            <el-checkbox label="策略" name="type" />
            <el-checkbox label="竞技" name="type" />
            <el-checkbox label="文字" name="type" />
            <el-checkbox label="音乐" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="排序方式" prop="sort">
          <el-select v-model="filterForm.sort">
            <el-option label="评价从高到低" value="scoreDesc" />
            <el-option label="评价从低到高" value="scoreAsc" />
            <el-option label="日期从新到旧" value="dateDesc" />
            <el-option label="日期从旧到新" value="dateAsc" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('filterForm')">立即筛选</el-button>
          <el-button @click="resetForm('filterForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FilterCard',
  data() {
    return {
      allPlatform: true,
      allType: true,
      filterForm: {
        platform: [],
        type: [],
        sort: 'scoreDesc',
      },
      rules: {
        platform: [{ type: 'array', message: '请至少选择一个游戏平台', trigger: 'change' }],
        type: [{ type: 'array', message: '请至少选择一个游戏类型', trigger: 'change' }],
        sort: [{ message: '请选择排序方式', trigger: 'change' }],
      },
    };
  },
  methods: {
    // 全选变化时
    allOptionChange(event, option) {
      // 选中全部类型 清除其他多选框
      if (event) {
        if (option === 'allPlatform') this.filterForm.platform = [];
        if (option === 'allType') this.filterForm.type = [];
      }
      // 没有选中其他多选框，不能取消全部类型
      if (!this.filterForm.platform.length) this.allPlatform = true;
      if (!this.filterForm.type.length) this.allType = true;
    },
    // check组变化时，
    checkGroupChange(checkedArr, option) {
      if (option === 'platform') {
        // 判断是否有选择
        if (checkedArr.length) this.allPlatform = false;
        // 没有选择 则全选
        else this.allPlatform = true;
      }
      if (option === 'type') {
        if (checkedArr.length) this.allType = false;
        else this.allType = true;
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 回到首页
          this.$store.commit('changeGamesListPage', { num: 1 });
          this.$store.commit('changeFilter', this.filterForm);
          // 分发action
          this.$store.dispatch('getGamesListData', {
            filter: this.filterForm,
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.allOptionChange();
    },
  },
};
</script>

<style lang="less" scoped>
.game-filter-card {
  .header {
    span {
      font-size: 20px;
      color: #2a2424;
      font-weight: 600;
    }
  }
  /deep/ .filter-form {
    .el-form-item__label {
      font-size: 16px;
    }
    // el-checkbox 样式
    .el-checkbox__input.is-checked {
      & .el-checkbox__inner {
        background-color: #333;
        border-color: #333;
      }
      & + .el-checkbox__label {
        color: #333;
      }
    }
    .el-checkbox__input.is-focus {
      & .el-checkbox__inner {
        border-color: #333;
      }
    }
    .el-checkbox__inner:hover {
      border-color: #333;
    }
    // el-select 样式
    .el-select {
      .el-input {
        .el-input__inner {
          border-color: #c6cbd7;
          color: #333;
          &:hover,
          &:focus {
            border-color: #333;
          }
        }
      }
    }
    // el-button 样式
    .el-button {
      background-color: #fff;
      border-color: #c6cbd7;
      &:hover {
        border-color: #333;
        color: #333;
      }
      &:focus {
        color: #606266;
      }
    }
    .el-button--primary,
    .el-button--primary:focus {
      color: #fff;
      background-color: #333;
      border-color: #333;
      &:hover {
        background: #505050;
        border-color: #505050;
        color: #fff;
      }
    }
  }
}
//  el-select下拉框 样式
.el-select-dropdown {
  .el-select-dropdown__item.selected {
    color: #333;
  }
  .el-input__inner {
    color: #333;
  }
}
</style>
