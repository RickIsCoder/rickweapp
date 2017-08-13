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
        if (this.jumpOne && this.jumpOne === user.name) {
          this.jumpOne = false;
          return;
        }
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
      if (this.user.name) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29tcG9udGVudHMiLCJtZXRob2RzIiwiY2hvb3NlVXNlciIsInVzZXIiLCJqdW1wT25lIiwibmFtZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJ0YXNrTGlzdCIsInNldFVzZXIiLCIkYXBwbHkiLCJiYWNrVG9PbmUiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJmcm9udENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYWRkVGFzayIsInNob3dQb3AiLCJjbG9zZVBvcCIsInNob3dDb250ZW50IiwiY2hvb3NlUmFuayIsInJhbmsiLCJjaG9vc2VTY29yZSIsInNjb3JlIiwidG9nZ2xlQ29tYm8iLCJjb21ibyIsInN1Ym1pdFRhc2siLCJiaW5kVGFza1RpdGxlIiwiZSIsImN1clRhc2siLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmRUYXNrQ29udGVudCIsInNob3dUYXNrQ29udGVudCIsInRhc2siLCJjb21wdXRlZCIsInN0ZXAiLCJmaW5hbFNjb3JlIiwiTWF0aCIsImZsb29yIiwiYmFzZSIsImRhdGEiLCJuYXZUaXRsZSIsIm5hdkNvbG9yIiwidXNlckxpc3QiLCJnZXRTdG9yYWdlU3luYyIsImFuaW1hdGlvbiIsImR1cmF0aW9uIiwic2V0U3RvcmFnZSIsImtleSIsInJlc2V0Q3VyVGFzayIsInB1c2giLCJzZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxXLEdBQWMsRSxRQXVCZEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxJQURILEVBQ1M7QUFBQTs7QUFDZixZQUFJLEtBQUtDLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxLQUFpQkQsS0FBS0Us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QURTO0FBRWRSLGNBQU0zQztBQUZRLE9BQWhCO0FBSUEsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EscUJBQUtjLHFCQUFMLENBQTJCO0FBQ3pCVixlQUFPO0FBRGtCLE9BQTNCO0FBR0EscUJBQUtXLHFCQUFMLENBQTJCO0FBQ3pCQyxvQkFBWSxTQURhO0FBRXpCQyx5QkFBaUIsU0FGUTtBQUd6QitCLG1CQUFXO0FBQ1RDLG9CQUFVO0FBREQ7QUFIYyxPQUEzQjtBQU9EOzs7aUNBRVk7QUFDWCxVQUFNYixvQkFDRCxLQUFLTCxPQURKO0FBRUpSLGNBQU0sS0FBS0EsSUFGUDtBQUdKRSxlQUFPLEtBQUtBLEtBSFI7QUFJSkUsZUFBTyxLQUFLQSxLQUpSO0FBS0pZLG9CQUFZLEtBQUtBO0FBTGIsUUFBTjtBQU9BLFdBQUthLFlBQUw7QUFDQSxXQUFLMUMsUUFBTCxDQUFjMkMsSUFBZCxDQUFtQmpCLElBQW5CO0FBQ0EscUJBQUtrQixjQUFMLENBQW9CLFVBQXBCLEVBQWdDLEtBQUs1QyxRQUFyQztBQUNEOzs7bUNBRWM7QUFDYixXQUFLcUIsT0FBTCxHQUFlLEVBQWY7QUFDQSxXQUFLUixJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUtFLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0UsS0FBTCxHQUFhLENBQWI7QUFDRDs7OztFQTlIZ0MsZUFBSzRCLEk7O2tCQUFuQjNELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29tcG9udGVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zdCB1c2VyID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpXG4gICAgICB0aGlzLnVzZXIgPSB1c2VyIHx8IHt9XG4gICAgICBpZiAodGhpcy51c2VyLm5hbWUpIHtcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICAgIHRpdGxlOiAn6K6h5YiG5p2/J1xuICAgICAgICB9KVxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJDb2xvcih7XG4gICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhc2tMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGFza0xpc3QnKVxuICAgICAgdGhpcy50YXNrTGlzdCA9IHRhc2tMaXN0IHx8IFtdXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNob29zZVVzZXIodXNlcikge1xuICAgICAgICBpZiAodGhpcy5qdW1wT25lICYmIHRoaXMuanVtcE9uZSAhPT0gdXNlci5uYW1lKSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aNouS6uuS8mumAoOaIkOS7u+WKoeWIl+ihqOS4ouWksScsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoJ3Rhc2tMaXN0JylcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tMaXN0ID0gW11cbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBPbmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VXNlcih1c2VyKVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuanVtcE9uZSAmJiB0aGlzLmp1bXBPbmUgPT09IHVzZXIubmFtZSkge1xuICAgICAgICAgIHRoaXMuanVtcE9uZSA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRVc2VyKHVzZXIpXG4gICAgICB9LFxuICAgICAgYmFja1RvT25lKCkge1xuICAgICAgICB0aGlzLmp1bXBPbmUgPSB0aGlzLnVzZXIubmFtZVxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6ICcnXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcbiAgICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwYTM4OCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBhZGRUYXNrKCkge1xuICAgICAgICB0aGlzLnNob3dQb3AgPSB0cnVlXG4gICAgICB9LFxuICAgICAgY2xvc2VQb3AoKSB7XG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIGNob29zZVJhbmsocmFuaykge1xuICAgICAgICB0aGlzLnJhbmsgPSByYW5rICsgMVxuICAgICAgfSxcbiAgICAgIGNob29zZVNjb3JlKHNjb3JlKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZSArIDFcbiAgICAgIH0sXG4gICAgICB0b2dnbGVDb21ibygpIHtcbiAgICAgICAgdGhpcy5jb21ibyA9IHRoaXMuY29tYm8gPT09IDEgPyAyIDogMVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc3VibWl0VGFzaygpXG4gICAgICB9LFxuICAgICAgYmluZFRhc2tUaXRsZShlKSB7XG4gICAgICAgIHRoaXMuY3VyVGFzay50aXRsZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgYmluZFRhc2tDb250ZW50KGUpIHtcbiAgICAgICAgdGhpcy5jdXJUYXNrLmNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfSxcbiAgICAgIHNob3dUYXNrQ29udGVudCh0YXNrKSB7XG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93Q29udGVudCA9IHRhc2suY29udGVudCB8fCAn6L+Z6LSn5oeS5b6X5rKh5YaZJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFVzZXIodXNlcikge1xuICAgICAgd2VweS5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAndXNlcicsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pXG4gICAgICB0aGlzLnVzZXIgPSB1c2VyXG4gICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiAn6K6h5YiG5p2/J1xuICAgICAgfSlcbiAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcbiAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHN1Ym1pdFRhc2soKSB7XG4gICAgICBjb25zdCB0YXNrID0ge1xuICAgICAgICAuLi50aGlzLmN1clRhc2ssXG4gICAgICAgIHJhbms6IHRoaXMucmFuayxcbiAgICAgICAgc2NvcmU6IHRoaXMuc2NvcmUsXG4gICAgICAgIGNvbWJvOiB0aGlzLmNvbWJvLFxuICAgICAgICBmaW5hbFNjb3JlOiB0aGlzLmZpbmFsU2NvcmVcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzZXRDdXJUYXNrKClcbiAgICAgIHRoaXMudGFza0xpc3QucHVzaCh0YXNrKVxuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndGFza0xpc3QnLCB0aGlzLnRhc2tMaXN0KVxuICAgIH1cblxuICAgIHJlc2V0Q3VyVGFzaygpIHtcbiAgICAgIHRoaXMuY3VyVGFzayA9IHt9XG4gICAgICB0aGlzLnJhbmsgPSAxXG4gICAgICB0aGlzLnNjb3JlID0gMVxuICAgICAgdGhpcy5jb21ibyA9IDFcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHN0ZXAoKSB7XG4gICAgICAgIHJldHVybiAoIXRoaXMudXNlci5uYW1lIHx8IHRoaXMuanVtcE9uZSkgPyAxIDogMlxuICAgICAgfSxcbiAgICAgIGZpbmFsU2NvcmUoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuYmFzZSAqICh0aGlzLnJhbmsgLyB0aGlzLnVzZXIucmFuaykgKiAodGhpcy5zY29yZSAvIDMpICogdGhpcy5jb21ibylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgbmF2VGl0bGU6ICcnLFxuICAgICAgbmF2Q29sb3I6ICcjMDBhMzg4JyxcbiAgICAgIHN0ZXA6IDEsXG4gICAgICB1c2VyOiB7fSxcbiAgICAgIHNob3dQb3A6IGZhbHNlLFxuICAgICAgYmFzZTogMTAwLFxuICAgICAgY29tYm86IDEsXG4gICAgICByYW5rOiAxLFxuICAgICAgc2NvcmU6IDEsXG4gICAgICBzaG93Q29udGVudDogZmFsc2UsXG4gICAgICBjdXJUYXNrOiB7fSxcbiAgICAgIHRhc2tMaXN0OiBbXSxcbiAgICAgIGp1bXBPbmU6IGZhbHNlLFxuICAgICAgdXNlckxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICflpKfpsbwnLFxuICAgICAgICAgIHJhbms6ICc0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+adnOadvicsXG4gICAgICAgICAgcmFuazogJzEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5LqU5p+zJyxcbiAgICAgICAgICByYW5rOiAnNCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICfmlrDpm6gnLFxuICAgICAgICAgIHJhbms6ICcxJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+WkleminCcsXG4gICAgICAgICAgcmFuazogJzInXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn6amv6bm/JyxcbiAgICAgICAgICByYW5rOiAnMydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICfol4/pqawnLFxuICAgICAgICAgIHJhbms6ICcyJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG4iXX0=