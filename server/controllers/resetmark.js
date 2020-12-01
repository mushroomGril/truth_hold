const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
    const {openId} = ctx.request.body;
    try {
        let add = 0 ;
        let mark = 0;
        let note = "清零";
        await mysql('record').insert({
            openId,add,mark,note
        });
        ctx.state.data = {
            code:0,
            msg:"success"
        }        
    } catch (error) {
        console.log("失败"),
        ctx.state = {
            code:-1,
            data:{
                msg:'清零失败' + error.sqlMessage
            }
        }
    }
}