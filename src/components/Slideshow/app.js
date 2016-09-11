// Libs
import React from 'react';
import TWEEN from 'tween.js';
import Portal from'react-portal';
// Style
import styles from './app.css';
import jsStyles from './appStyle.js';
// Polyfill
import polyfill from '../../utils/polyfill.js';

class Slideshow extends React.Component {
    constructor(props) {
        super(props);

        polyfill();

        this.window = null;
        this.keyEvent = null;
        this.bodyAttr = null;
        this.resizeRatio = 0.90;
        this.onAnimate = false;
        this.tmpNowImage = null;
        this.minImageSize = null;
        this.originalSize = null;
        this.imageInZoom = false;
        this.imageZoomMargin = 100;
        this.imageMoveRange = null;

        this.state = {
            isOpened : false,
            nowImage: null,
            imageSize: null,
            imageSizeAnimate: null,
            imageMovePos: null,
            imageZoomQuit: null,
            showAction: false
        };

        this.handleModalOpen                  = this.handleModalOpen.bind(this);
        this.handleBeforeModalOnOpen          = this.handleBeforeModalOnOpen.bind(this);
        this.handleModalBeforeClose           = this.handleModalBeforeClose.bind(this);
        this.handleModalClose                 = this.handleModalClose.bind(this);
        this.calAllImageSize                  = this.calAllImageSize.bind(this);
        this.getImageSize                     = this.getImageSize.bind(this);
        this.initImageSize                    = this.initImageSize.bind(this);
        this.calImageSize                     = this.calImageSize.bind(this);
        this.calSingleImageSize               = this.calSingleImageSize.bind(this);
        this.calNowImageSize                  = this.calNowImageSize.bind(this);
        this.handleImageSliderToPreviousHover = this.handleImageSliderToPreviousHover.bind(this);
        this.handleImageSliderToNextHover     = this.handleImageSliderToNextHover.bind(this);
        this.handleImageCloserHover           = this.handleImageCloserHover.bind(this);
        this.handleImageKeySwitch             = this.handleImageKeySwitch.bind(this);
        this.handleImageSliderToPrevious      = this.handleImageSliderToPrevious.bind(this);
        this.handleImageSliderToNext          = this.handleImageSliderToNext.bind(this);
        this.handleImageAnimate               = this.handleImageAnimate.bind(this);
        this.getPrevIndex                     = this.getPrevIndex.bind(this);
        this.getNextIndex                     = this.getNextIndex.bind(this);
        this.handleImageZoom                  = this.handleImageZoom.bind(this);
        this.handleImageMove                  = this.handleImageMove.bind(this);
        this.handleImageOnLoaded              = this.handleImageOnLoaded.bind(this);
        this.getWindow                        = this.getWindow.bind(this);
        this.preventSelect                    = this.preventSelect.bind(this);
        this.addEvent                         = this.addEvent.bind(this);
        this.enableBodyScroll                 = this.enableBodyScroll.bind(this);
        this.disableBodyScroll                = this.disableBodyScroll.bind(this);
        this.listenKeyDown                    = this.listenKeyDown.bind(this);
        this.unListenKeyDown                  = this.unListenKeyDown.bind(this);
        this.handleKeyDown                    = this.handleKeyDown.bind(this);
    }



    componentWillMount() {
        this.window = this.getWindow();
    }
    componentDidMount() {
        this.initImageSize();
        this.addEvent(this.window, 'resize', this.calNowImageSize);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.imgs.length !== this.props.imgs.length) {
            this.calNowImageSize();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, prevState) {}
    componentWillUnmount() {}



