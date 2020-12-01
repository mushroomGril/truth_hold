<template>
  <div class="book-card">
    <div class="table" width="98%">
      <div class="tr">
        <div class="dates">{{ create_time }}</div>
        <div class="busi">
          <label v-if="record.add > 0">+{{ record.add }}</label>
          <label v-if="record.add == 0">&nbsp;0</label>
          <label v-if="record.add < 0">{{ record.add }}</label>
        </div>

        <div class="mark">
          <label v-if="record.mark >= 0"> &nbsp;{{ record.mark }}</label>
          <label v-else> {{ record.mark }} </label>
        </div>

        <div class="net" @click="changeShow">
          <label v-if="note"> {{ note }}</label>
          <label v-else class="no-note">点击添加</label>
        </div>

        <label v-if="show_input">
          <div class="image" @click="cancel">
            <image class="img" src="/static/images/quxiao.png"></image>
          </div>
        </label>
        <label v-else>
          <div class="image" @click="changeShow">
            <image class="img" :src="note ? src : ''"></image>
          </div>
        </label>
      </div>
    </div>
    <div class="hide" v-if="show_input">
      <button class="btn" @click="updateNote">
        <label v-if="record.note">修改</label>
        <label v-else>添加</label>
      </button>
      <input
        v-model="note"
        class="input"
        maxlength="10"
        placeholder="最多输入10个字"
      />
    </div>
  </div>
</template>
<script>
import { formatTime } from '../utils/index'
import { post, showModal } from '@/utils'
export default {
  props: ['record'],
  data () {
    return {
      create_time: formatTime(new Date(this.record.create_time)),
      show_input: false,
      note: this.record.note,
      src: '/static/images/bianji.png'
    }
  },
  methods: {
    changeShow () {
      this.show_input = !this.show_input
    },
    // 修改备注
    async updateNote () {
      try {
        const data = {
          id: this.record.id,
          note: this.note
        }
        await post('/weapp/updatenote', data)
        this.show_input = false// 点击添加或修改按钮，隐藏文本框
        this.record.note = this.note // 将父组件传过来的record中note的值更新为修改后的值
      } catch (error) {
        showModal('备注修改失败', '请重新提交')
      }
    },
    cancel () {
      this.show_input = !this.show_input
      this.note = this.record.note// 点击取消按钮后，将note变为上一次记录的值（或者初始值null)
    }
  }

  // props:{
  //     'record':Object
  // }
}
</script>
<style lang="scss">
.book-card {
  background: #ffffff;
  margin-bottom: 6px;
  .table {
    border: 0px solid darkgray;
    font-size: 15px;
    height: 42px;
    line-height: 42px;
    .tr {
      display: flex;
      width: 100%;
    }
    .dates {
      width: 40%;
      margin-left: 10px;
    }
    .busi {
      width: 10%;
      font-weight: bold;
    }
    .mark {
      width: 15%;
      margin-left: 20px;
      font-weight: bold;
    }
    .net {
      width: 16%;
      text-align: center;
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      margin-left: 5px;
      line-height: 42px;
      .no-note {
        text-decoration: underline;
        color: #c0c0c0;
        font-size: 13px;
      }
    }
    .image {
      padding-top: 1px;
      float: right;
      margin-left: 5px;
    }
  }
  .hide {
    background: #f0f0f0;
    font-size: 15px;
    padding: 10px 10px 3px 30px;
    .input {
      width: 60%;
      height: 30px;
      background: #ffffff;
      border: 1px solid black;
      border-radius: 5px;
      text-align: center;
    }
    .btn {
      color: white;
      background: #ea5a49;
      padding-left: 15px;
      margin-right: 20px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      width: 18%;
      float: right;
    }
  }
  .img {
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>