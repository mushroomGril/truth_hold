const { mysql } = require('../qcloud');
module.exports = async (ctx) => {
 
    const {id,note} = ctx.request.body;  
    console.log("1111",id)
    console.log("222",note)
    try {
       await mysql("record").where('id',id).update('note',note);
        
        ctx.state.data = {
            code:0,
            msg:"success"
        }
        console.log("备注修改成功")
    } catch (e) {
        ctx.state = {
            code:-1,
            data:{msg:"修改失败" + e.sqlMessage}
        }
        console.log( e.sqlMessage)
    }
}