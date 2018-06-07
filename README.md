### vue开发的音乐web-app
已经成功部署线上啦~，[音乐web-app](http://47.93.248.109)
[源码在这,小妹在此求个star](https://github.com/jingrushen/vue-music-app)
### 项目描述
vue全家桶开发仿网易云音乐的web-ap

![show.jpg](https://upload-images.jianshu.io/upload_images/9116788-69044852fc5bc412.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 项目目的
学习vue的项目实战课程，认识到了很多关于模块化开发思想，复用代码，vue等知识点，继续努力加油！

#### 前台
* vue 前台用户界面展示
* vue-router 为单页面提供路由系统，使用路由懒加载实现组件的异步加载
* vuex Vue组件数据状态共享
* axios 异步请求api数据
* es6 箭头函数，解构赋值，class类...
* localStorage 搜索记录存储
* Eslint 代码规范

#### 后台
* NeteaseCloudMusicApi: 网易云音乐NodeJs版Api，为项目提供音乐数据

#### 使用的库：
* better-scroll: 实现移动端滚动需求
* fastclick: 消除移动端点击事件的300ms延迟
* border.css: 消除Retina屏幕 1px border 在不同dpr下的显示
* pinyin: 取歌手数据首字母
* vue-lazyload: 实现图片的懒加载

### 实现的功能
##### 导航分成四个区块：首页 | 独家歌手 | 排行榜 | 搜索
##### 首页
* 图片轮播
* 推荐歌单组件
##### 独家歌手
* 获取热门歌手
* 头字母索引导航
* 顶部显示当前字母索引
##### 排行榜
* 获取热门歌单
* 上拉更新
##### 搜索
* 热门搜索关键词
* localStorage保存搜索历史
* 输入字符串获取搜索数据（此处用到函数节流）
* 下拉加载
##### 其他页面
##### 歌手详情页 | 歌单详情页
* 随机播放歌手全部歌曲
* 可添加歌手歌曲到播放列表
##### 播放器内核
* 暂停开始播放
* 前后切换歌曲
* 显示播放列表
* 可切换播放模式( 随机播放， 顺序播放， 循环播放)
* 拖动或点击播放进度条跳到指定时间
* 从后台获取歌词进行解析
* 播放当前歌词居中显示高亮
### 项目遇到的一些问题
在播放器上遇到的坑最多，最复杂也是这个，所以说说吧~
* 关于HTML5 的 audio标签
当不断触发切换歌曲的时候，audio会报错：`Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().` 或者是
 `Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.`
大致的意思是play() 请求被 pause() 或者 新的加载请求中断
原因：audio的 play() 方法调用会返回Promise，如果成功，Promise就会执行并且audio的playing同时触发事件，如果播放失败，Promise就会拒绝，显示失败原因
解决：既然返回的是promise对象，那就可以用then方法来选择播放媒体准备之前，播放功能不会执行
其他方法：
1. 监听audio的loadedmetadata事件，判断在完全音频的元数据加载完毕之后才触发播放功能
2. 监听audio的canplay事件，确保在已经有足够的媒体数据才触发播放功能
参考文章
https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events

* ref是的渲染事件以及不是响应式
要取得$refs必须在dom渲染完毕的时候才能获取，所以可以在mounted 钩子或者nextTick()的回调函数中获取，但是如果碰到的ref是动态渲染的，也就是数据是由父组件通过异步获取数据(data)传递给子组件的时候才会渲染相关的dom节点，在这种情况下，可以使用watch对象，观察data的变化情况，在这个回调函数中便能获得ref数据；ref不是响应式的，所以如果动态添加相关的ref的节点，添加的节点的索引会出现在尾端，所以只能通过this.$refs去获取这些节点数组的父元素，通过$el.children获取所有子dom节点

* audio标签在移动端首次点击歌曲不能自动播放的问题
原因：移动端为了省用户流量，会对自动播放音频，视频做限制，所以当第一次播放audio的时候只能由用户手动触发audio.paly()事件才能播放
解决：思前想后，第一，在各种生命周期钩子里使用audio.play()是没用的，原因的获取歌曲的相关数据(url 等)这些都是异步行为，第二，使用autoplay="autoplay"也没有效果；
网上提供的解决方法：（一种hack做法 ,,ԾㅂԾ,,）
绑定一次touchstart()事件，当用户触摸屏幕时，回调中调用audio.play()方法
### 项目总结
第一次这么系统的完成一个作品，不过还有很多功能没有完善，后期再继续完善完善，例如用户登陆功能，用户评论。。。立个flag先。。。在整个学习过程中，学到了很多关于移动端开发的东西，包括布局方面(更加加深了弹性布局和定位布局相关知识点)，前后端的分离，前端如何获取数据转换成需要的数据等等，再遇到问题的时候，应该先找到问题根源，然后多查查着相关资料，出现问题的原因，想想解决办法，多试试看能不能，再考虑优化解决方法。。。


可以扫码观看啦~

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