    // 模态框弹出
    handleModalOpen(initImage) {
        this.onAnimate = true;
        if(initImage !== undefined && this.props.imgs !== undefined) {
            this.tmpNowImage = (initImage > this.props.imgs.length-1 ? this.props.imgs.length-1 : initImage<0 ? 0 : initImage);
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
    handleBeforeModalOnOpen(nodeModal) {
        let self = this;
        let nodeNow = document.getElementById(`sliderShowImageOf${this.tmpNowImage}`);
        nodeNow.style.opacity = 1;
        new TWEEN.Tween({ opacity: 0 })
            .to({ opacity: 1 }, 300)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(function() {
                nodeModal.style.opacity = this.opacity;
            })
            .onComplete(function() {
                self.onAnimate = false;
            })
            .start();
    }
    // 模态框关闭
    handleModalClose() {
        this.onAnimate = true;
        this.setState({ isOpened: false });
        this.enableBodyScroll();
        this.unListenKeyDown();
    }
    // 模态框关闭执行钩子
    handleModalBeforeClose(nodeModal, removeFromDom) {
        let self = this;
        new TWEEN.Tween({ opacity: 1 })
            .to({ opacity: 0 }, 300)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(function() {
                nodeModal.style.opacity = this.opacity;
            })
            .onComplete(function() {
                removeFromDom();
                self.onAnimate = false;
            })
            .start();
    }



    // 计算图片缩放大小, 保持图片始终在视图内
    // resizeRatio可以控制图片缩放比例
    getImageSize(imageUrl) {
        let img = new Image();
        img.src = imageUrl;
        return {
            width: img.width,
            height: img.height
        }
    }
    initImageSize() {
        let imgSizeData = new Array(this.props.imgs.length);
        imgSizeData.fill({
            width : 0,
            height: 0
        });
        if(this.props.imgs) {
            this.setState({
                imageSize: imgSizeData,
                imageSizeAnimate: { transition: '.3s height, .3s width' },
                imageMovePos: {
                    transformOrigin: `${this.imageZoomMargin}px ${this.imageZoomMargin}px 0px`
                }
            });
        }
    }
    calImageSize(imageUrl, callBack) {
        let winWidth = this.window.innerWidth;
        let winHeight = this.window.innerHeight;
        let winWHRatio = winWidth / winHeight;

        let img = new Image();

        img.onload = () => {
            let imgSizeData = null;
            let imgWHRatio = img.width / img.height;
            if (imgWHRatio > winWHRatio) {
                if (img.width >= winWidth) {
                    imgSizeData = {
                        width: winWidth * this.resizeRatio,
                        height: winWidth * this.resizeRatio / imgWHRatio
                    };
                } else {
                    if (img.width < winWidth * this.resizeRatio) {
                        imgSizeData = {
                            width: img.width,
                            height: img.height
                        };
                    } else {
                        imgSizeData = {
                            width: winWidth * this.resizeRatio,
                            height: winWidth * this.resizeRatio / imgWHRatio
                        };
                    }
                }
            } else {
                if (img.height >= winHeight) {
                    imgSizeData = {
                        height: winHeight * this.resizeRatio,
                        width: winHeight * this.resizeRatio * imgWHRatio
                    };
                } else {
                    if (img.height < winHeight * this.resizeRatio) {
                        imgSizeData = {
                            height: img.height,
                            width: img.width
                        };
                    } else {
                        imgSizeData = {
                            height: winHeight * this.resizeRatio,
                            width: winHeight * this.resizeRatio * imgWHRatio
                        };
                    }
                }
            }
            callBack(imgSizeData);
        };

        img.src = imageUrl;
    }
    calAllImageSize() {
        let imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
        this.props.imgs ? this.props.imgs.map((imageData, urlIndex)=> {
            this.calImageSize(imageData.url, (size) => {
                imgSizeData[urlIndex] = size;
                this.setState({ imageSize: imgSizeData});
            });
        }) : null;
    }
    calSingleImageSize(urlIndex) {
        if(this.state.imageSize && this.props.imgs) {
            let imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
            this.calImageSize(this.props.imgs[urlIndex].url, (size) => {
                imgSizeData[urlIndex] = size;
                this.setState({
                    imageSize: imgSizeData
                }, () => { setTimeout(()=>{
                        this.setState({
                            imageSizeAnimate: { transition: '.3s height, .3s width' },
                        })
                    }, 500)}
                );
            });
        } else {
            console.warn('imageUrl数据为空， 无法计算图片尺寸');
        }
    }
    calNowImageSize() {
        if(this.state.nowImage) {
            this.calSingleImageSize(this.state.nowImage);
        }
    }
    

    // 图片切换按钮动画
    handleImageSliderToPreviousHover() {
        if(!this.onAnimate) {
            document.getElementById(`toPrevButton`).style.left = '40px';
            document.getElementById(`toNextButton`).style.right = '30px';
        }
    }
    handleImageSliderToNextHover() {
        if(!this.onAnimate) {
            document.getElementById(`toPrevButton`).style.left = '30px';
            document.getElementById(`toNextButton`).style.right = '40px';
        }
    }
    handleImageCloserHover() {
        if(!this.onAnimate) {
            document.getElementById(`toPrevButton`).style.left = '30px';
            document.getElementById(`toNextButton`).style.right = '30px';
        }
    }



    // 图片切换控制
    handleImageKeySwitch(key) {
        if(key == 37 || key == 38) {
            this.handleImageSliderToPrevious();
        } else if(key == 39 || key == 40) {
            this.handleImageSliderToNext();
        }
    }
    handleImageSliderToPrevious() {
        if(!this.onAnimate) {
            this.onAnimate = true;
            let prevNodeIndex = this.getPrevIndex();
            this.setState({
                nowImage: prevNodeIndex,
                imageSizeAnimate: { transition: 'initial' },
                showAction: false
            });
            this.calSingleImageSize(prevNodeIndex);
            let nodeNow = document.getElementById(`sliderShowImageOf${this.state.nowImage}`);
            let nodePrevious = document.getElementById(`sliderShowImageOf${prevNodeIndex}`);
            this.handleImageAnimate(nodeNow, nodePrevious);
        }
    }
    handleImageSliderToNext() {
        if(!this.onAnimate) {
            this.onAnimate = true;
            let nextNodeIndex = this.getNextIndex();
            this.setState({
                nowImage: nextNodeIndex,
                imageSizeAnimate: { transition: 'initial' },
                showAction: false
            });
            this.calSingleImageSize(nextNodeIndex);
            let nodeNow = document.getElementById(`sliderShowImageOf${this.state.nowImage}`);
            let nodeNext = document.getElementById(`sliderShowImageOf${nextNodeIndex}`);
            this.handleImageAnimate(nodeNow, nodeNext);
        }
    }
    handleImageAnimate(outNode, inNode) {
        let self = this;
        let outComplete = false;
        let inComplete = false;
        new TWEEN.Tween({ opacity: 1 })
            .to({ opacity: 0 }, 300)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(function() {
                if(outNode) outNode.style.opacity = this.opacity;
            })
            .onComplete(function() {
                outComplete = true;
                if(outComplete && inComplete) {
                    self.onAnimate = false;
                }
            })
            .start();
        new TWEEN.Tween({ opacity: 0 })
            .to({ opacity: 1 }, 300)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(function() {
                if(inNode) inNode.style.opacity = this.opacity;
            })
            .onComplete(function() {
                inComplete = true;
                if(outComplete && inComplete) {
                    self.onAnimate = false;
                }
            })
            .start();
    }
    getPrevIndex(index) {
        let nowIndex = null;
        if (index) nowIndex = index;
        else nowIndex = this.state.nowImage;
        try {
            if (nowIndex > 0) return nowIndex - 1;
            else return this.props.imgs.length - 1;
        } catch (err) {
            console.warn(err);
            return 0;
        }
    }
    getNextIndex(index) {
        let nowIndex = null;
        if (index) nowIndex = index;
        else nowIndex = this.state.nowImage;
        try {
            if (nowIndex < this.props.imgs.length - 1) return nowIndex + 1;
            else return 0;
        } catch (err) {
            console.warn(err);
            return 0;
        }
    }



    // 缩放
    handleImageZoom(imageIndex) {
        if(!this.imageInZoom) {
            this.tmpNowImage = imageIndex;
            this.minImageSize = this.state.imageSize[this.tmpNowImage];
            this.originalSize = this.getImageSize(this.props.imgs[this.tmpNowImage].url);
            this.imageMoveRange = {
                x: (this.originalSize.width - this.window.innerWidth) + (2 * this.imageZoomMargin),
                y: (this.originalSize.height - this.window.innerHeight) + (2 * this.imageZoomMargin)
            };
            let imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
            imgSizeData[this.tmpNowImage] = this.originalSize;
            this.addEvent(this.window, 'mousemove', this.handleImageMove);
            this.removeEvent(this.window, 'resize', this.calNowImageSize);
            this.setState({
                imageSize: imgSizeData,
                imageZoomQuit: { zIndex: 200 },
                showAction: false
            });
            this.imageInZoom = true;
        } else {
            let imgSizeData = JSON.parse(JSON.stringify(this.state.imageSize));
            imgSizeData[this.tmpNowImage] = this.minImageSize;
            this.removeEvent(this.window, 'mousemove', this.handleImageMove);
            this.addEvent(this.window, 'resize', this.calNowImageSize);
            this.setState({
                imageMovePos: null,
                imageSize: imgSizeData,
                imageZoomQuit: { zIndex: -100 },
                showAction: true
            });
            this.imageInZoom = false;
        }
    }
    handleImageMove(e) {
        let imgPosX,imgPosY = null;
        if(this.originalSize.width > this.window.innerWidth) {
            imgPosX = this.imageZoomMargin - (this.imageMoveRange.x*(e.clientX/this.window.innerWidth));
        } else {
            imgPosX = 0;
        }
        if(this.originalSize.height > this.window.innerHeight) {
            imgPosY = this.imageZoomMargin - (this.imageMoveRange.y*(e.clientY/this.window.innerHeight)) + this.originalSize.height/2
        } else {
            imgPosY = (this.window.innerHeight - this.originalSize.height)/2 + this.originalSize.height/2;
        }
        this.setState({
            imageMovePos: {
                transform: `translate(${imgPosX}px, ${imgPosY}px)`
            }
        });
    }


    // 图片加载完成回调
    handleImageOnLoaded(e) {
        this.setState({ showAction: true });
    }



    // 获取窗口
    getWindow() {
        if(window.top) {
            return window.top
        } else {
            return window
        }
    }
    // 禁止选中
    preventSelect() {
        return false
    }
    // 事件绑定
    addEvent(object, type, callback) {
        if (object == null || typeof(object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on"+type] = callback;
        }
    };
    // 事件移除绑定
    removeEvent(object, type, callback) {
        if (object == null || typeof(object) == 'undefined') return;
        if (object.removeEventListener) {
            object.removeEventListener(type, callback, false);
        } else if (object.detachEvent) {
            object.detachEvent("on" + type, callback);
        } else {
            object["on"+type] = callback;
        }
    }



    // 启用Body滚动
    enableBodyScroll() {
        if(this.bodyAttr) {
            document.getElementsByTagName('body')[0].style.position = this.bodyAttr;
            this.bodyAttr = null;
        } else {
            document.getElementsByTagName('body')[0].style.position = '';
        }
    }
    // 关闭Body滚动
    disableBodyScroll() {
        if(!this.bodyAttr) {
            this.bodyAttr = document.getElementsByTagName('body')[0].style.position;
            document.getElementsByTagName('body')[0].style.position = 'fixed';
        } else {
            document.getElementsByTagName('body')[0].style.position = 'fixed';
        }
    }



    // 监听键盘事件
    listenKeyDown() {
        if(!this.keyEvent) {
            this.keyEvent = document.onkeydown;
            document.onkeydown = this.handleKeyDown;
        } else {
            document.onkeydown = this.handleKeyDown;
        }
    }
    unListenKeyDown() {
        if(this.keyEvent) {
            document.onkeydown = this.keyEvent;
            this.keyEvent = null;
        } else {
            document.onkeydown = null;
        }
    }
    handleKeyDown(e){
        let ie = false;
        if(document.all) ie = true;
        var key;
        if (ie) {
            key = event.keyCode;
        } else {
            key = e.keyCode;
        }
        this.handleImageKeySwitch(key);
    }

    render() {
        //Tween渲染必须
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        return (
            <Portal
                className={styles.portalStyle}
                isOpened={this.state.isOpened}
                closeOnEsc={true}
                closeOnOutsideClick={false}
                onOpen={this.handleBeforeModalOnOpen}
                beforeClose={this.handleModalBeforeClose}
            >

                <div className={styles.slider}>

                    <div className={styles.screenOverlay}  onClickCapture={() => this.handleModalClose()}></div>

                    <div
                        className={styles.sliderZoomQuit}
                        onClickCapture={() => this.handleImageZoom()}
                        style={this.state.imageZoomQuit}
                    >
                    </div>
                    
                    {
                        this.props.switchButton ?
                        <div className={styles.toPreviousButton} onClickCapture={() => this.handleImageSliderToPrevious()} id="toPrevButton">
                            <div className={styles.switchButtonLayer}></div>
                            <svg className={styles.switchButtonIcons} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                                <path d="M0-.5h24v24H0z" fill="none"/>
                            </svg>
                        </div> : null
                    }

                    <div className={styles.sliderImageListWrapper}>
                        {
                            (this.props.imgs && this.state.imageSize) ? this.props.imgs.map((imageData,index)=> {
                                let imageWrapperStyle = (index == this.state.nowImage ? jsStyles.imageWrapperShowStyle : jsStyles.imageWrapperHideStyle);
                                let imageMovePos = (index == this.state.nowImage ? this.state.imageMovePos : null);
                                let imageUrl = this.props.lazyLoad ? (index == this.state.nowImage ? imageData.url : (this.state.imageSize[index].width == 0 ? '' : imageData.url)) : imageData.url;
                                let actionStyle = {
                                    top: this.window.innerHeight / 2 - this.state.imageSize[index].height / 2,
                                    right: this.window.innerWidth / 2 - this.state.imageSize[index].width / 2 - 48,
                                    display: (this.state.showAction ? 'block' : 'none')
                                };
                                let loadingStyle = { display: (this.props.loading ? 'block' : 'none') };
                                return (
                                    <div className={styles.sliderImageWrapper} key={index} style={imageWrapperStyle}>
                                        <div
                                            className={styles.sliderCloser}
                                            onClickCapture={() => this.handleModalClose()}
                                            onMouseOver={this.handleImageCloserHover}
                                        />
                                        <div className={styles.sliderImageContainer} id={`sliderShowImageOf${index}`} style={imageMovePos}>
                                            <div className={styles.imageLoading} style={loadingStyle}>
                                                <svg className={styles.circleLoading} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle className={styles.circleLoadingPath} fill="none" strokeWidth="3" strokeLinecap="round" cx="33" cy="33" r="30"></circle></svg>
                                            </div>
                                            <img
                                                src={imageUrl}
                                                className={styles.sliderImage}
                                                style={Object.assign({}, this.state.imageSize[index], this.state.imageSizeAnimate)}
                                                onSelect={this.preventSelect}
                                                onLoad={this.handleImageOnLoaded}
                                            />
                                            <div
                                                className={styles.imageAction}
                                                style={actionStyle}
                                            >
                                                {
                                                    this.props.zoomButton ?
                                                    <a className={styles.imageZoom} onClickCapture={() => this.handleImageZoom(index)}>
                                                        <svg className={styles.actionButtonIcons} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>
                                                    </a> : null
                                                }
                                                {
                                                    this.props.downloadButton ?
                                                    <a className={styles.imageDownLoad} href={imageData.url} download={'保存图片'}>
                                                        <svg className={styles.actionButtonIcons} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                                    </a> : null
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.imageSwitch} style={this.state.imageSize[index]}>
                                            <div
                                                className={styles.switchOverlay}
                                                onMouseOver={this.handleImageCloserHover}
                                            />
                                            <div
                                                className={styles.leftSwitch}
                                                onClickCapture={() => this.handleImageSliderToPrevious()}
                                                onMouseOver={this.handleImageSliderToPreviousHover}
                                            />
                                            <div
                                                className={styles.rightSwitch}
                                                onClickCapture={() => this.handleImageSliderToNext()}
                                                onMouseOver={this.handleImageSliderToNextHover}
                                            />
                                        </div>
                                    </div>
                                );
                            }) : null
                        }
                        {
                            this.props.indicator ?
                            <div className={styles.imageIndicatorWrapper}>
                                <div className={styles.imageIndicator}>
                                <span className={styles.imageIndicatorLabel} onSelect={this.preventSelect}>
                                    {this.state.nowImage + 1} / {this.props.imgs.length}
                                </span>
                                </div>
                            </div> : null
                        }
                    </div>

                    {
                        this.props.switchButton ?
                        <div className={styles.toNextButton} onClickCapture={() => this.handleImageSliderToNext()} id="toNextButton">
                            <div className={styles.switchButtonLayer}></div>
                            <svg className={styles.switchButtonIcons} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>
                        </div> : null
                    }

                </div>

            </Portal>
        );
    }
}

Slideshow.defaultProps = {
    lazyLoad: true,
    infinitySwitch: true,
    switchButton: true,
    downloadButton: true,
    loading: true,
    zoomButton: true,
    indicator: true,
    imgs: []
};

Slideshow.propTypes = {
    imgs: React.PropTypes.array.isRequired
};

export default Slideshow;

// TODO
// 图片放大/Done
// 图片下载/Done
// Loading动画/Done
// 带文字
// 懒加载/Done
// 缩略图
// 更多动画
// BUGS
// 修正按钮位移state问题/Done
// 修正IE下的问题
// 修正放大/下载按钮图片未加载前就显示的问题/Done
// Firefox下放大偏移/待测试