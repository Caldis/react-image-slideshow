// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './publicStyle.css';
import Gallery from './components/Gallery/app.js';
import SlideShow from './components/Slideshow/app.js';

// Define Routes
class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            protoImgs: [
	            'http://tankr.net/s/medium/WTQ0.jpg',
                'http://ww1.sinaimg.cn/large/d8e32accgw1f69b7ifm4gj20qo0qon3e.jpg',
                'http://ww1.sinaimg.cn/large/d8e32accgw1f62keeub2uj21kw2dc4pa.jpg',
                'http://ww4.sinaimg.cn/large/d8e32accgw1f5vv1j1leij21kw11x4a5.jpg',
                'http://ww4.sinaimg.cn/large/d8e32accgw1f57j2kvgaoj21kw2dcx6p.jpg',
            ],
            imageData: [
                {
                    url  : 'http://tankr.net/s/medium/WTQ0.jpg',
                    title: '图片1',
                    text : '这里是图片1的说明文字'
                },
                {
                    url  : 'http://ww1.sinaimg.cn/large/d8e32accgw1f69b7ifm4gj20qo0qon3e.jpg',
                    title: '图片2',
                    text : '这里是图片2的说明文字'
                },
                {
                    url  : 'http://ww1.sinaimg.cn/large/d8e32accgw1f62keeub2uj21kw2dc4pa.jpg',
                    title: '图片3',
                    text : '这里是图片3的说明文字'
                },
                {
                    url  : 'http://ww4.sinaimg.cn/large/d8e32accgw1f5vv1j1leij21kw11x4a5.jpg',
                    title: '图片5',
                    text : '这里是图片5的说明文字'
                },
                {
                    url  : 'http://ww4.sinaimg.cn/large/d8e32accgw1f57j2kvgaoj21kw2dcx6p.jpg',
                    title: '图片6',
                    text : '这里是图片6的说明文字'
                },
                {
                    url  : 'http://ww2.sinaimg.cn/large/d8e32accgw1f57j2b7dytj21kw2dc7wh.jpg',
                    title: '图片7',
                    text : '这里是图片7的说明文字'
                },
                {
                    url  : 'http://ww3.sinaimg.cn/large/d8e32accgw1f51ydnrg2mj21kw24c7wh.jpg',
                    title: '图片8',
                    text : '这里是图片8的说明文字'
                },
                {
                    url  : 'http://ww1.sinaimg.cn/large/d8e32accgw1f4yf8z8z16j21kw262nlp.jpg',
                    title: '图片9',
                    text : '这里是图片9的说明文字'
                },
                {
                    url  : 'http://ww3.sinaimg.cn/large/d8e32accgw1f443p0dxd3j21kw2dc7wh.jpg',
                    title: '图片10',
                    text : '这里是图片10的说明文字'
                },
                {
                    url  : 'http://ww2.sinaimg.cn/large/d8e32accgw1f443pbvvj2j21kw2dc4qp.jpg',
                    title: '图片11',
                    text : '这里是图片11的说明文字'
                },
                {
                    url  : 'http://ww2.sinaimg.cn/large/d8e32accgw1f3cxkf16boj21kw11xqgq.jpg',
                    title: '图片12',
                    text : '这里是图片12的说明文字'
                },
                {
                    url  : 'http://ww2.sinaimg.cn/large/d8e32accgw1f3cxl55881j21kw2dc1kx.jpg',
                    title: '图片13',
                    text : '这里是图片13的说明文字'
                }
            ]
        };
  
        this.handlePrototypeImageClick = this.handlePrototypeImageClick.bind(this);
    }


    // 点击图片回调
    handlePrototypeImageClick(index) {
        this.refs.SlideShow.handleModalOpen(index);
    }


    render() {
        return (
            <div className={styles.main}>
                <Gallery imgs={this.state.protoImgs} maxShow={10} onImgClick={this.handlePrototypeImageClick}/>
                <SlideShow imgs={this.state.imageData} ref="SlideShow"/>
            </div>
        );
    }
}

// Render
ReactDOM.render((
            <Main/>
), document.getElementById('main'));