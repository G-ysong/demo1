/**
 * Created by Administrator on 2018/8/8
 */
window.onload = function () {
    /*顶部搜索*/
    search();
    /*轮播*/
    banner();
    /*倒计时*/
    // setInterval("downTime(2018, 8, 10, 18, 0, 0)", 1000)
    downTime(2018, 8, 10, 18, 48, 40)
};
let search = function () {
    let searchBox = document.querySelector('.jd_search_inner');
    let banner = document.querySelector('.jd_banner');
    let height = banner.offsetHeight;

    /*监听特免滚动事件*/
    window.onscroll = function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        }else {
            opacity = 0.85
        }

        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
};
let banner = function () {
    /*轮播图*/
    let banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    let width = banner.offsetWidth;
    /*图片容器*/
    let imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    let pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    let points = pointBox.querySelectorAll('li');



    let removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    let addTransition = function () {
        /*加过度*/
        imageBox.style.transition = 'all 0.3s';
        imageBox.style.webkitTransition = 'all 0.3s';
    };
    let setTranslateX = function (translateX) {
        /*取消过度*/
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };
    /*程序的核心 index */
    let index = 1;
    let timer =  setInterval(function () {
        index ++;
        addTransition();
        setTranslateX(-index * width);
    }, 2000);
    imageBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        }else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setPoint();
    });
    /*下方的点*/
    let setPoint = function () {
        for (let i = 0; i < points.length; i++) {
            points[i].classList.remove('now')
        }
        points[index - 1].classList.add('now')
    };

    /*绑定触摸滑动事件*/
    let startX = 0;  //定义开始触摸的位置
    let distanceX = 0; //滑动距离
    let isMove = false;
    imageBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        /*记录滑动过程当中的X坐标*/
        let moveX = e.touches[0].clientX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        let translateX = -index * width + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend', function (e) {
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * width)
            } else {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index * width)
            }
        }
        /*参数重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 2000);
    })
};
let downTime = function (year, month, day, hour, minute, second) {
    /*倒计时的时间*/
    let timer = setInterval(function () {
        let time = new Date(year, month-1, day, hour, minute, second) - new Date();
        time = time <= 0 ? 0 : time;
        let spans = document.querySelector('.time').querySelectorAll('span');
        let h = parseInt(time / 1000 / 60 / 60);
        let m = parseInt(time /1000 % 3600 / 60);
        let s = parseInt(time / 1000 % 60);

        spans[0].innerHTML = '' + Math.floor(h / 10);
        spans[1].innerHTML = '' + h % 10;
        spans[3].innerHTML = '' + Math.floor(m / 10);
        spans[4].innerHTML = '' + m % 10;
        spans[6].innerHTML = '' + Math.floor(s / 10);
        spans[7].innerHTML = '' + s % 10;
    }, 1000)
    // if (time <=0 )clearInterval(timer)
    // let timer = setInterval(function () {
    //     time --;
    //     initTime(time)
    // }, 1000);
    // if (time <= 0) {
    //     clearInterval(timer)
    // }
};

