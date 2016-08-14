'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _app = require('./app.css');

var _app2 = _interopRequireDefault(_app);

var _appStyle = require('./appStyle.js');

var _appStyle2 = _interopRequireDefault(_appStyle);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _tween = require('tween.js');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slidershow = function (_React$Component) {
    _inherits(Slidershow, _React$Component);

    function Slidershow(props) {
        _classCallCheck(this, Slidershow);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slidershow).call(this, props));

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

    _createClass(Slidershow, [{
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

    return Slidershow;
}(_react2.default.Component);

Slidershow.defaultProps = {
    lazyLoad: true,
    infinitySwitch: true,
    switchButton: true,
    downloadButton: true,
    zoomButton: true,
    indicator: true,
    imgs: []
};

Slidershow.propTypes = {
    imgs: _react2.default.PropTypes.array.isRequired
};

exports.default = Slidershow;

// TODO
// 图片放大/Done
// 图片下载/Done
// 带文字
// 懒加载/Done
// 缩略图
// 修正按钮位移state问题/Done
// 更多动画
//# sourceMappingURL=app.js.map