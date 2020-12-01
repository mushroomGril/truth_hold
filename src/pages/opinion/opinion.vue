<template>
  <div class="contain">
    <div class="row">
      <label class="name">意见反馈</label>
    </div>
    <div class="row text">
      <div>
        <textarea
          v-model="opinion"
          maxlength="200"
          placeholder="点击这里输入您的建议"
          class="input"
        ></textarea>
        <label class="word-count">{{ word_count }}/200</label>
      </div>
    </div>
    <div class="row">
      <div>
        <label for="" class="name">相关截图(选填)</label>
        <label class="img-count">{{ img_count }}/2</label>
      </div>
      <label v-for="(item, index) in src" :key="index">
        <img :src="item" class="img" />
      </label>
      <label v-if="img_count < 2" @click="uploadPictrue">
        <img class="add-img" src="../../../static/images/addimage.png" alt="" />
      </label>
    </div>
    <div class="row">
      <div class="name">微信号（选填）</div>
      <input
        v-model="wechat"
        maxlength="20"
        placeholder="如果想要详细交流，点击这里留下微信号哦"
        class="wechat-input"
      />
    </div>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
import {showModal, post} from '@/utils'
export default {
  data () {
    return {
      opinion: '',
      word_count: 0,
      src: [],
      img_count: 0,
      wechat: ''
    }
  },
  watch: {
    // 实时监控，函数名必须与监控的变量名一致
    opinion () {
      this.word_count = this.opinion.length
    },
    src () {
      this.img_count = this.src.length
    }
  },
  methods: {
    uploadPictrue () {
      let that = this
      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.src.push(tempFilePaths)
        }
      })
    },
    async submit () {
      if (this.word_count > 0) {
        // data是要提交给后端的数据，其中包含openid、opinion意见信息、
        // src图片链接、wechat用户微信
        const data = {
          opinion: this.opinion,
          src: this.src.join(','),
          wechat: this.wechat,
          openId: wx.getStorageSync('userinfo').openId
        }
        try {
          // 通过这行代码请求请求后端服务器，并传递参数data
          // await等后端执行完并获取到返回数据之后，再往下执行
          await post('/weapp/createopinion', data)
          showModal('提交成功', '已经将的反馈信提交给开发者了')
        } catch (error) {
          console.log('从后端返回执行错误的信息' + error)
          showModal('提交失败', '服务器出错了')
        }
      } else {
        showModal('提交失败', '反馈内容不能为空哦~')
      }
    }
  }
}
</script>
<style  lang="scss">
.contain {
  background: #ffffff;
  font-size: 15px;
  .text {
    height: 110px;
  }
  .row {
    border-bottom: 1px #e8e8e8 solid;
    padding: 5px 15px;
    .name {
      width: 80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width: 100%;
      height: 85px;
      font-size: 14px;
      padding-top: 5px;
    }
    .word-count {
      float: right;
      color: #808080;
    }
    .img-count {
      float: right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width: 80px;
      height: 80px;
    }
    .img {
      width: 66px;
      height: 66px;
      margin-bottom: 7px;
      margin-right: 10px;
    }
    .wechat-input {
      font-size: 14px;
    }
  }
}
button {
  margin: 20px auto;
  width: 90%;
  border-radius: 5px;
  background: #ea5149;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}
</style>