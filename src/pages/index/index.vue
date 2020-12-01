<template>
  <div>
    <div v-if="showLogin">
      <LoginWindow @changeShow="getModel(arguments)"></LoginWindow>
    </div>
    <div class="show">
      <div class="button">
        <div class="btn1" @click="recall">撤销</div>
        <div class="btn0" @click="reset">清零</div>
      </div>
      <div class="mark-text">当前分数</div>
      <div class="mark">{{ mark }}</div>
    </div>
    <div class="row">
      <div class="button right" @click="addMark(1)">+1</div>
      <div class="button left" @click="addMark(-1)">-1</div>
    </div>
    <div class="row">
      <div class="button right" @click="addMark(5)">+5</div>
      <div class="button left" @click="addMark(-5)">-5</div>
    </div>
  </div>
</template>

<script>
import LoginWindow from '@/components/LoginWindow'
import { showSuccess, showModal, post, get } from '@/utils'
export default {
  data () {
    return {
      mark: 0,
      userinfo: {},
      showLogin: false
    }
  },
  mounted () {
    // 页面加载一次之后就不会执行了
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo.openId) {
      this.userinfo = userinfo
      // console.log("用户信息", userinfo);
    } else {
      wx.hideTabBar() // 隐藏底部导航栏
      this.showLogin = true
    }
  },
  onShow () {
    // 每次切换页面都会执行
    this.getCurrentMark()
  },
  onPullDownRefresh () {
    // 微信小程序api，下拉刷新
    this.getCurrentMark()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage () {
    // 分享
    return {
      title: '自律律',
      path: '/pages/index/main'
    }
  },
  methods: {
    async addMark (add) {
      try {
        const data = {
          openId: this.userinfo.openId,
          add: add
        }
        await post('/weapp/createrecord', data)
        this.mark += add
      } catch (error) {
        showModal('请求失败', '请重试哦！')
        console.log('错误', error)
      }
    },
    getModel (val) {
      this.showLogin = val[0]
      this.userinfo = val[1]
      console.log(this.showLogin, this.userinfo)
      this.getCurrentMark()
    },
    async getCurrentMark () {
      // 从数据库读取mark
      try {
        const res = await get('/weapp/getmark', {
          openId: this.userinfo.openId
        })
        this.mark = res.mark
      } catch (error) {
        showModal('请求失败', '请下拉页面重试')
        console.log('失败', error)
      }
    },
    async resetMark () {
      // 清零
      if (this.mark !== 0) {
        try {
          await post('/weapp/resetmark', {
            openId: this.userinfo.openId
          })
          this.mark = 0
        } catch (error) {
          showModal('请求失败', '请重试')
          console.log('失败', error)
        }
      }
    },
    reset () {
      // 弹出提示框是否清零
      let that = this
      wx.showModal({
        content: '确定清零吗?',
        success: function (res) {
          if (res.confirm) {
            that.resetMark()
          }
        }
      })
    },
    async recall () { // 撤销
      try {
        const res = await post('/weapp/deleterecord', {
          openId: this.userinfo.openId
        })
        this.mark = res.mark
        showSuccess('撤销成功')
      } catch (error) {
        showModal('撤销失败', error.data.msg)
        console.log('撤销失败', error)
      }
    }
  },
  components: {
    LoginWindow
  }
}
</script>

<style lang="scss" scoped>
.show {
  text-align: center; /*文字居中 */
  height: 266px;
  background: #ea5149;
  margin-bottom: 5px;
  color: #fff;
  font-weight: bold;
  .mark-text {
    font-size: 20px;
    padding: 28px;
  }
  .mark {
    font-size: 88px;
  }
  .button {
    margin: 0 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    background: #ea5149;
    .btn0 {
      width: 60px;
      border-radius: 15px;
      border: 1px dashed #feb600;
    }
    .btn1 {
      width: 60px;
      border-radius: 15px;
      border: 1px dashed #feb600;
      float: right;
    }
  }
}
.row {
  margin: 40px 56px;
  .button {
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 20%;
    border: none;
    text-align: center;
    font-size: 25px;
    color: #fff;
    font-weight: bold;
  }
  .right {
    background: #ea5149;
    float: right;
  }
  .left {
    background: #feb600;
    margin-right: 80px;
  }
}
</style>
