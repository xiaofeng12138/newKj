const textIntroduce={
    outCom:`境内外企业：跨境贸易真实数据采集，报关单基本数据自动生成，集装箱提取手续流程再造，全物流链状态查询。`,
    shipCom:`航运企业：订舱、提单、箱动态、船图、船期等全物流链真实数据传输。`,
    baoguan:`报关行：自动获取货主企业进出口数据，报关数据自动生成。`,
    lihuo:`港口理货：船舶靠离泊，港区作业动态等信息传输。真实理货数据反馈。`,
    car:'承运车辆：离港后集装箱装运信息采集。',
    jinrong:`金融支付机构：跨境贸易真实资金流信息采集。`,
    daili:`货运代理：全物流链状态查询，集装箱提取手续，网上办理，真实货主信息提供。`
}
const text={
    state:{
        currentText:textIntroduce.outCom
    },
    mutations:{
        set_Text(state,type){
            state.currentText=textIntroduce[type] 
        }
    },
    actions:{
        ouput:({commit})=>{  
            commit(state.currentText)
        }
    }
}
export default text