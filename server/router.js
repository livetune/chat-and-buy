import user from "./user";
import chat from "./chat";
module.exports = function(router) {
  [user, chat].forEach(p => {
    p(router);
  });
};
