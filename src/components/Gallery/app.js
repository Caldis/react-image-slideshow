// Gallery组件

// imgs: 图片Url列表
// 类型: Array
// 可选: 否

// lineImgs: 每行图片数目
// 类型；int
// 可选：是，默认3

// maxShow: 最大图片数目
// 类型: int
// 可选: 是, 默认3

// onImgClick: 点击图片的回调函数
// 类型: function
// 可选: 是
// 参数: index

import React from 'react'
import styles from './app.css';

class Gallery extends React.Component{
    constructor(props) {
        super(props);

        this.handleImageClick = this.handleImageClick.bind(this);
    }

    componentWillUnmount() {}

    componentDidMount() {}

    handleImageClick(index) {
        if (typeof this.props.onImgClick != 'function') {
            return;
        } else {
            this.props.onImgClick(index);
        }
    }

    render() {
        let lineImgs = 100/this.props.lineImgs + '%';

        return (
            <div className={styles.eGallery}>

                {
                    this.props.imgs ? this.props.imgs.map((tile,index)=> {
                        if (this.props.maxShow) {
                            if (index < this.props.maxShow) {
                                return (
                                    <div
                                        key={index}
                                        className={styles.eGalleryimageWrapper}
                                        onClickCapture={() => this.handleImageClick(index)}
                                        style={{ width:lineImgs }}
                                    >
                                        <img className={styles.eGalleryimage} src={tile}/>
                                    </div>
                                );
                            }
                        } else {
                            return (
                                <div
                                    key={index}
                                    className={styles.eGalleryimageWrapper}
                                    onClickCapture={() => this.handleImageClick(index)}
                                    style={{ width:lineImgs }}
                                >
                                    <img className={styles.eGalleryimage} src={tile}/>
                                </div>
                            );
                        }
                    }) : null
                }

            </div>
        )
    }
}

Gallery.defaultProps = {
    onImgClick: {},
    maxShow: null,
    lineImgs: 5,
    imgs: []
};

Gallery.propTypes = {
    imgs: React.PropTypes.array.isRequired
};

export default Gallery

// TODO
// 瀑布流排序
// IE10兼容
// 懒加载
