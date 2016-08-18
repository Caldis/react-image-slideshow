(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-portal"), require("tween.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-portal", "tween.js"], factory);
	else if(typeof exports === 'object')
		exports["react-image-slideshow"] = factory(require("react"), require("react-portal"), require("tween.js"));
	else
		root["react-image-slideshow"] = factory(root["react"], root["react-portal"], root["tween.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	var _appStyle = __webpack_require__(6);

	var _appStyle2 = _interopRequireDefault(_appStyle);

	var _reactPortal = __webpack_require__(7);

	var _reactPortal2 = _interopRequireDefault(_reactPortal);

	var _tween = __webpack_require__(8);

	var _tween2 = _interopRequireDefault(_tween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Slideshow = function (_React$Component) {
	    _inherits(Slideshow, _React$Component);

	    function Slideshow(props) {
	        _classCallCheck(this, Slideshow);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slideshow).call(this, props));

	        _this.window = null;
	        _this.keyEvent = null;
	        _this.bodyAttr = null;
	        _this.resizeRatio = 0.90;
	        _this.onAnimate = false;
	        _this.tmpNowImage = null;
	        _this.minImageSize = null;
	        _this.originalSize = null;
	        _this.imageInZoom = false;
	        _this.imageZoomMargin = 100;
	        _this.imageMoveRange = null;
	        _this.imageLoadRec = null;

	        _this.state = {
	            isOpened: false,
	            nowImage: null,
	            imageSize: null,
	            imageMovePos: null,
	            imageZoomQuit: null,
	            showAction: true
	        };

	        _this.handleModalOpen = _this.handleModalOpen.bind(_this);
	        _this.handleBeforeModalOnOpen = _this.handleBeforeModalOnOpen.bind(_this);
	        _this.handleModalBeforeClose = _this.handleModalBeforeClose.bind(_this);
	        _this.handleModalClose = _this.handleModalClose.bind(_this);
	        _this.calAllImageSize = _this.calAllImageSize.bind(_this);
	        _this.getImageSize = _this.getImageSize.bind(_this);
	        _this.initImageSize = _this.initImageSize.bind(_this);
	        _this.calImageSize = _this.calImageSize.bind(_this);
	        _this.calSingleImageSize = _this.calSingleImageSize.bind(_this);
	        _this.calNowImageSize = _this.calNowImageSize.bind(_this);
	        _this.handleImageSliderToPreviousHover = _this.handleImageSliderToPreviousHover.bind(_this);
	        _this.handleImageSliderToNextHover = _this.handleImageSliderToNextHover.bind(_this);
	        _this.handleImageCloserHover = _this.handleImageCloserHover.bind(_this);
	        _this.handleImageKeySwitch = _this.handleImageKeySwitch.bind(_this);
	        _this.handleImageSliderToPrevious = _this.handleImageSliderToPrevious.bind(_this);
	        _this.handleImageSliderToNext = _this.handleImageSliderToNext.bind(_this);
	        _this.handleImageAnimate = _this.handleImageAnimate.bind(_this);
	        _this.getPrevIndex = _this.getPrevIndex.bind(_this);
	        _this.getNextIndex = _this.getNextIndex.bind(_this);
	        _this.handleImageZoom = _this.handleImageZoom.bind(_this);
	        _this.handleImageMove = _this.handleImageMove.bind(_this);
	        _this.getWindow = _this.getWindow.bind(_this);
	        _this.preventSelect = _this.preventSelect.bind(_this);
	        _this.addEvent = _this.addEvent.bind(_this);
	        _this.enableBodyScroll = _this.enableBodyScroll.bind(_this);
	        _this.disableBodyScroll = _this.disableBodyScroll.bind(_this);
	        _this.listenKeyDown = _this.listenKeyDown.bind(_this);
	        _this.unListenKeyDown = _this.unListenKeyDown.bind(_this);
	        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	        return _this;
	    }

	    _createClass(Slideshow, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.window = this.getWindow();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.initImageSize();
	            this.addEvent(this.window, 'resize', this.calNowImageSize);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (nextProps.imgs.length !== this.props.imgs.length) {
	                this.calNowImageSize();
	            }
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return true;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {}
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {}

	        // 模态框弹出

	    }, {
	        key: 'handleModalOpen',
	        value: function handleModalOpen(initImage) {
	            this.onAnimate = true;
	            if (initImage !== undefined && this.props.imgs !== undefined) {
	                this.tmpNowImage = initImage > this.props.imgs.length - 1 ? this.props.imgs.length - 1 : initImage < 0 ? 0 : initImage;
	            } else {
	                this.tmpNowImage = 0;
	            }
	            this.setState({
	                nowImage: this.tmpNowImage,
	                isOpened: true
	            });
	            this.calSingleImageSize(this.tmpNowImage);
	            this.disableBodyScroll();
	            this.listenKeyDown();
	        }
	        // 模态框弹出执行钩子

	    }, {
	        key: 'handleBeforeModalOnOpen',
	        value: function handleBeforeModalOnOpen(nodeModal) {
	            var self = this;
	            var nodeNow = document.getElementById('sliderShowImageOf' + this.tmpNowImage);
	            nodeNow.style.opacity = 1;
	            new _tween2.default.Tween({ opacity: 0 }).to({ opacity: 1 }, 300).easing(_tween2.default.Easing.Cubic.In).onUpdate(function () {
	                nodeModal.style.opacity = this.opacity;
	            }).onComplete(function () {
	                self.onAnimate = false;
	            }).start();
	        }
	        // 模态框关闭

	    }, {
	        key: 'handleModalClose',
	        value: function handleModalClose() {
	            this.onAnimate = true;
	            this.setState({ isOpened: false });
	            this.enableBodyScroll();
	            this.unListenKeyDown();
	        }
	        // 模态框关闭执行钩子

	    }, {
	        key: 'handleModalBeforeClose',
	        value: function handleModalBeforeClose(nodeModal, removeFromDom) {
	            var self = this;
	            new _tween2.default.Tween({ opacity: 1 }).to({ opacity: 0 }, 300).easing(_tween2.default.Easing.Cubic.In).onUpdate(function () {
	                nodeModal.style.opacity = this.opacity;
	            }).onComplete(function () {
	                removeFromDom();
	                self.onAnimate = false;
	            }).start();
	        }

	        // 计算图片缩放大小, 保持图片始终在视图内
	        // resizeRatio可以控制图片缩放比例

	    }, {
	        key: 'getImageSize',
	        value: function getImageSize(imageUrl) {
	            var img = new Image();
	            img.src = imageUrl;
	            return {
	                width: img.width,
	                height: img.height
	            };
	        }
	    }, {
	        key: 'initImageSize',
	        value: function initImageSize() {
	            var imgSizeData = new Array(this.props.imgs.length);
	            imgSizeData.fill({
	                width: 0,
	                height: 0
	            });
	            if (this.props.imgs) {
	                this.setState({ imageSize: imgSizeData });
	            }
	        }
	    }, {
	        key: 'calImageSize',
	        value: function calImageSize(imageUrl, callBack) {
	            var resizeRatio = this.resizeRatio;
	            var winWidth = this.window.innerWidth;
	            var winHeight = this.window.innerHeight;
	            var winWHRatio = winWidth / winHeight;

	            var img = new Image();

	            img.onload = function () {
	                var imgSizeData = null;
	                var imgWHRatio = img.width / img.height;
	                if (imgWHRatio > winWHRatio) {
	                    if (img.width >= winWidth) {
	                        imgSizeData = {
	                            width: winWidth * resizeRatio,
	                            height: winWidth * resizeRatio / imgWHRatio
	                        };
	                    } else {
	                        if (img.width < winWidth * resizeRatio) {
	                            imgSizeData = {
	                                width: img.width,
	                                height: img.height
	                            };
	                        } else {
	                            imgSizeData = {
	                                width: winWidth * resizeRatio,
	                                height: winWidth * resizeRatio / imgWHRatio
	                            };
	                        }
	                    }
	                } else {
	                    if (img.height >= winHeight) {
	                        imgSizeData = {
	                            height: winHeight * resizeRatio,
	                            width: winHeight * resizeRatio * imgWHRatio
	                        };
	                    } else {
	                        if (img.height < winHeight * resizeRatio) {
	                            imgSizeData = {
	                                height: img.height,
	                                width: img.width
	                            };
	                        } else {
	                            imgSizeData = {
	                                height: winHeight * resizeRatio,
	                                width: winHeight * resizeRatio * imgWHRatio
	                            };
	                        }
	                    }
	                }
	                callBack(imgSizeData);
	            };

	            img.src = imageUrl;
	        }
	    }, {
	        key: 'calAllImageSize',
	        value: function calAllImageSize() {
	            var _this2 = this;

	            var imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
	            this.props.imgs ? this.props.imgs.map(function (imageData, urlIndex) {
	                _this2.calImageSize(imageData.url, function (size) {
	                    imgSizeData[urlIndex] = size;
	                    _this2.setState({ imageSize: imgSizeData });
	                });
	            }) : null;
	        }
	    }, {
	        key: 'calSingleImageSize',
	        value: function calSingleImageSize(urlIndex) {
	            var _this3 = this;

	            if (this.state.imageSize && this.props.imgs) {
	                (function () {
	                    var imgSizeData = JSON.parse(JSON.stringify(_this3.state.imageSize));
	                    _this3.calImageSize(_this3.props.imgs[urlIndex].url, function (size) {
	                        imgSizeData[urlIndex] = size;
	                        _this3.setState({
	                            imageSize: imgSizeData,
	                            showAction: true
	                        });
	                    });
	                })();
	            } else {
	                console.warn('imageUrl数据为空， 无法计算图片尺寸');
	            }
	        }
	    }, {
	        key: 'calNowImageSize',
	        value: function calNowImageSize() {
	            if (this.state.nowImage) {
	                this.calSingleImageSize(this.state.nowImage);
	            }
	        }

	        // 图片切换按钮动画

	    }, {
	        key: 'handleImageSliderToPreviousHover',
	        value: function handleImageSliderToPreviousHover() {
	            if (!this.onAnimate) {
	                document.getElementById('toPrevButton').style.left = '40px';
	                document.getElementById('toNextButton').style.right = '30px';
	            }
	        }
	    }, {
	        key: 'handleImageSliderToNextHover',
	        value: function handleImageSliderToNextHover() {
	            if (!this.onAnimate) {
	                document.getElementById('toPrevButton').style.left = '30px';
	                document.getElementById('toNextButton').style.right = '40px';
	            }
	        }
	    }, {
	        key: 'handleImageCloserHover',
	        value: function handleImageCloserHover() {
	            if (!this.onAnimate) {
	                document.getElementById('toPrevButton').style.left = '30px';
	                document.getElementById('toNextButton').style.right = '30px';
	            }
	        }

	        // 图片切换控制

	    }, {
	        key: 'handleImageKeySwitch',
	        value: function handleImageKeySwitch(key) {
	            if (key == 37 || key == 38) {
	                this.handleImageSliderToPrevious();
	            } else if (key == 39 || key == 40) {
	                this.handleImageSliderToNext();
	            }
	        }
	    }, {
	        key: 'handleImageSliderToPrevious',
	        value: function handleImageSliderToPrevious() {
	            if (!this.onAnimate) {
	                this.onAnimate = true;
	                var prevNodeIndex = this.getPrevIndex();
	                this.setState({
	                    nowImage: prevNodeIndex,
	                    showAction: false
	                });
	                this.calSingleImageSize(prevNodeIndex);
	                var nodeNow = document.getElementById('sliderShowImageOf' + this.state.nowImage);
	                var nodePrevious = document.getElementById('sliderShowImageOf' + prevNodeIndex);
	                this.handleImageAnimate(nodeNow, nodePrevious);
	            }
	        }
	    }, {
	        key: 'handleImageSliderToNext',
	        value: function handleImageSliderToNext() {
	            if (!this.onAnimate) {
	                this.onAnimate = true;
	                var nextNodeIndex = this.getNextIndex();
	                this.setState({
	                    nowImage: nextNodeIndex,
	                    showAction: false
	                });
	                this.calSingleImageSize(nextNodeIndex);
	                var nodeNow = document.getElementById('sliderShowImageOf' + this.state.nowImage);
	                var nodeNext = document.getElementById('sliderShowImageOf' + nextNodeIndex);
	                this.handleImageAnimate(nodeNow, nodeNext);
	            }
	        }
	    }, {
	        key: 'handleImageAnimate',
	        value: function handleImageAnimate(outNode, inNode) {
	            var self = this;
	            var outComplete = false;
	            var inComplete = false;
	            new _tween2.default.Tween({ opacity: 1 }).to({ opacity: 0 }, 300).easing(_tween2.default.Easing.Cubic.In).onUpdate(function () {
	                if (outNode) outNode.style.opacity = this.opacity;
	            }).onComplete(function () {
	                outComplete = true;
	                if (outComplete && inComplete) {
	                    self.onAnimate = false;
	                }
	            }).start();
	            new _tween2.default.Tween({ opacity: 0 }).to({ opacity: 1 }, 300).easing(_tween2.default.Easing.Cubic.In).onUpdate(function () {
	                if (inNode) inNode.style.opacity = this.opacity;
	            }).onComplete(function () {
	                inComplete = true;
	                if (outComplete && inComplete) {
	                    self.onAnimate = false;
	                }
	            }).start();
	        }
	    }, {
	        key: 'getPrevIndex',
	        value: function getPrevIndex(index) {
	            var nowIndex = null;
	            if (index) nowIndex = index;else nowIndex = this.state.nowImage;
	            try {
	                if (nowIndex > 0) return nowIndex - 1;else return this.props.imgs.length - 1;
	            } catch (err) {
	                console.warn(err);
	                return 0;
	            }
	        }
	    }, {
	        key: 'getNextIndex',
	        value: function getNextIndex(index) {
	            var nowIndex = null;
	            if (index) nowIndex = index;else nowIndex = this.state.nowImage;
	            try {
	                if (nowIndex < this.props.imgs.length - 1) return nowIndex + 1;else return 0;
	            } catch (err) {
	                console.warn(err);
	                return 0;
	            }
	        }

	        // 缩放

	    }, {
	        key: 'handleImageZoom',
	        value: function handleImageZoom(imageIndex) {
	            if (!this.imageInZoom) {
	                this.tmpNowImage = imageIndex;
	                this.minImageSize = this.state.imageSize[this.tmpNowImage];
	                this.originalSize = this.getImageSize(this.props.imgs[this.tmpNowImage].url);
	                this.imageMoveRange = {
	                    x: this.originalSize.width - this.window.innerWidth + 2 * this.imageZoomMargin,
	                    y: this.originalSize.height - this.window.innerHeight + 2 * this.imageZoomMargin
	                };
	                var imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
	                imgSizeData[this.tmpNowImage] = this.originalSize;
	                this.addEvent(this.window, 'mousemove', this.handleImageMove);
	                this.removeEvent(this.window, 'resize', this.calNowImageSize);
	                this.setState({
	                    showAction: false,
	                    imageSize: imgSizeData,
	                    imageZoomQuit: { zIndex: 200 }
	                });
	                this.imageInZoom = true;
	            } else {
	                var _imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
	                _imgSizeData[this.tmpNowImage] = this.minImageSize;
	                this.removeEvent(this.window, 'mousemove', this.handleImageMove);
	                this.addEvent(this.window, 'resize', this.calNowImageSize);
	                this.setState({
	                    imageMovePos: null,
	                    showAction: true,
	                    imageSize: _imgSizeData,
	                    imageZoomQuit: { zIndex: -100 }
	                });
	                this.imageInZoom = false;
	            }
	        }
	    }, {
	        key: 'handleImageMove',
	        value: function handleImageMove(e) {
	            var imgPosX = void 0,
	                imgPosY = null;
	            if (this.originalSize.width > this.window.innerWidth) {
	                imgPosX = this.imageZoomMargin - this.imageMoveRange.x * (e.clientX / this.window.innerWidth);
	            } else {
	                imgPosX = 0;
	            }
	            if (this.originalSize.height > this.window.innerHeight) {
	                imgPosY = this.imageZoomMargin - this.imageMoveRange.y * (e.clientY / this.window.innerHeight) + this.originalSize.height / 2;
	            } else {
	                imgPosY = (this.window.innerHeight - this.originalSize.height) / 2 + this.originalSize.height / 2;
	            }
	            this.setState({
	                imageMovePos: {
	                    transformOrigin: this.imageZoomMargin + 'px ' + this.imageZoomMargin + 'px 0px',
	                    transform: 'translate(' + imgPosX + 'px, ' + imgPosY + 'px)'
	                }
	            });
	        }

	        // 获取窗口

	    }, {
	        key: 'getWindow',
	        value: function getWindow() {
	            if (window.top) {
	                return window.top;
	            } else {
	                return window;
	            }
	        }
	        // 禁止选中

	    }, {
	        key: 'preventSelect',
	        value: function preventSelect() {
	            return false;
	        }
	        // 事件绑定

	    }, {
	        key: 'addEvent',
	        value: function addEvent(object, type, callback) {
	            if (object == null || typeof object == 'undefined') return;
	            if (object.addEventListener) {
	                object.addEventListener(type, callback, false);
	            } else if (object.attachEvent) {
	                object.attachEvent("on" + type, callback);
	            } else {
	                object["on" + type] = callback;
	            }
	        }
	    }, {
	        key: 'removeEvent',

	        // 事件移除绑定
	        value: function removeEvent(object, type, callback) {
	            if (object == null || typeof object == 'undefined') return;
	            if (object.removeEventListener) {
	                object.removeEventListener(type, callback, false);
	            } else if (object.detachEvent) {
	                object.detachEvent("on" + type, callback);
	            } else {
	                object["on" + type] = callback;
	            }
	        }

	        // 启用Body滚动

	    }, {
	        key: 'enableBodyScroll',
	        value: function enableBodyScroll() {
	            if (this.bodyAttr) {
	                document.getElementsByTagName('body')[0].style.position = this.bodyAttr;
	                this.bodyAttr = null;
	            } else {
	                document.getElementsByTagName('body')[0].style.position = '';
	            }
	        }
	        // 关闭Body滚动

	    }, {
	        key: 'disableBodyScroll',
	        value: function disableBodyScroll() {
	            if (!this.bodyAttr) {
	                this.bodyAttr = document.getElementsByTagName('body')[0].style.position;
	                document.getElementsByTagName('body')[0].style.position = 'fixed';
	            } else {
	                document.getElementsByTagName('body')[0].style.position = 'fixed';
	            }
	        }

	        // 监听键盘事件

	    }, {
	        key: 'listenKeyDown',
	        value: function listenKeyDown() {
	            if (!this.keyEvent) {
	                this.keyEvent = document.onkeydown;
	                document.onkeydown = this.handleKeyDown;
	            } else {
	                document.onkeydown = this.handleKeyDown;
	            }
	        }
	    }, {
	        key: 'unListenKeyDown',
	        value: function unListenKeyDown() {
	            if (this.keyEvent) {
	                document.onkeydown = this.keyEvent;
	                this.keyEvent = null;
	            } else {
	                document.onkeydown = null;
	            }
	        }
	    }, {
	        key: 'handleKeyDown',
	        value: function handleKeyDown(e) {
	            var ie = false;
	            if (document.all) ie = true;
	            var key;
	            if (ie) {
	                key = event.keyCode;
	            } else {
	                key = e.keyCode;
	            }
	            this.handleImageKeySwitch(key);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;

	            //Tween渲染必须
	            function animate(time) {
	                requestAnimationFrame(animate);
	                _tween2.default.update(time);
	            }
	            requestAnimationFrame(animate);

	            return _react2.default.createElement(
	                _reactPortal2.default,
	                {
	                    className: _app2.default.portalStyle,
	                    isOpened: this.state.isOpened,
	                    closeOnEsc: true,
	                    closeOnOutsideClick: false,
	                    onOpen: this.handleBeforeModalOnOpen,
	                    beforeClose: this.handleModalBeforeClose
	                },
	                _react2.default.createElement(
	                    'div',
	                    { className: _app2.default.slider },
	                    _react2.default.createElement('div', { className: _app2.default.screenOverlay, onClickCapture: function onClickCapture() {
	                            return _this4.handleModalClose();
	                        } }),
	                    _react2.default.createElement('div', {
	                        className: _app2.default.sliderZoomQuit,
	                        onClickCapture: function onClickCapture() {
	                            return _this4.handleImageZoom();
	                        },
	                        style: this.state.imageZoomQuit
	                    }),
	                    this.props.switchButton ? _react2.default.createElement(
	                        'div',
	                        { className: _app2.default.toPreviousButton, onClickCapture: function onClickCapture() {
	                                return _this4.handleImageSliderToPrevious();
	                            }, id: 'toPrevButton' },
	                        _react2.default.createElement('div', { className: _app2.default.switchButtonLayer }),
	                        _react2.default.createElement(
	                            'svg',
	                            { className: _app2.default.switchButtonIcons, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
	                            _react2.default.createElement('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' }),
	                            _react2.default.createElement('path', { d: 'M0-.5h24v24H0z', fill: 'none' })
	                        )
	                    ) : null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: _app2.default.sliderImageListWrapper },
	                        this.props.imgs && this.state.imageSize ? this.props.imgs.map(function (imageData, index) {
	                            var imageWrapperStyle = index == _this4.state.nowImage ? _appStyle2.default.imageWrapperShowStyle : _appStyle2.default.imageWrapperHideStyle;
	                            var imageMovePos = index == _this4.state.nowImage ? _this4.state.imageMovePos : null;
	                            var imageUrl = _this4.props.lazyLoad ? index == _this4.state.nowImage ? imageData.url : _this4.state.imageSize[index].width == 0 ? '' : imageData.url : imageData.url;
	                            var actionStyle = {
	                                top: _this4.window.innerHeight / 2 - _this4.state.imageSize[index].height / 2,
	                                right: _this4.window.innerWidth / 2 - _this4.state.imageSize[index].width / 2 - 48,
	                                display: _this4.state.showAction ? 'block' : 'none'
	                            };
	                            return _react2.default.createElement(
	                                'div',
	                                { className: _app2.default.sliderImageWrapper, key: index, style: imageWrapperStyle },
	                                _react2.default.createElement('div', {
	                                    className: _app2.default.sliderCloser,
	                                    onClickCapture: function onClickCapture() {
	                                        return _this4.handleModalClose();
	                                    },
	                                    onMouseOver: _this4.handleImageCloserHover
	                                }),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: _app2.default.sliderImageContainer, id: 'sliderShowImageOf' + index, style: imageMovePos },
	                                    _react2.default.createElement('img', {
	                                        src: imageUrl,
	                                        className: _app2.default.sliderImage,
	                                        style: _this4.state.imageSize[index],
	                                        onSelect: _this4.preventSelect
	                                    }),
	                                    _react2.default.createElement(
	                                        'div',
	                                        {
	                                            className: _app2.default.imageAction,
	                                            style: actionStyle
	                                        },
	                                        _this4.props.zoomButton ? _react2.default.createElement(
	                                            'a',
	                                            { className: _app2.default.imageZoom, onClickCapture: function onClickCapture() {
	                                                    return _this4.handleImageZoom(index);
	                                                } },
	                                            _react2.default.createElement(
	                                                'svg',
	                                                { className: _app2.default.actionButtonIcons, viewBox: '0 0 24 24',
	                                                    xmlns: 'http://www.w3.org/2000/svg' },
	                                                _react2.default.createElement('path', {
	                                                    d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' }),
	                                                _react2.default.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
	                                                _react2.default.createElement('path', { d: 'M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z' })
	                                            )
	                                        ) : null,
	                                        _this4.props.downloadButton ? _react2.default.createElement(
	                                            'a',
	                                            { className: _app2.default.imageDownLoad, href: imageData.url, download: '保存图片' },
	                                            _react2.default.createElement(
	                                                'svg',
	                                                { className: _app2.default.actionButtonIcons, viewBox: '0 0 24 24',
	                                                    xmlns: 'http://www.w3.org/2000/svg' },
	                                                _react2.default.createElement('path', { d: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' }),
	                                                _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
	                                            )
	                                        ) : null
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: _app2.default.imageSwitch, style: _this4.state.imageSize[index] },
	                                    _react2.default.createElement('div', {
	                                        className: _app2.default.switchOverlay,
	                                        onMouseOver: _this4.handleImageCloserHover
	                                    }),
	                                    _react2.default.createElement('div', {
	                                        className: _app2.default.leftSwitch,
	                                        onClickCapture: function onClickCapture() {
	                                            return _this4.handleImageSliderToPrevious();
	                                        },
	                                        onMouseOver: _this4.handleImageSliderToPreviousHover
	                                    }),
	                                    _react2.default.createElement('div', {
	                                        className: _app2.default.rightSwitch,
	                                        onClickCapture: function onClickCapture() {
	                                            return _this4.handleImageSliderToNext();
	                                        },
	                                        onMouseOver: _this4.handleImageSliderToNextHover
	                                    })
	                                )
	                            );
	                        }) : null,
	                        this.props.indicator ? _react2.default.createElement(
	                            'div',
	                            { className: _app2.default.imageIndicatorWrapper },
	                            _react2.default.createElement(
	                                'div',
	                                { className: _app2.default.imageIndicator },
	                                _react2.default.createElement(
	                                    'span',
	                                    { className: _app2.default.imageIndicatorLabel, onSelect: this.preventSelect },
	                                    this.state.nowImage + 1,
	                                    ' / ',
	                                    this.props.imgs.length
	                                )
	                            )
	                        ) : null
	                    ),
	                    this.props.switchButton ? _react2.default.createElement(
	                        'div',
	                        { className: _app2.default.toNextButton, onClickCapture: function onClickCapture() {
	                                return _this4.handleImageSliderToNext();
	                            }, id: 'toNextButton' },
	                        _react2.default.createElement('div', { className: _app2.default.switchButtonLayer }),
	                        _react2.default.createElement(
	                            'svg',
	                            { className: _app2.default.switchButtonIcons, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
	                            _react2.default.createElement('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
	                            _react2.default.createElement('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
	                            _react2.default.createElement('path', { d: 'M0-.25h24v24H0z', fill: 'none' })
	                        )
	                    ) : null
	                )
	            );
	        }
	    }]);

	    return Slideshow;
	}(_react2.default.Component);

	Slideshow.defaultProps = {
	    lazyLoad: true,
	    infinitySwitch: true,
	    switchButton: true,
	    downloadButton: true,
	    zoomButton: true,
	    indicator: true,
	    imgs: []
	};

	Slideshow.propTypes = {
	    imgs: _react2.default.PropTypes.array.isRequired
	};

	exports.default = Slideshow;

	// TODO
	// 图片放大/Done
	// 图片下载/Done
	// 带文字
	// 懒加载/Done
	// 缩略图
	// 修正按钮位移state问题/Done
	// 更多动画

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[local]-[hash:base64:5]!./app.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[local]-[hash:base64:5]!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "/*总入口*/\r\n.portalStyle-2oWr2 {\r\n    opacity: 0;\r\n    z-index: 100;\r\n    position: relative;\r\n}\r\n.slider-3fx7S {\r\n    position: fixed;\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 100;\r\n}\r\n\r\n\r\n\r\n/*关闭背景层*/\r\n.screenOverlay-3VSUR {\r\n    z-index: 1;\r\n}\r\n\r\n\r\n/*切换按钮*/\r\n.switchImageButton-3Sqb4 {\r\n    position: absolute;\r\n    top: 50%;\r\n    width: 40px;\r\n    height: 40px;\r\n    z-index: 20;\r\n    box-sizing: border-box;\r\n    padding-top: 1px;\r\n    border-radius: 2px;\r\n    /*background-color: #00BCD4;*/\r\n    cursor: pointer;\r\n    transition: all .3s;\r\n}\r\n.switchButtonLayer-uqz0f {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    /*background-color: #ffffff;*/\r\n    opacity: 0;\r\n    transition: all .2s;\r\n}\r\n.switchButtonLayer-uqz0f:hover {\r\n    opacity: 0.2;\r\n}\r\n.switchButtonLayer-uqz0f:active {\r\n    opacity: 0.4;\r\n}\r\n.toPreviousButton-1ZWVL {\r\n    left: 30px;\r\n    transition: all .3s;\r\n}\r\n.toPreviousButtonMove-2KXc2 {\r\n    left: 40px;\r\n}\r\n.toNextButton-1dHwq {\r\n    right: 30px;\r\n    transition: all .3s;\r\n}\r\n.toNextButtonMove-3sObS {\r\n    right: 40px;\r\n}\r\n.switchButtonIcons-1wtSX {\r\n    width: 100%;\r\n    height: 100%;\r\n    fill: white;\r\n}\r\n.noUse-k_ZeB:before {\r\n    content: \"\";\r\n    top: 0;\r\n    left: 0;\r\n    background-color: #ff3466;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 100%;\r\n    -webkit-animation-fill-mode: both;\r\n    animation-fill-mode: both;\r\n    position: absolute;\r\n    opacity: 0;\r\n    -webkit-animation: jumper-1COnh 1.8s 0.33333s ease-out infinite;\r\n}\r\n.noUse-k_ZeB:after {\r\n    content: \"\";\r\n    top: 0;\r\n    left: 0;\r\n    background-color: #ff3466;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 100%;\r\n    -webkit-animation-fill-mode: both;\r\n    animation-fill-mode: both;\r\n    position: absolute;\r\n    opacity: 0;\r\n    -webkit-animation: jumper-1COnh 1.8s 0.66666s ease-out infinite;\r\n}\r\n\r\n\r\n/*退出缩放*/\r\n.sliderZoomQuit-iAtKv {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: -100;\r\n    cursor: zoom-out;\r\n}\r\n\r\n\r\n/*图片区域*/\r\n.sliderImageListWrapper-3woYC {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n    left: 0;\r\n    top: 0;\r\n    z-index: 15;\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    box-shadow: rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px;\r\n}\r\n.sliderImageWrapper-1ATuC {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n.sliderCloser-9QxjR {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n.sliderImageContainer-1mWBA {\r\n    opacity: 0;\r\n}\r\n.sliderImage-2d0oN {\r\n    position: absolute;\r\n    border-radius: 2px;\r\n    left: 0; top: 0; right: 0; bottom: 0;\r\n    margin: auto;\r\n    transition: .3s height, .3s width;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n}\r\n.imageIndicatorWrapper-2JJLq {\r\n    position: relative;\r\n    width: 90px;\r\n    height: 100%;\r\n    margin: auto;\r\n}\r\n.imageIndicator-1P5CB{\r\n    position: absolute;\r\n    width: 100%;\r\n    height:26px;\r\n    bottom: 10px;\r\n    color: white;\r\n    text-align: center;\r\n    border-radius: 3px;\r\n    background-color: rgba(0, 0, 0, 0.65);\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);\r\n}\r\n.imageIndicatorLabel-1gFvF {\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    line-height: 26px;\r\n    font-size: 12px;\r\n}\r\n.imageAction-2whOf {\r\n    position: absolute;\r\n    width: 30px;\r\n}\r\n.actionButtonIcons-L86u6 {\r\n    cursor: pointer;\r\n    width:  100%;\r\n    height: 100%;\r\n    fill: #e9e9e9;\r\n    transition: all .3s;\r\n}\r\n.actionButtonIcons-L86u6:hover {\r\n    fill: #f4f4f4;\r\n}\r\n.actionButtonIcons-L86u6:active {\r\n    fill: white;\r\n}\r\n\r\n\r\n/*切换叠层*/\r\n.imageSwitch-1aIbt {\r\n}\r\n.switchOverlay-fqILT {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n}\r\n.leftSwitch-3AmZe {\r\n    position: absolute;\r\n    height: 100%;\r\n    width: 40%;\r\n    left: 0;\r\n    cursor: pointer;\r\n}\r\n.rightSwitch-1IUnE {\r\n    position: absolute;\r\n    height: 100%;\r\n    width: 40%;\r\n    right: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n/*按钮动画*/\r\n@-webkit-keyframes jumper-1COnh {\r\n    0% {\r\n        opacity: 0;\r\n        -webkit-transform: scale(0);\r\n        transform: scale(0)\r\n    }\r\n    5% {\r\n        opacity: 1\r\n    }\r\n    100% {\r\n        -webkit-transform: scale(1);\r\n        transform: scale(1);\r\n        opacity: 0\r\n    }\r\n}\r\n@keyframes jumper-1COnh {\r\n    0% {\r\n        opacity: 0;\r\n        -webkit-transform: scale(0);\r\n        transform: scale(0)\r\n    }\r\n    5% {\r\n        opacity: 1\r\n    }\r\n    100% {\r\n        opacity: 0\r\n    }\r\n}", ""]);

	// exports
	exports.locals = {
		"portalStyle": "portalStyle-2oWr2",
		"slider": "slider-3fx7S",
		"screenOverlay": "screenOverlay-3VSUR",
		"switchImageButton": "switchImageButton-3Sqb4",
		"switchButtonLayer": "switchButtonLayer-uqz0f",
		"toPreviousButton": "toPreviousButton-1ZWVL switchImageButton-3Sqb4",
		"toPreviousButtonMove": "toPreviousButtonMove-2KXc2",
		"toNextButton": "toNextButton-1dHwq switchImageButton-3Sqb4",
		"toNextButtonMove": "toNextButtonMove-3sObS",
		"switchButtonIcons": "switchButtonIcons-1wtSX",
		"noUse": "noUse-k_ZeB",
		"jumper": "jumper-1COnh",
		"sliderZoomQuit": "sliderZoomQuit-iAtKv",
		"sliderImageListWrapper": "sliderImageListWrapper-3woYC",
		"sliderImageWrapper": "sliderImageWrapper-1ATuC",
		"sliderCloser": "sliderCloser-9QxjR",
		"sliderImageContainer": "sliderImageContainer-1mWBA",
		"sliderImage": "sliderImage-2d0oN",
		"imageIndicatorWrapper": "imageIndicatorWrapper-2JJLq",
		"imageIndicator": "imageIndicator-1P5CB",
		"imageIndicatorLabel": "imageIndicatorLabel-1gFvF",
		"imageAction": "imageAction-2whOf",
		"actionButtonIcons": "actionButtonIcons-L86u6",
		"imageSwitch": "imageSwitch-1aIbt sliderImage-2d0oN",
		"switchOverlay": "switchOverlay-fqILT",
		"leftSwitch": "leftSwitch-3AmZe",
		"rightSwitch": "rightSwitch-1IUnE"
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var styles = {
	    portalStyle: {
	        opacity: 0,
	        zIndex: 100,
	        position: 'relative'
	    },
	    imageWrapperShowStyle: {
	        opacity: 1
	    },
	    imageWrapperHideStyle: {
	        display: 'none',
	        opacity: 0
	    }
	};

	exports.default = styles;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;