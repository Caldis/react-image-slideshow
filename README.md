react-image-slideshow
=====================
[![npm version](https://img.shields.io/npm/v/react-portal.svg?style=flat-square)]()
[![Build Status](https://travis-ci.org/tajo/react-portal.svg?branch=master)]()

> A simple image slideshow with react.
> Just pass the imageList, then call the open method, and, yay !



## Features
- Lazy load
- Smooth Zoom
- Key to control
- Smooth Animation
- Full screen image slideshow
- Directly Download Image
- All function customizable
- Easy to use



## Demo
#### Live demo 
Almost done
#### Local demo
```shell
git clone https://github.com/Caldis/react-image-slideshow
cd react-image-slideshow
npm install
npm run dev
open http://127.0.0.1:8080/
```
#### Or directly open build file in dir ```/example/index.html```
 
 
## Installation
Almost done
```shell
npm install react-image-slideshow --save
```



## Usage
### 1. Import the component
```jsx
    import SlideShow from 'react-image-slideshow';
```
### Setup the image data
```jsx
    constructor(props){
        super(props);
        this.state = {
            imgsData:[
                {
                    url  : 'http://ww3.sinaimg.cn/large/d8e32accgw1f6c55xxgp2j20zk0qodry.jpg'
                },
                {
                    url  : 'http://ww1.sinaimg.cn/large/d8e32accgw1f69b7ifm4gj20qo0qon3e.jpg'
                },
                {
                    url  : 'http://ww1.sinaimg.cn/large/d8e32accgw1f62keeub2uj21kw2dc4pa.jpg'
                }
            ]
        }
    }
```
### 2. Place the component, pass in the image data and ref name
```jsx
    render() {
        return (
            <div className={styles.main}>
                <SlideShow imgs={this.state.imgsData} ref="SlideShow"/>
            </div>
        );
    }
```
### 3. Call the open method to open the slideshow overlay, yay!
```jsx
    handleSlideshowOpen(index) {
        this.refs.SlideShow.handleModalOpen(index);
    }
```



## Documentation - props
### Always required
#### props : imgs
#### props : ref
Ref the components to call the "handleModalOpen()" method.
#### func : handleModalOpen(index)
##### Pass in the index num to control the initial image in the slideshow
```jsx
    handleSlideshowOpen(index) {
        this.refs.SlideShow.handleModalOpen(index);
    }
    render() {
        return (
            <div className="main">
                <SlideShow imgs={imgUrlList} ref="SlideShow"/>
            </div>
        );
    }
```
### Optional
#### lazyLoad: bool
##### default: true
Save the network
#### infinitySwitch: bool
##### default: true
If false, the image will back to head after you view to end.
#### downloadButton: bool
##### default: true
If false, the download button will not show.
#### zoomButton: bool
##### default: true
If false, the zoom button will not show.
#### indicator: bool
##### default: true
If false, the sequence indicator of image will not show.



## Tips & Tricks
- Zoom is cool, try it!
- You can use the Up/Down/Left/Right to control the image slide.
- The ESC can quit the slideshow overlay too.
- If the ```handleModalOpen([index])``` method not receive the index prop, it will show the first image.



## Dependencies
#### react-portal(https://github.com/tajo/react-portal)
#### tween.js(https://github.com/CreateJS/TweenJS)



## On the road
- Image with Title/text overlay
- More transition animate
- Thumbnails


## Credit
- Special thank image of example pages from ``` 森画谨制 ``` (http://weibo.com/senhuahua)
