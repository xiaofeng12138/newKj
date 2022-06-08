
var Scroll=function(opt){
    this.target=null;
    this.timer=null;
    this.animTime=8000;
    this.mergy=function(){
        this.target=opt.target;
        this.animTime=opt.time||this.animTime
    }
    this.start=function(){
        var _this=this;
        
        this.timer=setInterval(function(){
            var child=_this.target.children;
            Array.prototype.forEach.call(child,function(item){
                var isActive=item.className.indexOf('active')>=0;
                if(!isActive){
                    item.className='active';	
                }else{
                    item.className='';		
                }
            })
            
        },this.animTime)
        
    }
    this.stop=function(){
        clearInterval(this.timer);
    }
    this.addEvent=function(){
        var _this=this;
        this.target.addEventListener('mouseenter',this.stop.bind(this),false);
        this.target.addEventListener('mouseleave',this.start.bind(this),false);
    }
    this.mergy();
    this.addEvent();
    this.start();
}
export default Scroll;