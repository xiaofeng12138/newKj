<template>
    <div class="tariff">
        <div class="header" ref='header' v-if="alertArr !=''">
            <img src="./img/qy_common_common_icon_msg.png" alt="" class="msgimg">
            <span>您有未反馈的关税业务关企交流项目（项目编号{{alertArr.projectid}}），发起业务科室为{{alertArr.businesssection}}，请尽快处理。
                 <Button type="primary" size ='default' style="margin-right:5px" @click="lookOver">立即查看</Button>
            </span>
            <img src="./img/hg_common_common_btn_close.png" alt="" class="closeimg" @click="close">
        </div>
        <h2>关税业务关企交流平台</h2>
        <div class="query" >
            <div class="copName"> 联系事项：<Input size="large" placeholder="请输入联系事项" style="width:60%" v-model="searchType.contact"/></div>
            <div class="uscCode"> 报关单号：<Input size="large" placeholder="请输入报关单号" style="width:60%" v-model="searchType.bgdNo"/></div>
            <div class="uscCode"> 业务关员：<Input size="large" placeholder="请输入业务关员" style="width:60%" v-model="searchType.officer"/></div>
            <div class="uscCode"> 反馈状态：<Select style="width:50%" v-model="searchType.status"><Option value="">全部</Option> <Option value="0"> 初始状态</Option><Option value="1"> 待反馈</Option><Option value="2"> 已反馈</Option><Option value="3"> 完成</Option></Select></div>
            <Button type='primary' size='large' @click="queryInfo(1)">查询</Button>
        </div>

        <Table border :columns = 'columns' :data='data' class="self">
            <template  slot-scope="{row}" slot="action"> 
                <Button v-if="row.status =='0'" type="primary" size ='large'  @click="look(row)">初始状态</Button>
                <Button v-else type="primary" size ='large'  @click="look(row)">查看</Button>
            </template>
         </Table>
        <!-- 分页页面 -->
         <Page :total="total" :page-size=20  @on-change="changePage" show-total />


         <!-- 显示弹出框 -->
        <Modal
            v-model="showModal"
                width = "900px"
                :footer-hide = true
                :mask-closable = "false"
                class="showModall"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="showModal=false" size='30' />
            </p>
            <p style="text-align:center;color:#000;font-size:20px;font-weight:bold">关税业务关企交流项目</p>
            <template class="FormTable">
                 <Row>
                    <i-col span="12" style="display:flex;font-size:12px;padding-top:2px">
                        <p style="font-size: 14px;color: #333333;">项目编号:</p> 
                        <p style="line-height:24px;margin-left:10px;color: #505050;"> {{dataInfo.projectid}} </p>
                    </i-col>
                     <i-col span="12" style="font-size:12px;padding-top:2px;text-align:right">
                        提交时间：{{dataInfo.recUpdDt}}
                    </i-col>
                </Row>
                <Row>
                    <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">联系企业海关代码</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.cscompanycode}}</li>
                    </i-col>
                     <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">联系事项</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:25px;list-style:none;color:#000;border:1px solid #F7F3F7"> {{dataInfo.contactitem}}</li>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">报关单号</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.certificateno}}</li>
                    </i-col>
                     <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">商品项号</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.goodsitem}}</li>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">业务科室</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7"> {{dataInfo.businesssection}}</li>
                    </i-col>
                     <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">业务关员</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.businessofficer}}</li>
                    </i-col>
                </Row>
                <!--海关资料-->
                <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:50px;width:15%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">海关上传资料</li>
                        <li style="height:50px;width:85%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">
                             <p v-if="feedbackList.customsFilesName != '' ">{{feedbackList.customsFilesName}}
                                  <Button type="primary" style="margin-left:10px" @click="downFile">点击下载文件</Button>
                              </p>
                              <p v-else>
                                  暂无资料
                              </p>
                        </li>
                    </i-col>
                </Row>
                <!--海关留言-->
                 <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:100px;width:15%;background-color:#F7F7F7;text-align:center;line-height:100px;list-style:none;color:#000;border:1px solid #F7F3F7">海关留言</li>
                        <li style="height:90px;width:85%;list-style:none;color:#000;">
                                <Input v-if="feedbackList.customsLeavemsg.length > 0"  :rows="4" :autosize="{maxRows:4,minRows: 4}" v-model="feedbackList.customsLeavemsg" type="textarea" disabled/>
                                <Input v-else :rows="4" :autosize="{maxRows:4,minRows: 4}" type="textarea" disabled placeholder='暂无留言'/>
                        </li>
                    </i-col>
                </Row>
                <!--企业上传资料-->
                 <div style="border: 2px solid #3478FF;">
                    <Row>
                        <i-col span="24" style="display:flex;">
                            <li style="height:50px;width:15%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">企业提交资料</li>
                            <li style="height:50px;width:85%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">
                           
                                    {{uploadFile.fileName}}<Button type="primary" icon="ios-cloud-upload-outline" @click="InfoModal=true">选择文件</Button>
                             
                            </li>
                        </i-col>
                    </Row> 
                    
                <!--企业留言-->
                    <Row>
                        <i-col span="24" style="display:flex;">
                            <li style="height:98px;width:15%;background-color:#F7F7F7;text-align:center;line-height:98px;list-style:none;color:#000;border:1px solid #F7F3F7">企业留言</li>
                            <li style="height:90px;width:85%;list-style:none;color:#000;">
                                <Input :rows="4" :autosize="{maxRows:4,minRows: 4}" v-model="uploadFile.qyMessage" type="textarea" />
                        </li>
                        </i-col>
                    </Row> 
                </div>
              
                <Row>
                    <i-col span="24" style="display:flex;margin-top:15px;">
                        <li style="height:20px;width:100%;line-height:20px;list-style:none;color:#999;color:#f00">注：企业提交资料和企业留言至少填一项，且文件上传只能上传一个大小不超过4MB后缀名为.zip的压缩包文件</li>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="24" style="display:flex;margin-top:15px;">
                        <li style="height:50px;width:50%;line-height:50px;text-align:right;list-style:none;">
                            <Button   style="width:100px;margin-right:25px" @click="showModal=false">取消</Button>
                        </li>
                        <li style="height:50px;width:50%;list-style:none;line-height:50px;">
                             <Button type="primary"  style="width:100px;margin-left:25px" @click="submit">提交</Button>
                        </li>
                    </i-col>
                </Row>
            </template>  
        </Modal>

         <!-- 已反馈弹出框 -->
        <Modal
            v-model="respModal"
                width = "950px"
                :footer-hide = true
                :mask-closable = "false"
                class="showModall"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="respModal=false" size='30' />
            </p>
            <p style="text-align:center;color:#000;font-size:20px;font-weight:bold">关税业务关企交流项目</p>
            <template class="FormTable">
                 <Row>
                    <i-col span="12" style="display:flex;font-size:12px;padding-top:2px">
                        <p style="font-size: 14px;color: #333333;">项目编号:</p> 
                        <p style="line-height:24px;margin-left:10px;color: #505050;"> {{dataInfo.projectid}} </p>
                    </i-col>
                     <i-col span="12" style="font-size:12px;padding-top:2px;text-align:right">
                        企业提交时间：{{feedbackList.recUpdDt}}
                    </i-col>
                </Row>
                <Row>
                    <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">联系企业海关代码</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.cscompanycode}}</li>
                    </i-col>
                     <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">联系事项</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:25px;list-style:none;color:#000;border:1px solid #F7F3F7"> {{dataInfo.contactitem}}</li>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">报关单号</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.certificateno}}</li>
                    </i-col>
                     <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">商品项号</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.goodsitem}}</li>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">业务科室</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7"> {{dataInfo.businesssection}}</li>
                    </i-col>
                     <i-col span="12" style="display:flex;">
                        <li style="height:50px;width:30%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">业务关员</li>
                        <li style="height:50px;width:70%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{dataInfo.businessofficer}}</li>
                    </i-col>
                </Row>
                <!--海关上传资料-->
                 <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:50px;width:15%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">海关上传资料</li>
                        <li style="height:50px;width:85%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">
                             <p v-if="feedbackList.customsFilesName  != '' ">{{feedbackList.customsFilesName}}
                                   <!-- <Button type="primary" style="margin-left:10px" @click="downFile">点击下载文件</Button> -->
                              </p>
                              <p v-else>
                                  暂无资料
                              </p>
                        </li>
                    </i-col>
                </Row>
                
                <!--海关留言-->
                 <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:100px;width:15%;background-color:#F7F7F7;text-align:center;line-height:100px;list-style:none;color:#000;border:1px solid #F7F3F7">海关留言</li>
                        <li style="height:90px;width:85%;list-style:none;color:#000;">
                                <Input v-if="feedbackList.customsLeavemsg.length > 0"  :rows="4" :autosize="{maxRows:4,minRows: 4}" v-model="feedbackList.customsLeavemsg" type="textarea" disabled/>
                                <Input v-else :rows="4" :autosize="{maxRows:4,minRows: 4}" type="textarea" disabled placeholder='暂无留言'/>
                        </li>
                    </i-col>
                </Row>
                
                <!--企业上传资料-->
                    <Row>
                        <i-col span="24" style="display:flex;">
                            <li style="height:50px;width:15%;background-color:#F7F7F7;text-align:center;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">企业提交资料</li>
                            <li v-if="feedbackList.enterpriseFilesName != ''" style="height:50px;width:85%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">{{feedbackList.enterpriseFilesName}}</li>
                            <li v-else style="height:50px;width:85%;padding-left:20px;line-height:50px;list-style:none;color:#000;border:1px solid #F7F3F7">暂无资料</li>
                        </i-col>
                    </Row> 
                    
                <!--企业留言-->
                 <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:98px;width:15%;background-color:#F7F7F7;text-align:center;line-height:98px;list-style:none;color:#000;border:1px solid #F7F3F7">企业留言</li>
                        <li style="height:90px;width:85%;list-style:none;color:#000;">
                            <Input v-if="feedbackList.enterpriseLeavemsg.length > 0" :rows="4" :autosize="{maxRows:4,minRows: 4}" v-model="feedbackList.enterpriseLeavemsg" type="textarea"  disabled />
                            <Input v-else :rows="4" :autosize="{maxRows:4,minRows: 4}" type="textarea" disabled placeholder='暂无留言'/>
                        </li>
                    </i-col>
                </Row> 
                <!-- <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:100px;width:100%;line-height:50px;list-style:none;z-index=999">
                           历史记录：<span ref="showdate" @click="changeDate(item,index)" v-for = '(item,index) in qysubmitAlldata' :class="{'active':index == isActive}" :key="index" style="display:inline-block;line-height:30px;width:150px;height:30px;font-size:10px;text-align:center;margin-right:20px;border:1px solid #ccc;cursor: pointer;">{{item.recUpdDt}}</span>     
                        </li>
                    </i-col>
                </Row> -->
                <Row>
                    <i-col span="24" style="display:flex;">
                        <li style="height:50px;width:100%;line-height:50px;text-align:center;list-style:none;">
                            <Button  type="primary" style="width:100px;margin-right:25px" @click="respModal=false">关闭</Button>
                        </li>
                    </i-col>
                </Row>
            </template>  
        </Modal>

        <!-- 文件上传Modal -->
         <Modal
                v-model="InfoModal"
                width="900"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="InfoModal=false" size='30'/>
                </p>
                <div class="upload">
                <h3>
                     提示:上传一个不超过4MB后缀名为.zip的压缩包
                    <!-- <Button type="primary" v-if="data1.length>0" @click="upload" icon="ios-cloud-upload-outline" size='large'>全部上传</Button> -->
                        <Upload  action="a" v-if="data1.length>0"
                            multiple
                            :before-upload='beforeUpload'
                            :max-size='fileSize'
                            :on-exceeded-size='outSize'
                            >
                            <Button icon="plus-round" size='large'>添加文件</Button>
                        </Upload>
                        <Button type="error" v-if="data1.length>0" @click="reChocie" style="margin-right:-32px" icon="information-circled" size='large'>重新选择</Button>
                    </h3>
                    <div class="tableBox" v-if="data1.length>0">
                        <Table :columns="columns1" :data="data1" class="self" style="width:100%;margin-top:15px"></Table>
                    </div>
                    <div class="upfile" v-if="data1.length<=0">
                        <h3 style="margin-bottom:16px">暂未上传</h3>
                        <Upload
                            action='a'
                            multiple
                            :before-upload='beforeUpload'
                            :max-size='fileSize'
                            :on-exceeded-size='outSize'
                            >
                            <Button  icon="ios-cloud-upload-outline" size='large'>上传文件</Button>
                            <!-- <Button style="margin-left:16px" type="ghost" icon="ios-cloud-upload-outline" size='large'>上传原始文件(pdf)</Button> -->
                        </Upload>
                    </div>
                    <Modal
                        title="格式错误"
                        v-model="modal"
                        :closable="false"
                        :scrollable='true'
                        class="self"
                        :mask-closable="false">
                        <p ref='errorInfor'  class="modalcontent"></p>
                    </Modal>
            </div>
        </Modal>
    </div>
