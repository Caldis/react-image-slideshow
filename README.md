react-image-slideshow
=====================
[![npm version](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/react-image-slideshow)
> A simple image slideshow with react.



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
http://u2sk.com/code/react-image-slideshow/
#### Local demo
```shell
git clone https://github.com/Caldis/react-image-slideshow
cd react-image-slideshow
npm install
npm run dev
open http://127.0.0.1:8080/
```
 
 
## Installation
```shell
npm install react-image-slideshow react-portal tween.js --save
```



## Usage
### 1. Import the component (Make sure you already install the ```react-portal``` and ```tween.js```)
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
          url: 'http://ww3.sinaimg.cn/large/d8e32accgw1f6c55xxgp2j20zk0qodry.jpg'
        },
        {
          url: 'http://ww1.sinaimg.cn/large/d8e32accgw1f69b7ifm4gj20qo0qon3e.jpg'
        },
        {
          url: 'http://ww1.sinaimg.cn/large/d8e32accgw1f62keeub2uj21kw2dc4pa.jpg'
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
A Array contain several object of images detail
```jsx
[
  {
    url: 'http://ww3.sinaimg.cn/large/d8e32accgw1f6c55xxgp2j20zk0qodry.jpg'
  },
  {
    url: 'http://ww1.sinaimg.cn/large/d8e32accgw1f69b7ifm4gj20qo0qon3e.jpg'
  },
  {
    url: 'http://ww1.sinaimg.cn/large/d8e32accgw1f62keeub2uj21kw2dc4pa.jpg'
  }
]
```
#### props : ref
Ref the components to call the "handleModalOpen()" method.
```jsx
<SlideShow imgs={this.state.imgsData} ref="SlideShow"/>
```
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
#### switchButton: bool
##### default: true
If false, the switchButton on screen side will not show.
#### switchKey: bool
##### default: true
If false, the key switch will not be able.
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
- You can use the Up/Down/Left/Right to control the image slide.
- The ESC can quit the slideshow overlay too.
- If the ```handleModalOpen([index])``` method not receive the index prop, it will show the first image in 'imgs'.



## Dependencies
- ```react-portal``` (https://github.com/tajo/react-portal)
- ```tween.js``` (https://github.com/CreateJS/TweenJS)



## On the road
- Image with Title/text overlay
- More transition animate
- Non dependence
- Thumbnails



##Changelog
- 1.2.2
Fix the import error     - Now you can easy to import this components from this lib
Fix the no imgs prop err - Now the component will not crush when it's no receive 'imgs' prop
- 1.2.7
Fix the Action Bar always display problems
Fix the error in IE
Add loading animation
- 1.4.0
Fix the position dislocation when zoom on Firefox low version
Add props for disable key switch
- 1.4.1
Fix the bug when using ESC to quit the sildeshow
Add the hover/active effect on switch button

## Credit
- Special thank image of example pages from ```森画谨制```(http://weibo.com/senhuahua)