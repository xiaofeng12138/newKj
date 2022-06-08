<template>
    <div class='wrap'>
         <div v-if="showImgWrap" class="showImg">
            <img class="bigImg" :src="imgSrc" @click="rotate" id="bigImg" >
        </div>
         <Icon v-if="showImgWrap"  type="md-close" @click="hideImg" class="icon-close"></Icon>
         <div v-else>
              <Row v-for="(item, index) in row" :key="index" class="expand-row">
                    <Col span="6" style="margin-right:10px">
                    <!-- {{item}} -->
                        <span class="expand-name">[展商名称]:</span><br/>
                        <span class="expand-name-value" @click="showImg(item)">{{item.EXHIBITOR}}</span>
                    </Col>
                    <Col span="4">
                        <span class="expand-name">[国家/地区]:</span><br/>
                        <span class="expand-value">{{item.COUNTRYCNNAME}}</span>
                    </Col>
                    <Col span="4">
                        <span class="expand-name">[联系电话]:</span><br/>
                        <span class="expand-value">{{item.TEL ? item.TEL:'空' }}</span>
                    </Col>
                    <Col span="6">
                        <span class="expand-name">[采集照片]:</span><br/>
                        <template v-if="item.imglist.length> 0">
                            <div v-for="(ele,index) in item.imglist" :key="index">
                                <img :src="`data:image/patrol;base64,${ele.FILEBASE64}`" style="display:block;width:200px;height:100px;margin-top:20px" @click='openImg(ele.FILEBASE64)'/>
                            </div>
                        </template>
                         <template v-else>
                            <span class="expand-value">空</span>
                        </template>
                    </Col>
                    <Col span="3">
                        <span class="expand-name">[后续流向]:</span><br/>
                         <span class="hx" @click="openModal(item.EXHIBITORID)">流向及明细</span>
                    </Col>
                </Row>
        </div>

        <Modal
                v-model="toggleModal"
                width = "1500px"
                class-name='vertical-center-modal forbidBody'
                :footer-hide = true
                :mask-closable = "false"
                
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="toggleModal=false" size='30' />
            </p>
            <div class="ttt">
                <h1>展品明细及流向监控</h1>
               <TableList :zsId='exhibitorid' />
            </div>
        </Modal>

        
    </div>
</template>

<script>
import TableList from './flowlist'
    export default {
        name: "expand",
        props:['row'],
        components:{TableList},
        data(){
            return{
                showImgWrap:false,
                imgSrc:'',
                angle:0,
                toggleModal:false,
                exhibitorid:'',
                customModel:false,
                customId:"",
            }
        },
        methods: {
            showImg(item) {
                this.$emit('showImgs', item.EXHIBITOR)
            },
            openImg(e){
                this.imgSrc ='data:image/patrol;base64,'+ e
                this.showImgWrap =true
            },
            //隐藏弹窗
            hideImg(){
                this.showImgWrap =false
            },
            rotate() {
                let img = document.getElementById('bigImg');
                this.angle += 90;
                img.style.transform = `rotate(${this.angle}deg)`
            },
            openModal(params){
                this.toggleModal = true
                this.exhibitorid = params
            },
        }
    }
</script>

<style lang="scss" scoped>
.expand-row {
    font-size: 18px
}
.expand-name {
    color: #00bdfa
}
.hx{
    cursor: pointer;
    color:#FFDF18 ;
}
.expand-name-value {
    cursor: pointer;
    &:hover {
        color: #11ff55
    }
}
.wrap {
  height: 300px;
  width:100%;
  position: relative;
  .showImg {
    position: absolute;
    top: 0%;
    left: 50%;
    width:400px;
    height:250px;
    transform: translateX(-50%);
    z-index: 999;
    .bigImg{
        display:block;
        width:400px;
        height:250px;
    }
  }
  .icon-close {
    position: absolute;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    top: -8%;
    right: 0%;
  }
}
 .ttt{
        width: 1400px;
        height: 700px;
        margin: auto;
        h1{
            text-align: center;
            margin-top: 10px;
            font-size: 20px;
            color: #fff;
        }
     }
</style>