</template>

<script>
import {fileUp} from '@/api/http'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import axios from "axios";
import cfg from '@/until/config'

export default {
    props:{
        pdfEnter:{
            type:String
        },
        uploadUrl:{
            type:String
        },
        interType:{
            type:String,
        },
        fileType:{
            type:String,
            default:''
        },
        fileSize:{
            type:Number,
            default:4096
        }
    },
    data(){
        return{
            alertArr:'',
            feedbackList:{
                busOperatetime: "",
                cusOperatetime: "",
                customsFiles: "",
                customsLeavemsg: "",
                enterpriseFiles: "",
                enterpriseLeavemsg: "",
                projectid: "",
                recUpdDt: "",
                uploadInd: "",
                uuid: "",
            },
            isActive:0,
            total:0,
            respModal:false,
            dataInfo:{}, //海关数据存储

            //文件上传参数
            InfoModal:false,
            modal:false,
            filelist:[],
            columns1:[
                        {
                            title: '文件名',
                            key: 'name'
                        },
                        {
                            title: '上传时间',
                            key: 'date'
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width:100,
                            render:(h,params)=>{
                                const that=this
                                return  h('Poptip', {
                                        props: {
                                        confirm: '',
                                        placement:'top-end',
                                        title:"您确认删除这条内容吗？"
                                        },
                                        style:{
                                            textAlign:'left'
                                        },
                                        on:{
                                            'on-ok':()=>{
                                                this.data1.splice(params.index,1)
                                                this.filelist.splice(params.index,1)
                                                this.uploadFile.fileName ='';
                                            }
                                        }
                                    },[
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'large'
                                        }
                                    },'删除')])

                            }
                         },
                        ],
            data1: [],
            
            showModal:false,
            uploadFile:{
                qyMessage:'',
                fileUrl:'',
                fileName:''
            }, //企业留言部分
            searchType:{
                contact:'',
                bgdNo:'',
                officer:'',
                status:'',
            },
            columns:[
                 {
                    title:'序号',
                    align:'center',
                    width:'100',
                    render:(h,params,index)=>{
                          return h('span',(params.index)+1)
                        }
                },
                {
                    title:'项目编号',
                    align:'center',
                    key:'projectid'
                },
                {
                    title:'联系事项',
                    align:'center',
                    key:'contactitem'
                },
                {
                    title:'报关单号',
                    align:'center',
                    key:'certificateno'
                },
                {
                    title:'商品项号',
                    align:'center',
                    key:'goodsitem'
                },
                {
                    title:'业务科室',
                    align:'center',
                    key:'businesssection'
                },
                {
                    title:'业务关员',
                    align:'center',
                    key:'businessofficer'
                },
                {
                    title:'反馈状态',
                    align:'center',
                    key:'statu',
                    render:(h,params)=>{
                          let tmpStr = "";
                          if(params.row.status == 0){
                            tmpStr="初始状态";
                          }else if(params.row.status== 1){
                            tmpStr="待反馈";
                          }else if(params.row.status== 2){
                            tmpStr="已反馈";
                          }else if(params.row.status== 3){
                            tmpStr="完成";
                          }
                          return h('span',{
                              style:{
                                 color: (params.row.status==2)? "#BDBABD" : (params.row.status==3)?"#63E35A":"#EF6D6B"
                              }
                          },tmpStr)
                        }
                },
                {
                    title:'操作',
                    align:'center',
                    slot:'action',
                },
            ],
            data:[]

        }
    },
     methods: {
         //获取当前日期对象
         getdate(){
            
         },
         //下载海关文件
         downFile(){
            console.log( cfg.base)
             return false
             let data = {
                 attachUuid:this.feedbackList.customsFiles
             }
            axios({
                type:'GET',
                url: cfg.base + interfaceUrl.downLoadGsFile +'?attachUuid='+ data.attachUuid + '&template='+ new Date().getTime(),
                responseType: 'blob',
            }).then((res)=>{
                   
                    let headers = res.headers
                    let fileName = this.feedbackList.customsFilesName !='' ? (this.feedbackList.customsFilesName.split('.')[0]):''
                    let obj = ''
                    for (let key in headers) {
                       obj = headers['content-disposition']
                    }
                    let fileType = obj.split('.')[1]
                    
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download',fileName  +'.'+ fileType)
                    document.body.appendChild(link)
                    link.click()
            })

         },
         //企业提交资料函数
         submit(){
               let data={
                    projectid:this.feedbackList.projectid,
                    enterpriseLeavemsg:this.uploadFile.qyMessage,
                    feedbackUuid:this.feedbackList.uuid,
                    attachUuid:'', 
                }
             if(this.uploadFile.qyMessage.length==0 && this.uploadFile.fileName.length ==0){
                  this.$Message.error({
                        content:"企业留言和文件上传请至少填写一项后在提交",
                        duration:3
                    })
             }else if(this.uploadFile.fileName.length ==0 && this.uploadFile.qyMessage.length != 0){//只有留言上传
                  publicInter(interfaceUrl.uploadFeedbackMsg,data).then(r=>{
                      if(r.code =='200'){
                        this.$Message.success({
                            content:"提交成功！"
                        })
                        setTimeout(()=>{
                            this.showModal= false
                            this.queryInfo(1) 
                        },1000)
                      }
                  })
             }else{
                this.upload()
             }   
         },
         
         //记录切换函数
        //  changeDate(item,index){
        //      this.isActive = index;
        //      this.qysubmitShowdata = item;
        //      this.submitDate = item.recUpdDt
        //  },
        //立即查看函数
        lookOver(){
           this.look(this.alertArr)
        },
         close(){
            this.$refs.header.style.display = 'none';
         },
         queryInfo(page){  
             let data = {
                 pageNum:page,
                 pageSize:10,
                 status:this.searchType.status,
                 contactitem:this.searchType.contact,
                 businessofficer:this.searchType.officer,
                 certificateno:this.searchType.bgdNo,
             }
             publicInter(interfaceUrl.queryPageByParam,data).then(r=>{
                 this.data = r.list;
                 this.total = JSON.parse(r.total);
                 let arrObj = []
                 this.data.forEach(item=>{
                      if(item.status == '1'){
                          arrObj.push(item)
                      }
                  })
                  if(arrObj.length > 0){
                      this.alertArr = arrObj[0]
                  }
             })
         },
         look(row){
             let data = {
                    projectid:row.projectid,
                    feedbackUuid:row.uuid
                }
             this.uploadFile.qyMessage =''
             if(row.status =='0'){
                publicInter(interfaceUrl.updateGsStatuReaded,data).then(r=>{
                if(r.code =='200'){
                     this.$Message.success({
                        content:"状态已激活",
                        duration:2
                    })
                    setTimeout(()=>{
                     this.$router.go(0)
                    },2000)
                }
              })
             }else if(row.status =='1'){
                 this.showModal = true
                  publicInter(interfaceUrl.queryGsDetail,data).then(r=>{
                   if(r.code == 200){
                       this.dataInfo = r.data
                   }
              })
             }else{
                 this.respModal = true;
                 this.isActive = 0
                 publicInter(interfaceUrl.queryGsDetail,data).then(r=>{
                   if(r.code == 200){
                       this.dataInfo = r.data
                 }
              })
             }
         }, 
         //企业信息查询接口
         //分页函数
         changePage(page){
            this.queryInfo(page)  
         },
           //上传
        beforeUpload(file){
           let fileName = file.name.lastIndexOf('.')
           let fileLength = file.name.length;
           let fileType = file.name.substring(fileName + 1 , fileLength )
           let tp ="ZIP,zip";  //限制压缩包类型
           let rs= tp.indexOf(fileType);
            if(rs < 0){
                      this.$Message.error({
                        content:"请上传后缀名为.zip的压缩包文件",
                        duration:3
                    })
            }else{
                if(this.fileSize<(file.size/1024)){
                    this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
                }else{
                    this.uploadFile.fileName = file.name
                    this.filelist.push(file)
                    this.data1.push({
                        name: file.name,
                        date: (new Date).toLocaleDateString()
                    })
                    this.InfoModal = false
                }
            }
            return false
        },
        reChocie(){
            this.data1=[];
            this.filelist=[];
            this.uploadFile.fileName ='';
        },
        outSize(){
            this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
            this.data1.pop()
        },
        remove (index) {
            this.data1.splice(index, 1);
            this.uploadFile.fileName ='';
        },
        upload(){
            if(this.filelist.length > 1){
                 this.$Message.error({
                        content:"最多只能上传一个文件！！",
                        duration:3
                    })
            }else{
            var formdata=new FormData()
            var url = interfaceUrl.uploadBusFile //文件上传地址
            this.filelist.forEach(item=>{
                formdata.append('file',item)
            })
            
            fileUp(url,formdata).then(r=>{
                if(r.code==='200'&&!r.error){
                    this.$Message.success('上传成功')
                    this.data = r.list;
                    this.erpModal = false;
                    this.InfoModal = false;
                    this.uploadFile.fileName = ''; //清空文件名
                    let data = {
                        projectid:this.feedbackList.projectid,
                        enterpriseLeavemsg:this.uploadFile.qyMessage,
                        feedbackUuid:this.feedbackList.uuid,
                        attachUuid:r.indexArray[0], //企业上传文件uuid 可选
                    }
                    publicInter(interfaceUrl.uploadFeedbackMsg,data).then(r=>{
                      if(r.code =='200'){
                        setTimeout(()=>{
                            this.showModal= false
                            this.queryInfo(1) 
                        },1000)
                      }
                  })
                }
                else if(r.error){
                    this.modal=true
                    this.$refs.errorInfor.innerHTML=r.error
                }
                else{
                    if(r.msg){
                        this.$Message.error({
                            content:'上传失败'+ r.msg,
                            duration:3
                        })
                    }else{
                        this.$Message.error('上传出错')
                    }
                }
                if(r.indexArray && r.indexArray.length>0){
                        r.indexArray.forEach((value,index)=>{
                        this.data1.splice(value-index,1)
                        this.filelist.splice(value-index,1)
                    })
                }
            })
            }
        },
            
    },
     mounted(){
         this.queryInfo(1)
     },
  watch:{
      dataInfo:{
          handler(newValue,oldValue){
            this.feedbackList = newValue.feedbackList[0];
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.tariff{
    .header{
        display: flex;
        height: 35px;
        width: 100%;
        margin-bottom: 10px;
        background-color: #FFFBEF;
        img{
            display: block;
            width: 35px;
            height: 35px;
        }
        .msgimg{
            margin-left: 20px;
        }
        .closeimg{
            float: right;
            display: block;
            width: 25px;
            height: 25px;
            margin-top: 5px;
            cursor: pointer;
        }
        span{
            margin-left: 20px;
            width: 93%;
            display: inline-block;
            line-height: 35px;
            button{
                margin-left: 40px;
            }
        }
    }
    h2{
            padding-bottom: 20px;
            border-bottom: 1px solid #dddee1;
      }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 20%
        }
        .uscCode{
            width:20%;
        }
     }
     .ivu-modal-body{
         li{
             list-style: none;
        }
     }
    Row{
        margin-bottom: 10px;
    }
}
 .upload{
         >h3{
            padding: 10px 0;
            .ivu-upload,button{
                float: right;
                margin-left: 32px;
                
            }
        }
        &:last-child{
            margin-bottom: 10px;
        }
        h3{
          margin:0;
          font-size: 18px;
        }
        .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
    }
    .active{
        color:#298EF7;
    }
    .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
 
</style>
