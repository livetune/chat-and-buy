const user = require("./user");


module.exports = function(router) {
  [
    user
  ].forEach((p) => {
    p(router);
  })
}