var Slider=function(opt){
    /**
     * 位移量
     */
    this.translate=0;
    /**
     * 上一次鼠标或触碰的位置
     */
    this.pre_translate=0
    /**
     * 需滑动目标元素
     */
    this.target=null;
    /**
     * 滑动元素的宽
     */
    this.width=undefined;
    /**
     * 设置目标元素的宽
     */
    this.parentWidth=0;
    this.set_target_width=function(){
        this.target=opt.target
        var child=this.target.children,_this=this,parent=this.target.parentNode;
        this.parentWidth=parseInt(window.getComputedStyle(parent).width);
        
        Array.prototype.forEach.call(child,function(item,index){
        
            _this.width+=parseInt(window.getComputedStyle(item).width)

        })
        // console.log(this.width-this.lastChildWidth);
        this.target.style.width=this.width+'px';
    }
    /**
     * 初始调用
     */
    this.init=function(){
        this.set_target_width();
        
        this.target.addEventListener('mousedown',this.start.bind(this),false);
        this.target.addEventListener('touchstart',this.start.bind(this),false);
    }
    /**
     * 元素触碰开始
     *  
     */
    this.start=function(e){
        e.preventDefault();
        var x=e.clientX||e.targetTouches[0]['clientX'],_this=this;
        this.target.onmousemove=function(evt){
            _this.move(evt,x)
        }
        this.target.ontouchmove=function(evt){
            _this.move(evt,x);
        }
        document.onmouseup=function(){
            _this.end()
        }
        document.ontouchend=function(){
            _this.end()

        }
    }
    /**
     * 滑动事件
     * @param {*} evt 事件对象
     * @param {*} x  触碰的位置
     */
    this.move=function(e,x){
        e.preventDefault();
        var offsetX=e.clientX||e.targetTouches[0]['clientX'],shift;
        
        shift=this.pre_translate===0?(offsetX-x):(offsetX-this.pre_translate);
    
        this.translate+=shift;
        this.target.style.transform='translateX('+this.translate+'px)';
        this.pre_translate=offsetX;
    }
    /**
     * 触碰结束
     */
    this.end=function(){
        var max=this.width-this.parentWidth;
        if(this.translate>=0){
            this.translate=0
        }else if(this.translate<=-max){
            this.translate=-max;
        }else{
            // this.translate+=shift;
        }
        this.target.style.transform='translateX('+this.translate+'px)';
        this.pre_translate=0;
        this.target.onmousemove=null;
        this.target.ontouchmove=null;
    }
    this.init();
}
export default Slider;