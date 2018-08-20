/**
 * Created by Administrator on 2018/8/10
 */
window.onload = function () {
    document.querySelector('.contentLeft').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    document.querySelector('.contentRight').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    new IScroll(document.querySelector('.contentLeft'), {
        scrollX: false,
        scrollY: true
    });
    new IScroll(document.querySelector('.contentRight'), {
        scrollX: false,
        scrollY: true
    });
}