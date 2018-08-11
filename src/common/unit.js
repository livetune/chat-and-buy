export function filterNoReadCount(userId, messageList) {
  let noReadCountArray = [];
  messageList.map(v => {
    const sendObj = v.get("bothSide").find(v => v.get("user") === userId);
    let readId;
    if (sendObj) {
      readId = sendObj.get("lastId");
    }
    const message = v.get("messages").filter(v => {
      return v.get("to") === userId;
    });

    if (readId) {
      let index = message.findIndex(v => readId === v.get("_id"));
      noReadCountArray.push(message.size - index - 1);
    } else {
      noReadCountArray.push(message.size);
    }
    return noReadCountArray;
  });
  return noReadCountArray;
}
