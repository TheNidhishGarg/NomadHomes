// a function throwing next error middleware when error is triggered!
module.exports = function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
