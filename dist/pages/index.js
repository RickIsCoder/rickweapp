'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.compontents = {}, _this.methods = {
      chooseUser: function chooseUser(user) {
        var _this2 = this;

        if (this.jumpOne && this.jumpOne !== user.name) {
          _wepy2.default.showModal({
            title: '提示',
            content: '换人会造成任务列表丢失',
            success: function success(res) {
              if (res.confirm) {
                _wepy2.default.removeStorageSync('taskList');
                _this2.taskList = [];
                _this2.jumpOne = false;
                _this2.setUser(user);
                _this2.$apply();
              }
            }
          });
          return;
        }
        this.jumpOne = false;
        this.setUser(user);
      },
      backToOne: function backToOne() {
        this.jumpOne = this.user.name;
        _wepy2.default.setNavigationBarTitle({
          title: ''
        });
        _wepy2.default.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#00a388'
        });
      },
      addTask: function addTask() {
        this.showPop = true;
      },
      closePop: function closePop() {
        this.showPop = false;
        this.showContent = false;
      },
      chooseRank: function chooseRank(rank) {
        this.rank = rank + 1;
      },
      chooseScore: function chooseScore(score) {
        this.score = score + 1;
      },
      toggleCombo: function toggleCombo() {
        this.combo = this.combo === 1 ? 2 : 1;
      },
      confirm: function confirm() {
        this.showPop = false;
        this.submitTask();
      },
      bindTaskTitle: function bindTaskTitle(e) {
        this.curTask.title = e.detail.value;
      },
      bindTaskContent: function bindTaskContent(e) {
        this.curTask.content = e.detail.value;
      },
      showTaskContent: function showTaskContent(task) {
        this.showPop = true;
        this.showContent = task.content || '这货懒得没写';
      }
    }, _this.computed = {
      step: function step() {
        return !this.user.name || this.jumpOne ? 1 : 2;
      },
      finalScore: function finalScore() {
        return Math.floor(this.base * (this.rank / this.user.rank) * (this.score / 3) * this.combo);
      }
    }, _this.data = {
      navTitle: '',
      navColor: '#00a388',
      step: 1,
      user: {},
      showPop: false,
      base: 100,
      combo: 1,
      rank: 1,
      score: 1,
      showContent: false,
      curTask: {},
      taskList: [],
      jumpOne: false,
      userList: [{
        name: '大鱼',
        rank: '4'
      }, {
        name: '杜松',
        rank: '1'
      }, {
        name: '五柳',
        rank: '4'
      }, {
        name: '新雨',
        rank: '1'
      }, {
        name: '夕颜',
        rank: '2'
      }, {
        name: '驯鹿',
        rank: '3'
      }, {
        name: '藏马',
        rank: '2'
      }]
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var user = _wepy2.default.getStorageSync('user');
      this.user = user || {};
      if (user.name) {
        _wepy2.default.setNavigationBarTitle({
          title: '计分板'
        });
        _wepy2.default.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#000000',
          animation: {
            duration: 500
          }
        });
      }
      var taskList = _wepy2.default.getStorageSync('taskList');
      this.taskList = taskList || [];
    }
  }, {
    key: 'setUser',
    value: function setUser(user) {
      _wepy2.default.setStorage({
        key: 'user',
        data: user
      });
      this.user = user;
      _wepy2.default.setNavigationBarTitle({
        title: '计分板'
      });
      _wepy2.default.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
        animation: {
          duration: 500
        }
      });
    }
  }, {
    key: 'submitTask',
    value: function submitTask() {
      var task = _extends({}, this.curTask, {
        rank: this.rank,
        score: this.score,
        combo: this.combo,
        finalScore: this.finalScore
      });
      this.resetCurTask();
      this.taskList.push(task);
      _wepy2.default.setStorageSync('taskList', this.taskList);
    }
  }, {
    key: 'resetCurTask',
    value: function resetCurTask() {
      this.curTask = {};
      this.rank = 1;
      this.score = 1;
      this.combo = 1;
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29tcG9udGVudHMiLCJtZXRob2RzIiwiY2hvb3NlVXNlciIsInVzZXIiLCJqdW1wT25lIiwibmFtZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJ0YXNrTGlzdCIsInNldFVzZXIiLCIkYXBwbHkiLCJiYWNrVG9PbmUiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJmcm9udENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYWRkVGFzayIsInNob3dQb3AiLCJjbG9zZVBvcCIsInNob3dDb250ZW50IiwiY2hvb3NlUmFuayIsInJhbmsiLCJjaG9vc2VTY29yZSIsInNjb3JlIiwidG9nZ2xlQ29tYm8iLCJjb21ibyIsInN1Ym1pdFRhc2siLCJiaW5kVGFza1RpdGxlIiwiZSIsImN1clRhc2siLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmRUYXNrQ29udGVudCIsInNob3dUYXNrQ29udGVudCIsInRhc2siLCJjb21wdXRlZCIsInN0ZXAiLCJmaW5hbFNjb3JlIiwiTWF0aCIsImZsb29yIiwiYmFzZSIsImRhdGEiLCJuYXZUaXRsZSIsIm5hdkNvbG9yIiwidXNlckxpc3QiLCJnZXRTdG9yYWdlU3luYyIsImFuaW1hdGlvbiIsImR1cmF0aW9uIiwic2V0U3RvcmFnZSIsImtleSIsInJlc2V0Q3VyVGFzayIsInB1c2giLCJzZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxXLEdBQWMsRSxRQXVCZEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxJQURILEVBQ1M7QUFBQTs7QUFDZixZQUFJLEtBQUtDLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxLQUFpQkQsS0FBS0Us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ZUFBTztBQURrQixPQUEzQjtBQUdBLHFCQUFLVyxxQkFBTCxDQUEyQjtBQUN6QkMsb0JBQVksU0FEYTtBQUV6QkMseUJBQWlCLFNBRlE7QUFHekIrQixtQkFBVztBQUNUQyxvQkFBVTtBQUREO0FBSGMsT0FBM0I7QUFPRDs7O2lDQUVZO0FBQ1gsVUFBTWIsb0JBQ0QsS0FBS0wsT0FESjtBQUVKUixjQUFNLEtBQUtBLElBRlA7QUFHSkUsZUFBTyxLQUFLQSxLQUhSO0FBSUpFLGVBQU8sS0FBS0EsS0FKUjtBQUtKWSxvQkFBWSxLQUFLQTtBQUxiLFFBQU47QUFPQSxXQUFLYSxZQUFMO0FBQ0EsV0FBSzFDLFFBQUwsQ0FBYzJDLElBQWQsQ0FBbUJqQixJQUFuQjtBQUNBLHFCQUFLa0IsY0FBTCxDQUFvQixVQUFwQixFQUFnQyxLQUFLNUMsUUFBckM7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS3FCLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS1IsSUFBTCxHQUFZLENBQVo7QUFDQSxXQUFLRSxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUtFLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7Ozs7RUEzSGdDLGVBQUs0QixJOztrQkFBbkIzRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbXBvbnRlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc3QgdXNlciA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKVxuICAgICAgdGhpcy51c2VyID0gdXNlciB8fCB7fVxuICAgICAgaWYgKHVzZXIubmFtZSkge1xuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6ICforqHliIbmnb8nXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcbiAgICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgY29uc3QgdGFza0xpc3QgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0YXNrTGlzdCcpXG4gICAgICB0aGlzLnRhc2tMaXN0ID0gdGFza0xpc3QgfHwgW11cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hvb3NlVXNlcih1c2VyKSB7XG4gICAgICAgIGlmICh0aGlzLmp1bXBPbmUgJiYgdGhpcy5qdW1wT25lICE9PSB1c2VyLm5hbWUpIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5o2i5Lq65Lya6YCg5oiQ5Lu75Yqh5YiX6KGo5Lii5aSxJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYygndGFza0xpc3QnKVxuICAgICAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuanVtcE9uZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmp1bXBPbmUgPSBmYWxzZVxuICAgICAgICB0aGlzLnNldFVzZXIodXNlcilcbiAgICAgIH0sXG4gICAgICBiYWNrVG9PbmUoKSB7XG4gICAgICAgIHRoaXMuanVtcE9uZSA9IHRoaXMudXNlci5uYW1lXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgICB0aXRsZTogJydcbiAgICAgICAgfSlcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xuICAgICAgICAgIGZyb250Q29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDBhMzg4J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGFkZFRhc2soKSB7XG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IHRydWVcbiAgICAgIH0sXG4gICAgICBjbG9zZVBvcCgpIHtcbiAgICAgICAgdGhpcy5zaG93UG9wID0gZmFsc2VcbiAgICAgICAgdGhpcy5zaG93Q29udGVudCA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgY2hvb3NlUmFuayhyYW5rKSB7XG4gICAgICAgIHRoaXMucmFuayA9IHJhbmsgKyAxXG4gICAgICB9LFxuICAgICAgY2hvb3NlU2NvcmUoc2NvcmUpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlICsgMVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZUNvbWJvKCkge1xuICAgICAgICB0aGlzLmNvbWJvID0gdGhpcy5jb21ibyA9PT0gMSA/IDIgOiAxXG4gICAgICB9LFxuICAgICAgY29uZmlybSgpIHtcbiAgICAgICAgdGhpcy5zaG93UG9wID0gZmFsc2VcbiAgICAgICAgdGhpcy5zdWJtaXRUYXNrKClcbiAgICAgIH0sXG4gICAgICBiaW5kVGFza1RpdGxlKGUpIHtcbiAgICAgICAgdGhpcy5jdXJUYXNrLnRpdGxlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBiaW5kVGFza0NvbnRlbnQoZSkge1xuICAgICAgICB0aGlzLmN1clRhc2suY29udGVudCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgc2hvd1Rhc2tDb250ZW50KHRhc2spIHtcbiAgICAgICAgdGhpcy5zaG93UG9wID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3dDb250ZW50ID0gdGFzay5jb250ZW50IHx8ICfov5notKfmh5LlvpfmsqHlhpknXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VXNlcih1c2VyKSB7XG4gICAgICB3ZXB5LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICd1c2VyJyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSlcbiAgICAgIHRoaXMudXNlciA9IHVzZXJcbiAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgdGl0bGU6ICforqHliIbmnb8nXG4gICAgICB9KVxuICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xuICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICBkdXJhdGlvbjogNTAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc3VibWl0VGFzaygpIHtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLnRoaXMuY3VyVGFzayxcbiAgICAgICAgcmFuazogdGhpcy5yYW5rLFxuICAgICAgICBzY29yZTogdGhpcy5zY29yZSxcbiAgICAgICAgY29tYm86IHRoaXMuY29tYm8sXG4gICAgICAgIGZpbmFsU2NvcmU6IHRoaXMuZmluYWxTY29yZVxuICAgICAgfVxuICAgICAgdGhpcy5yZXNldEN1clRhc2soKVxuICAgICAgdGhpcy50YXNrTGlzdC5wdXNoKHRhc2spXG4gICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0YXNrTGlzdCcsIHRoaXMudGFza0xpc3QpXG4gICAgfVxuXG4gICAgcmVzZXRDdXJUYXNrKCkge1xuICAgICAgdGhpcy5jdXJUYXNrID0ge31cbiAgICAgIHRoaXMucmFuayA9IDFcbiAgICAgIHRoaXMuc2NvcmUgPSAxXG4gICAgICB0aGlzLmNvbWJvID0gMVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgc3RlcCgpIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy51c2VyLm5hbWUgfHwgdGhpcy5qdW1wT25lKSA/IDEgOiAyXG4gICAgICB9LFxuICAgICAgZmluYWxTY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5iYXNlICogKHRoaXMucmFuayAvIHRoaXMudXNlci5yYW5rKSAqICh0aGlzLnNjb3JlIC8gMykgKiB0aGlzLmNvbWJvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBuYXZUaXRsZTogJycsXG4gICAgICBuYXZDb2xvcjogJyMwMGEzODgnLFxuICAgICAgc3RlcDogMSxcbiAgICAgIHVzZXI6IHt9LFxuICAgICAgc2hvd1BvcDogZmFsc2UsXG4gICAgICBiYXNlOiAxMDAsXG4gICAgICBjb21ibzogMSxcbiAgICAgIHJhbms6IDEsXG4gICAgICBzY29yZTogMSxcbiAgICAgIHNob3dDb250ZW50OiBmYWxzZSxcbiAgICAgIGN1clRhc2s6IHt9LFxuICAgICAgdGFza0xpc3Q6IFtdLFxuICAgICAganVtcE9uZTogZmFsc2UsXG4gICAgICB1c2VyTGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+Wkp+mxvCcsXG4gICAgICAgICAgcmFuazogJzQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5p2c5p2+JyxcbiAgICAgICAgICByYW5rOiAnMSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICfkupTmn7MnLFxuICAgICAgICAgIHJhbms6ICc0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+aWsOmbqCcsXG4gICAgICAgICAgcmFuazogJzEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5aSV6aKcJyxcbiAgICAgICAgICByYW5rOiAnMidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICfpqa/pub8nLFxuICAgICAgICAgIHJhbms6ICczJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+iXj+mprCcsXG4gICAgICAgICAgcmFuazogJzInXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbiJdfQ==