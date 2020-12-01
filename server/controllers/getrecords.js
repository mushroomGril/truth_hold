const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
    const { openId ,page} = ctx.request.query;   
    try {
        const records = await mysql('record')
                              .select('id','add','mark','note','create_time')
                              .where("openId",openId)
                              .orderBy('id','desc')
                              .limit(15).offset(Number(page)*15) //第一页 就是从1到15条数据 第二页 就是page=15 从15到30
        ctx.state.data = {
            records
        }
        console.log("记录获取成功" +records)
    } catch (e) {
       // 执行失败返回的数据
    ctx.state = {
        code: -1,
        data: {
          msg: '获取失败' + e.sqlMessage
        }
      }
        
    }
}