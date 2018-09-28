import model from './model'
const Chat = model.chat

export default function(router) {
  router.post('/chat/getMessageList', async (ctx, next) => {
    const { id } = ctx.request.decoded
    try {
      let chatData = await Chat.find({ messageId: { $regex: id } })
      ctx.body = {
        code: 0,
        data: chatData
      }
    } catch (e) {
      ctx.status = 500
      ctx.body = {
        msg: '服务器出错'
      }
    }
  })

  router.post('/chat/cleanNoRead', async (ctx, next) => {
    const { id } = ctx.request.decoded
    const { messageId, readId } = ctx.request.body
    try {
      await Chat.findOneAndUpdate(
        { 'bothSide.user': id, messageId },
        { $set: { 'bothSide.$.lastId': readId } }
      )
      ctx.body = {
        code: 0
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        msg: '服务器出错'
      }
    }
  })
}
