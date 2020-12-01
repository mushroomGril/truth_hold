const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
    const { openId, add } = ctx.request.body;
    let mark;
    try {
        const res = await mysql('record')
            .where('openId', openId)
            .select('mark')
            .orderBy('id', 'desc')
            .first();
        if (res) {
            mark = res.mark;
        } else {
            mark = 0;
        }
        mark = mark + add;
        await mysql('record').insert({
            openId, add, mark
        });
        ctx.state.data = {
            code: 0,
            msg: 'success'
        }
        console.log("执行成功")

    } catch (error) {
        ctx.state = {
            code: -1,
            data: {
                msg: "添加失败" + error.sqlMessage
            }
        }
        console.log("执行错误")
    }
}