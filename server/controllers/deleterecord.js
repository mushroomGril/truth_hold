const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
    const { openId } = ctx.request.body;
    let mark;
    try {
        //找到数据库record表中最后一条记录
        const res = await mysql("record")
            .where("openId", openId)
            .orderBy("id", "desc")
            .first();
        //如果最后一条记录存在
        if (res) {
            //删除最后一条
            await mysql("record").where('id', res.id).del();
            //找到删除后一条记录的上一条记录的mark字段
            const re_res = await mysql("record")
                .where("openId", openId)
                .select("mark")
                .orderBy("id", "desc")
                .first();
            //如果存在，则把值赋值给mark变量，否则mark的值为0
            if (re_res) {
                mark = re_res.mark;
            } else {
                mark = 0;
            }

        } else {
            mark = 0;
        }
        //结果返回给前端
        ctx.state.data = {
            code: 0,
            msg: "success",
            mark:mark
        }
    } catch (error) {
        console.log("失败"),
            ctx.state = {
                code: -1,
                data: {
                    msg: '撤销失败' + error.sqlMessage
                }
            }
    }
}