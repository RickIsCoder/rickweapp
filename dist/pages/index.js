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
        // wepy.setNavigationBarTitle({
        //   title: ''
        // })
        // wepy.setNavigationBarColor({
        //   frontColor: '#ffffff',
        //   backgroundColor: '#00a388'
        // })
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
      },
      showRankList: function showRankList() {
        this.showPop = false;
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
      // if (user.name) {
      //   wepy.setNavigationBarTitle({
      //     title: '计分板'
      //   })
      //   wepy.setNavigationBarColor({
      //     frontColor: '#ffffff',
      //     backgroundColor: '#000000',
      //     animation: {
      //       duration: 500
      //     }
      //   })
      // }
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
      // wepy.setNavigationBarTitle({
      //   title: '计分板'
      // })
      // wepy.setNavigationBarColor({
      //   frontColor: '#ffffff',
      //   backgroundColor: '#000000',
      //   animation: {
      //     duration: 500
      //   }
      // })
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29tcG9udGVudHMiLCJtZXRob2RzIiwiY2hvb3NlVXNlciIsInVzZXIiLCJqdW1wT25lIiwibmFtZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJ0YXNrTGlzdCIsInNldFVzZXIiLCIkYXBwbHkiLCJiYWNrVG9PbmUiLCJhZGRUYXNrIiwic2hvd1BvcCIsImNsb3NlUG9wIiwic2hvd0NvbnRlbnQiLCJjaG9vc2VSYW5rIiwicmFuayIsImNob29zZVNjb3JlIiwic2NvcmUiLCJ0b2dnbGVDb21ibyIsImNvbWJvIiwic3VibWl0VGFzayIsImJpbmRUYXNrVGl0bGUiLCJlIiwiY3VyVGFzayIsImRldGFpbCIsInZhbHVlIiwiYmluZFRhc2tDb250ZW50Iiwic2hvd1Rhc2tDb250ZW50IiwidGFzayIsInNob3dSYW5rTGlzdCIsImNvbXB1dGVkIiwic3RlcCIsImZpbmFsU2NvcmUiLCJNYXRoIiwiZmxvb3IiLCJiYXNlIiwiZGF0YSIsIm5hdlRpdGxlIiwibmF2Q29sb3IiLCJ1c2VyTGlzdCIsImdldFN0b3JhZ2VTeW5jIiwic2V0U3RvcmFnZSIsImtleSIsInJlc2V0Q3VyVGFzayIsInB1c2giLCJzZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxXLEdBQWMsRSxRQXVCZEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxJQURILEVBQ1M7QUFBQTs7QUFDZixZQUFJLEtBQUtDLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxLQUFpQkQsS0FBS0UsSUFBMUMsRUFBZ0Q7QUFDOUMseUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxJQURNO0FBRWJDLHFCQUFTLGFBRkk7QUFHYkMscUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixrQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLCtCQUFLQyxpQkFBTCxDQUF1QixVQUF2QjtBQUNBLHVCQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsdUJBQUtULE9BQUwsR0FBZSxLQUFmO0FBQ0EsdUJBQUtVLE9BQUwsQ0FBYVgsSUFBYjtBQUNBLHVCQUFLWSxNQUFMO0FBQ0Q7QUFDRjtBQVhZLFdBQWY7QUFhQTtBQUNEO0FBQ0QsYUFBS1gsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLVSxPQUFMLENBQWFYLElBQWI7QUFDRCxPQXBCTztBQXFCUmEsZUFyQlEsdUJBcUJJO0FBQ1YsYUFBS1osT0FBTCxHQUFlLEtBQUtELElBQUwsQ0FBVUUsSUFBekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELE9BOUJPO0FBK0JSWSxhQS9CUSxxQkErQkU7QUFDUixhQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNELE9BakNPO0FBa0NSQyxjQWxDUSxzQkFrQ0c7QUFDVCxhQUFLRCxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUtFLFdBQUwsR0FBbUIsS0FBbkI7QUFDRCxPQXJDTztBQXNDUkMsZ0JBdENRLHNCQXNDR0MsSUF0Q0gsRUFzQ1M7QUFDZixhQUFLQSxJQUFMLEdBQVlBLE9BQU8sQ0FBbkI7QUFDRCxPQXhDTztBQXlDUkMsaUJBekNRLHVCQXlDSUMsS0F6Q0osRUF5Q1c7QUFDakIsYUFBS0EsS0FBTCxHQUFhQSxRQUFRLENBQXJCO0FBQ0QsT0EzQ087QUE0Q1JDLGlCQTVDUSx5QkE0Q007QUFDWixhQUFLQyxLQUFMLEdBQWEsS0FBS0EsS0FBTCxLQUFlLENBQWYsR0FBbUIsQ0FBbkIsR0FBdUIsQ0FBcEM7QUFDRCxPQTlDTztBQStDUmYsYUEvQ1EscUJBK0NFO0FBQ1IsYUFBS08sT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLUyxVQUFMO0FBQ0QsT0FsRE87QUFtRFJDLG1CQW5EUSx5QkFtRE1DLENBbkROLEVBbURTO0FBQ2YsYUFBS0MsT0FBTCxDQUFhdkIsS0FBYixHQUFxQnNCLEVBQUVFLE1BQUYsQ0FBU0MsS0FBOUI7QUFDRCxPQXJETztBQXNEUkMscUJBdERRLDJCQXNEUUosQ0F0RFIsRUFzRFc7QUFDakIsYUFBS0MsT0FBTCxDQUFhdEIsT0FBYixHQUF1QnFCLEVBQUVFLE1BQUYsQ0FBU0MsS0FBaEM7QUFDRCxPQXhETztBQXlEUkUscUJBekRRLDJCQXlEUUMsSUF6RFIsRUF5RGM7QUFDcEIsYUFBS2pCLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBS0UsV0FBTCxHQUFtQmUsS0FBSzNCLE9BQUwsSUFBZ0IsUUFBbkM7QUFDRCxPQTVETztBQTZEUjRCLGtCQTdEUSwwQkE2RE87QUFDYixhQUFLbEIsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQS9ETyxLLFFBd0dWbUIsUSxHQUFXO0FBQ1RDLFVBRFMsa0JBQ0Y7QUFDTCxlQUFRLENBQUMsS0FBS25DLElBQUwsQ0FBVUUsSUFBWCxJQUFtQixLQUFLRCxPQUF6QixHQUFvQyxDQUFwQyxHQUF3QyxDQUEvQztBQUNELE9BSFE7QUFJVG1DLGdCQUpTLHdCQUlJO0FBQ1gsZUFBT0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsSUFBYSxLQUFLcEIsSUFBTCxHQUFZLEtBQUtuQixJQUFMLENBQVVtQixJQUFuQyxLQUE0QyxLQUFLRSxLQUFMLEdBQWEsQ0FBekQsSUFBOEQsS0FBS0UsS0FBOUUsQ0FBUDtBQUNEO0FBTlEsSyxRQVNYaUIsSSxHQUFPO0FBQ0xDLGdCQUFVLEVBREw7QUFFTEMsZ0JBQVUsU0FGTDtBQUdMUCxZQUFNLENBSEQ7QUFJTG5DLFlBQU0sRUFKRDtBQUtMZSxlQUFTLEtBTEo7QUFNTHdCLFlBQU0sR0FORDtBQU9MaEIsYUFBTyxDQVBGO0FBUUxKLFlBQU0sQ0FSRDtBQVNMRSxhQUFPLENBVEY7QUFVTEosbUJBQWEsS0FWUjtBQVdMVSxlQUFTLEVBWEo7QUFZTGpCLGdCQUFVLEVBWkw7QUFhTFQsZUFBUyxLQWJKO0FBY0wwQyxnQkFBVSxDQUNSO0FBQ0V6QyxjQUFNLElBRFI7QUFFRWlCLGNBQU07QUFGUixPQURRLEVBS1I7QUFDRWpCLGNBQU0sSUFEUjtBQUVFaUIsY0FBTTtBQUZSLE9BTFEsRUFTUjtBQUNFakIsY0FBTSxJQURSO0FBRUVpQixjQUFNO0FBRlIsT0FUUSxFQWFSO0FBQ0VqQixjQUFNLElBRFI7QUFFRWlCLGNBQU07QUFGUixPQWJRLEVBaUJSO0FBQ0VqQixjQUFNLElBRFI7QUFFRWlCLGNBQU07QUFGUixPQWpCUSxFQXFCUjtBQUNFakIsY0FBTSxJQURSO0FBRUVpQixjQUFNO0FBRlIsT0FyQlEsRUF5QlI7QUFDRWpCLGNBQU0sSUFEUjtBQUVFaUIsY0FBTTtBQUZSLE9BekJRO0FBZEwsSzs7Ozs7NkJBcElFO0FBQ1AsVUFBTW5CLE9BQU8sZUFBSzRDLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBYjtBQUNBLFdBQUs1QyxJQUFMLEdBQVlBLFFBQVEsRUFBcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFNVSxXQUFXLGVBQUtrQyxjQUFMLENBQW9CLFVBQXBCLENBQWpCO0FBQ0EsV0FBS2xDLFFBQUwsR0FBZ0JBLFlBQVksRUFBNUI7QUFDRDs7OzRCQW9FT1YsSSxFQUFNO0FBQ1oscUJBQUs2QyxVQUFMLENBQWdCO0FBQ2RDLGFBQUssTUFEUztBQUVkTixjQUFNeEM7QUFGUSxPQUFoQjtBQUlBLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQU1nQyxvQkFDRCxLQUFLTCxPQURKO0FBRUpSLGNBQU0sS0FBS0EsSUFGUDtBQUdKRSxlQUFPLEtBQUtBLEtBSFI7QUFJSkUsZUFBTyxLQUFLQSxLQUpSO0FBS0phLG9CQUFZLEtBQUtBO0FBTGIsUUFBTjtBQU9BLFdBQUtXLFlBQUw7QUFDQSxXQUFLckMsUUFBTCxDQUFjc0MsSUFBZCxDQUFtQmhCLElBQW5CO0FBQ0EscUJBQUtpQixjQUFMLENBQW9CLFVBQXBCLEVBQWdDLEtBQUt2QyxRQUFyQztBQUNEOzs7bUNBRWM7QUFDYixXQUFLaUIsT0FBTCxHQUFlLEVBQWY7QUFDQSxXQUFLUixJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUtFLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0UsS0FBTCxHQUFhLENBQWI7QUFDRDs7OztFQTlIZ0MsZUFBSzJCLEk7O2tCQUFuQnRELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29tcG9udGVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zdCB1c2VyID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpXG4gICAgICB0aGlzLnVzZXIgPSB1c2VyIHx8IHt9XG4gICAgICAvLyBpZiAodXNlci5uYW1lKSB7XG4gICAgICAvLyAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIC8vICAgICB0aXRsZTogJ+iuoeWIhuadvydcbiAgICAgIC8vICAgfSlcbiAgICAgIC8vICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xuICAgICAgLy8gICAgIGZyb250Q29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIC8vICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIC8vICAgICBhbmltYXRpb246IHtcbiAgICAgIC8vICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH0pXG4gICAgICAvLyB9XG4gICAgICBjb25zdCB0YXNrTGlzdCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rhc2tMaXN0JylcbiAgICAgIHRoaXMudGFza0xpc3QgPSB0YXNrTGlzdCB8fCBbXVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaG9vc2VVc2VyKHVzZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuanVtcE9uZSAmJiB0aGlzLmp1bXBPbmUgIT09IHVzZXIubmFtZSkge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmjaLkurrkvJrpgKDmiJDku7vliqHliJfooajkuKLlpLEnLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCd0YXNrTGlzdCcpXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrTGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wT25lID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuanVtcE9uZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2V0VXNlcih1c2VyKVxuICAgICAgfSxcbiAgICAgIGJhY2tUb09uZSgpIHtcbiAgICAgICAgdGhpcy5qdW1wT25lID0gdGhpcy51c2VyLm5hbWVcbiAgICAgICAgLy8gd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICAvLyAgIHRpdGxlOiAnJ1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyB3ZXB5LnNldE5hdmlnYXRpb25CYXJDb2xvcih7XG4gICAgICAgIC8vICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAvLyAgIGJhY2tncm91bmRDb2xvcjogJyMwMGEzODgnXG4gICAgICAgIC8vIH0pXG4gICAgICB9LFxuICAgICAgYWRkVGFzaygpIHtcbiAgICAgICAgdGhpcy5zaG93UG9wID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGNsb3NlUG9wKCkge1xuICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dDb250ZW50ID0gZmFsc2VcbiAgICAgIH0sXG4gICAgICBjaG9vc2VSYW5rKHJhbmspIHtcbiAgICAgICAgdGhpcy5yYW5rID0gcmFuayArIDFcbiAgICAgIH0sXG4gICAgICBjaG9vc2VTY29yZShzY29yZSkge1xuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmUgKyAxXG4gICAgICB9LFxuICAgICAgdG9nZ2xlQ29tYm8oKSB7XG4gICAgICAgIHRoaXMuY29tYm8gPSB0aGlzLmNvbWJvID09PSAxID8gMiA6IDFcbiAgICAgIH0sXG4gICAgICBjb25maXJtKCkge1xuICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZVxuICAgICAgICB0aGlzLnN1Ym1pdFRhc2soKVxuICAgICAgfSxcbiAgICAgIGJpbmRUYXNrVGl0bGUoZSkge1xuICAgICAgICB0aGlzLmN1clRhc2sudGl0bGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfSxcbiAgICAgIGJpbmRUYXNrQ29udGVudChlKSB7XG4gICAgICAgIHRoaXMuY3VyVGFzay5jb250ZW50ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBzaG93VGFza0NvbnRlbnQodGFzaykge1xuICAgICAgICB0aGlzLnNob3dQb3AgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0YXNrLmNvbnRlbnQgfHwgJ+i/mei0p+aHkuW+l+ayoeWGmSdcbiAgICAgIH0sXG4gICAgICBzaG93UmFua0xpc3QoKSB7XG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VXNlcih1c2VyKSB7XG4gICAgICB3ZXB5LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICd1c2VyJyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSlcbiAgICAgIHRoaXMudXNlciA9IHVzZXJcbiAgICAgIC8vIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIC8vICAgdGl0bGU6ICforqHliIbmnb8nXG4gICAgICAvLyB9KVxuICAgICAgLy8gd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xuICAgICAgLy8gICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAvLyAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgLy8gICBhbmltYXRpb246IHtcbiAgICAgIC8vICAgICBkdXJhdGlvbjogNTAwXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG4gICAgfVxuXG4gICAgc3VibWl0VGFzaygpIHtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLnRoaXMuY3VyVGFzayxcbiAgICAgICAgcmFuazogdGhpcy5yYW5rLFxuICAgICAgICBzY29yZTogdGhpcy5zY29yZSxcbiAgICAgICAgY29tYm86IHRoaXMuY29tYm8sXG4gICAgICAgIGZpbmFsU2NvcmU6IHRoaXMuZmluYWxTY29yZVxuICAgICAgfVxuICAgICAgdGhpcy5yZXNldEN1clRhc2soKVxuICAgICAgdGhpcy50YXNrTGlzdC5wdXNoKHRhc2spXG4gICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0YXNrTGlzdCcsIHRoaXMudGFza0xpc3QpXG4gICAgfVxuXG4gICAgcmVzZXRDdXJUYXNrKCkge1xuICAgICAgdGhpcy5jdXJUYXNrID0ge31cbiAgICAgIHRoaXMucmFuayA9IDFcbiAgICAgIHRoaXMuc2NvcmUgPSAxXG4gICAgICB0aGlzLmNvbWJvID0gMVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgc3RlcCgpIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy51c2VyLm5hbWUgfHwgdGhpcy5qdW1wT25lKSA/IDEgOiAyXG4gICAgICB9LFxuICAgICAgZmluYWxTY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5iYXNlICogKHRoaXMucmFuayAvIHRoaXMudXNlci5yYW5rKSAqICh0aGlzLnNjb3JlIC8gMykgKiB0aGlzLmNvbWJvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBuYXZUaXRsZTogJycsXG4gICAgICBuYXZDb2xvcjogJyMwMGEzODgnLFxuICAgICAgc3RlcDogMSxcbiAgICAgIHVzZXI6IHt9LFxuICAgICAgc2hvd1BvcDogZmFsc2UsXG4gICAgICBiYXNlOiAxMDAsXG4gICAgICBjb21ibzogMSxcbiAgICAgIHJhbms6IDEsXG4gICAgICBzY29yZTogMSxcbiAgICAgIHNob3dDb250ZW50OiBmYWxzZSxcbiAgICAgIGN1clRhc2s6IHt9LFxuICAgICAgdGFza0xpc3Q6IFtdLFxuICAgICAganVtcE9uZTogZmFsc2UsXG4gICAgICB1c2VyTGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+Wkp+mxvCcsXG4gICAgICAgICAgcmFuazogJzQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5p2c5p2+JyxcbiAgICAgICAgICByYW5rOiAnMSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICfkupTmn7MnLFxuICAgICAgICAgIHJhbms6ICc0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+aWsOmbqCcsXG4gICAgICAgICAgcmFuazogJzEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5aSV6aKcJyxcbiAgICAgICAgICByYW5rOiAnMidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICfpqa/pub8nLFxuICAgICAgICAgIHJhbms6ICczJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+iXj+mprCcsXG4gICAgICAgICAgcmFuazogJzInXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbiJdfQ==