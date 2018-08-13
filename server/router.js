import user from "./user";
import chat from "./chat";
import goods from "./goods";
import order from "./order";
export default function(router) {
  [user, chat, goods, order].forEach(p => {
    p(router);
  });
}
