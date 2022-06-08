// import request from '../../until/requset'
const options={
    backgroundColor:'transparent',
    geo:{
        top: '10%',
        left:'10%',
        bottom:'70%',
        right:'70%',
        height: '70%',
        width:'70%',
        map: 'world',
        // boundingCoords:[
        //     [90,90],
        //     [-90,-90]
        // ],
        zoom:1.2, 
        label:{
            emphasis:{
                color:'#fff'
            }
        },
        itemStyle: {
            normal:{
                borderColor: '#294DA0',
                color:'#fff',
                borderWidth:1.1,
                areaColor: '#8FC7F3',
            },
            emphasis:{
                areaColor: '#6AAADD',
                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
                // shadowBlur: 20,
                // borderWidth: 0,
                // color:'#fff',
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },     
        roam: true
    },
    tooltip : {
        trigger: 'item',
        backgroundColor: '#fff',
        borderColor: '#CCCCCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        show:true,
        padding:16,
        showContent:true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        

    },
    
    series: [
        {
            type: 'map',
            zoom:1,
            roam: true,
           
        },
        {
           type: 'effectScatter',
           coordinateSystem: 'geo',
           symbol:'circle',
           symbolSize:10,
           zlevel:3,
           label:{
                show:false,
                // formatter:'地点',
                position:'top'
           },
           itemStyle: {
              normal: {
                 color: '#CAA40D',
                 borderColor:'#fff',
                 borderWidth:'2'
                }
           },
           emphasis:{
               label:{
                   show:true

               },
               itemStyle:{
                color:'#F1BD6C'
               }
           },
           tooltip : {
            showContent:true,
            formatter: function (params, ticket,eventClick) {
                if(params.seriesType=='effectScatter'){
                    var res = "<div style='border-radius: 4px;line-height:28px;color:#000;font-size:12px'>";
                    var arrTime=params.data.time.split(/[,|，]/g)
                    var arrEvent=params.data.zwName.split(/[,|，]/g)
                    arrTime.forEach((item,i) => {
                        res+='<b style="display:inline-block;width:120px">'+arrEvent[i]+'</b><span>'+item+'</span><br/>'
                    });
                    
                    res += '</div>'
                    return res;
                }
                
            }
            },
           data: [],
        },
        {
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            polyline: true,
            effect: {
                show: true,
                period: 45,
                color:'#FFB62B',
                trailLength: 0,
                symbol:'path:// M943.210646,634.744168 L943.210646,614.616246 L932.192289,614.616246 L932.192289,634.750298 C931.90232,634.491706 931.71973,634.115257 931.71973,633.696162 C931.71973,633.68683 931.719823,633.677499 931.720008,633.668169 L931.720008,612.013326 C931.720008,606.734754 936.482459,604.107589 937.715744,604.107589 C938.949029,604.107589 943.711481,606.734754 943.711481,612.013326 C943.711481,615.532374 943.711481,622.750655 943.711481,633.668169 C943.702963,634.097698 943.510723,634.481163 943.210646,634.744168 Z M932.192289,613.039948 L932.192289,613.565381 L943.210646,613.565381 L943.210646,613.039948 L932.192289,613.039948 Z M932.693123,630.379232 L942.709812,630.379232 L942.709812,635.108128 L932.693123,635.108128 L932.693123,630.379232 Z M932.693123,615.001164 L942.709812,615.001164 L942.709812,628.802934 L932.693123,628.802934 L932.693123,615.001164 Z M932.693123,629.328366 L942.709812,629.328366 L942.709812,629.848051 L932.693123,629.848051 L932.693123,629.328366 Z M935.211333,607.60765 C934.659039,607.60765 934.211316,608.055373 934.211316,608.607667 C934.211316,609.159962 934.659039,609.607685 935.211333,609.607685 L940.211628,609.607685 C940.763923,609.607685 941.211646,609.159962 941.211646,608.607667 C941.211646,608.055373 940.763923,607.60765 940.211628,607.60765 L935.211333,607.60765 Z',
                symbolSize:[11,32], 
            },
            data:[]
        },
        {
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            polyline: true,
            lineStyle: {
                normal: {
                    color: '#FAC705',
                    width: 2,
                    opacity: 1,
                    type:'dotted'
                }
            },
            data: []
        }
    ]

}
export default options
function eventClick(){
    
}