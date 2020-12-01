<template>
  <div>
    <!-- 如果在数据库没有查询到记录，show_record为false，提示当前没有记录 -->
    <div v-if="show_record">
      <div class="prompt">还没有任何记录哦~</div>
    </div>
    <!-- 如果在数据库查询到该用户的记录，show_record默认为true，显示记录表格 -->
    <div v-else>
      <div class="table th">
        <div class="date">时间</div>
        <div class="busi">分数</div>
        <div class="mark">最后得分</div>
        <div class="net">备注</div>
      </div>
      <!-- :record是将每个循环的记录数据传到RecordList组件中 -->
      <RecordeList
        v-for="(record, index) in records"
        :key="index"
        :record="record"
      />
      <p class="text-footer" v-if="!more">没有更对数据了</p>
      <p class="text-footer" v-else>加载中...</p>
    </div>
  </div>
</template>
<script>
import RecordeList from '@/components/RecordeList'
import {get} from '@/utils'
export default {
  data () {
    return {
      userinfo: {},
      show_record: false,
      records: [],
      page: 0, // 当前页数
      more: true// 表示有更多数据
    }
  },
  onShow () {
    const userinfo = wx.getStorageSync('userinfo')
    // 如果缓存中有userinfo的信息，说明用户登录了。
    if (userinfo.openId) {
      // 将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
      this.userinfo = userinfo
      this.getRecords(true)
    }
  },
  onShareAppMessage (e) {
    return {
      title: '自律律',
      path: '/pages/index/main',
      imageUrl: ''
    }
  },
  onReachBottom () {
    if (!this.more) {
      return
    }
    this.page = this.page + 1// 加载下一页
    this.getRecords()
  },
  onPullDownRefresh () {
    this.getRecords(true)
    wx.stopPullDownRefresh()
  },
  methods: {
    async getRecords (init) {
      // 调用后台数据时显示「加载中」提示框
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })
      if (init) {
        this.page = 0
        this.more = true
      }
      if (this.page === 0) {
        this.records = []
      }
      try {
        // 需要传到后台的数据
        const data = {
          openId: this.userinfo.openId,
          page: this.page
        } 
        // 将后台传过来的数据保存到records变量中 
        const res = await get('/weapp/getrecords', data)
        // concat 是拼接数组方法，将新查出来的数据，拼接到records数组中
        this.records = this.records.concat(res.records)
        // 每次在数据库中查找15条数据，如果查出的数据不足15条说明是最后一页了
        if (res.records.length < 15 && this.page > 0) {
          this.more = false
        }
        // console.log("从后台返回的记录数据：", this.records);
        // 通过records数组的长度来判断show_record变量为false或者true
        if (this.records.length === 0) {
          this.show_record = true
        } else {
          this.show_record = false
        }
        wx.hideToast()
      } catch (e) {
        wx.hideToast()
      }
    }
  },
  components: {
    RecordeList
  }
}
</script>
<style lang="scss">
.add {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  p {
    font-size: 15px;
  }
}
.th {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: #ea5149;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  display: flex;
}
.prompt {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}
.date {
  width: 23%;
  padding-left: 60px;
}
.busi {
  width: 10%;
  margin-left: 5px;
}
.mark {
  width: 20%;
  margin-left: 10px;
}
.net {
  width: 20%;
  margin-left: 20px;
}
.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
  padding-top: 5px;
}
</style>