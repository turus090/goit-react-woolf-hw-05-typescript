var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };

var initialState = {
  isRequestInProgress: false,
  requestStep: "idle",
};
function requestReducer(state, action) {
  switch (action.type) {
    case "START_REQUEST":
      return __assign(__assign({}, state), {
        isRequestInProgress: true,
        requestStep: "start",
      });
    case "PENDING_REQUEST":
      return __assign(__assign({}, state), {
        isRequestInProgress: true,
        requestStep: "pending",
      });
    case "FINISH_REQUEST":
      return __assign(__assign({}, state), {
        isRequestInProgress: false,
        requestStep: "finished",
      });
    case "RESET_REQUEST":
      return __assign(__assign({}, state), {
        isRequestInProgress: false,
        requestStep: "idle",
      });
    default:
      return state;
  }
}
