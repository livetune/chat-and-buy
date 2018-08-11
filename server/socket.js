import model from "./model";
const User = model.user;
const Chat = model.chat;
let clients = {};
global.clients = clients;
const io = global.io;

module.exports = function() {
  io.on("connection", function(client) {
    client.on("user", user => {
      console.log(user)
      clients[user] = client.id;
      client.user = user;
    });
    client.on("disconnect", () => {
      console.log(client.user);
      if (client.user) {
        delete clients[client.user];
      }
    });

    client.on("getUserName", async id => {
      await User.findOne({ _id: id }, (e, doc) => {
        if (doc) {
          client.emit("userName", doc.user);
        } else {
          client.emit("serverError", {
            errorMsg: "找不到该用户"
          });
        }
      });
    });

    client.on("sendMessage", async data => {
      const { from, to, message } = data;
      const messageId = [from, to].sort().join("");
      const obj = {
        from,
        to,
        message,
        date: Date()
      };

      try {
        let from_user = await User.findOne({ _id: from });
        let to_user = await User.findOne({ _id: to });
        if (!from_user || !to_user) {
          client.emit({
            errorMsg: "找不到聊天对象"
          });
          return;
        }
        let chat_message = await Chat.findOne({
          messageId
        });
        if (!chat_message) {
          let chatModel = new Chat({
            messageId,
            bothSide: [
              {
                user: from,
                name: from_user.user
              },
              {
                user: to,
                name: to_user.user
              }
            ],
            messages: [obj]
          });
          let chat = await chatModel.save();
          if (clients[to]) {
            io.to(clients[to]).emit("message", {
              obj: chat.messages[chat.messages.length - 1],
              name: from_user.user
            });
          }
        } else {
          chat_message.messages.push(obj);
          let chat = await chat_message.save();
          if (clients[to]) {
            io.to(clients[to]).emit("message", {
              obj: chat.messages[chat.messages.length - 1],
              name: from_user.user
            });
          }
        }
      } catch (e) {
        client.emit({
          errorMsg: "数据库出错"
        });
      }
    });
  });
};
