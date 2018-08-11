import user from "./user";
import chat from "./chat";
import goods from "./goods";

export default function(router) {
  [user, chat, goods].forEach(p => {
    p(router);
  });
}
