



export function draw(width, height, imgObj, imgObj1, imgObj2,clickCallBack) {
    var canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    var widthUnit = width / 1400
    var heightUnit = height / 700
    var tooltip;
    var lock=false;

    var ctx = canvas.getContext('2d');


    function drawOutLine() {
        //1290*600

        ctx.save();
        ctx.shadowColor = '#1F5FF2';
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = -2;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(80 * widthUnit, 60 * heightUnit);
        ctx.quadraticCurveTo(80 * widthUnit, 50 * heightUnit, 100 * widthUnit, 50 * heightUnit);
        ctx.lineTo(1340 * widthUnit, 50 * heightUnit);
        ctx.quadraticCurveTo(1370 * widthUnit, 50 * heightUnit, 1370 * widthUnit, 100 * heightUnit);
        ctx.lineTo(1370 * widthUnit, 90 * heightUnit);
        //        ctx.lineTo(950,200);
        ctx.lineTo(1370 * widthUnit, 320 * heightUnit);
        //        ctx.quadraticCurveTo(1370,320,1330,320);
        ctx.lineTo(1330 * widthUnit, 320 * heightUnit);
        ctx.quadraticCurveTo(1320 * widthUnit, 320 * heightUnit, 1320 * widthUnit, 330 * heightUnit);
        ctx.lineTo(1320 * widthUnit, 395 * heightUnit);
        ctx.quadraticCurveTo(1320 * widthUnit, 400 * heightUnit, 1315 * widthUnit, 405 * heightUnit);
        ctx.lineTo(1090 * widthUnit, 595 * heightUnit);
        ctx.quadraticCurveTo(1080 * widthUnit, 600 * heightUnit, 1070 * widthUnit, 600 * heightUnit);
        ctx.lineTo(150 * widthUnit, 600 * heightUnit);
        ctx.quadraticCurveTo(80 * widthUnit, 600 * heightUnit, 80 * widthUnit, 530 * heightUnit);
        ctx.closePath();


        ctx.stroke();
        ctx.restore()


    }
    var positionLists = [
        {
            coordinate: [1190, 100, 110, 150], text: '2A5-002', records: 3,
            options: {
                siteNum: '2A5-002',
                name: 'CheFormal Srl',
                country: '匈牙利',
                num: 3,
                price: '3561.56',
                total: '4512',
                ranger:[
                    {
                        id: '2226090',
                        time: '2019-7-02 13:30'
                    },
                    {
                        id: '2226093',
                        time: '2019-7-03 11:12'
                    },
                    {
                        id: '2226098',
                        time: '2019-7-02 10:30'
                    },
                ]
                
            }
        },
        {
            coordinate: [1000, 100, 180, 150], text: '2A5-003', records: 2,
            options: {
                siteNum: '2A5-003',
                name: 'Botech Technologie GmbH',
                country: '德国',
                num: 10,
                price: '32414.45',
                total: '2351',
                ranger:[
                    {
                        id: '2226091',
                        time: '2019-7-02 13:55'
                    },
                    {
                        id: '2226093',
                        time: '2019-7-03 13:12'
                    }
                ]
            }
        },
        {
            coordinate: [860, 100, 90, 150], text: '2B5-001', records: 1,
            options: {
                siteNum: '2A5-001',
                name: 'Orient Fan Co.',
                country: '美国',
                num: 17,
                price: '5684.95',
                total: '23512',
                ranger:[
                    {
                        id: '2226090',
                        time: '2019-7-02 14:01'
                    },
                ]
            }
        },
        {
            coordinate: [720, 100, 120, 150], text: '2B5-002',
            options: {
                siteNum: '2B5-002',
                name: 'Tiger Corporation',
                country: '日本',
                num: 23,
                price: '3412.5',
                total: '56213',
                // id: '104'
            }
        },
        {
            coordinate: [610, 100, 90, 150], text: '2B5-003',
            options: {
                siteNum: '2B5-003',
                name: '株式会社PFU',
                country: '日本',
                num: 13,
                price: '4322.5',
                total: '13234',
                // id: '104'
            }
        },
        {
            coordinate: [480, 100, 71, 70], text: '2C5-001',
            options: {
                siteNum: '2C5-001',
                name: 'Cherry GmbH',
                country: '斯洛伐克',
                num: 3,
                price: '432.5',
                total: '1324',
                // id: '100'
            }
        },
        {
            coordinate: [480, 183, 71, 70], text: '2C4-001', records: 1,
            options: {
                siteNum: '2C4-001',
                name: 'Bay Area Council',
                country: '美国',
                num: 54,
                price: '4312',
                total: '134',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]
            }
        },
        {
            coordinate: [480, 265, 71, 70], text: '2C3-001', records: 1,
            options: {
                siteNum: '2C4-001',
                name: '雷蛇Razer',
                country: '美国',
                num: 4,
                price: '43132',
                total: '34234',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]
            }
        },
        {
            coordinate: [490, 380, 60, 40], text: '',
            options: {}
        },
        {
            coordinate: [410, 380, 60, 40], text: '',
            options: {}
        },
        {
            coordinate: [410, 450, 140, 100], text: '2C1-033', records: 1,
            options: {
                siteNum: '2C1-033',
                name: 'Sound United, LLC',
                country: '日本',
                num: 6,
                price: '3451',
                total: '3445',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]
            }
        },
        {
            coordinate: [140, 450, 220, 100], text: '2C1-032', danger: true,
            options: {
                siteNum: '2C1-032',
                name: 'SAMBOTEC',
                country: '韩国',
                num: 15,
                price: '45754',
                total: '4672',
                // id: '100'
            }
        },
        {
            coordinate: [140, 380, 180, 60], text: '2C1-001',
            options: {
                siteNum: '2C1-001',
                name: 'A.O.SMITH',
                country: '中国大陆',
                num: 2,
                price: '3452',
                total: '45641',
                // id: '102'
            }
        },
        {
            coordinate: [1220, 380, 50, 50], text: '',
            options: {}
        },
        {
            coordinate: [1110, 380, 90, 60], text: '2A2-002',
            options: {
                siteNum: '2A2-002',
                name: '米技 Mi ji GmbH',
                country: '德国',
                num: 12,
                price: '56781',
                total: '56212',
                // id: '104'
            }
        },
        {
            coordinate: [1000, 380, 100, 60], text: '2A2-003',
            options: {
                siteNum: '2A2-003',
                name: '3M China Ltd',
                country: '美国',
                num: 23,
                price: '564314',
                total: '562245',
                // id: '104'
            }
        },
        {
            coordinate: [1250, 275, 50, 60], text: '',
            options: {}
        },
        {
            coordinate: [1140, 275, 100, 60], text: '2A4-002', records: 1,
            options: {
                siteNum: '2A2-003',
                name: '能率株式会社',
                country: '日本',
                num: 23,
                price: '4512',
                total: '54712',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]
            }
        },
        {
            coordinate: [1000, 275, 130, 60], text: '2A4-003',
            options: {
                siteNum: '2A4-003',
                name: '三星',
                country: '意大利',
                num: 34,
                price: '547121',
                total: '56823',
                // id: '104'
            }
        },
        {
            coordinate: [760, 275, 190, 60], text: '2B3-001',
            options: {
                siteNum: '2B3-001',
                name: 'Whirlpool Corporation',
                country: '美国',
                num: 44,
                price: '34521',
                total: '567232',
                // id: '104'
            }
        },
        {
            coordinate: [610, 275, 130, 60], text: '2B3-002',
            options: {
                siteNum: '2B3-002',
                name: 'MAJESTY',
                country: '缅甸',
                num: 4,
                price: '345',
                total: '567',
                // id: '104'
            }
        },
        {
            coordinate: [760, 380, 190, 60], text: '2B2-001',
            options: {
                siteNum: '2B2-001',
                name: 'Tanzania Tourist Board',
                country: '坦桑尼亚',
                num: 4,
                price: '342',
                total: '467',
                // id: '104'
            }
        },
        {
            coordinate: [610, 380, 130, 60], text: '2B2-002',
            options: {
                siteNum: '2B2-002',
                name: 'ITIM HOURIA',
                country: '缅甸',
                num: 43,
                price: '34324',
                total: '4693',
                // id: '102'
            }
        },
        {
            coordinate: [1000, 450, 110, 100], text: '2A1-002',
            options: {
                siteNum: '2A1-002',
                name: 'FINE JEWELLERY',
                country: '缅甸',
                num: 54,
                price: '343434',
                total: '44351',
                // id: '102'
            }
        },
        {
            coordinate: [1130, 450, 60, 45], text: '',
            options: {}
        },
        {
            coordinate: [790, 450, 160, 100], text: '2B1-001',
            options: {
                siteNum: '2B1-001',
                name: 'NORDICA',
                country: '俄罗斯',
                num: 51,
                price: '567823',
                total: '4356',
                // id: '102'
            }
        },
        {
            coordinate: [700, 450, 80, 100], text: '2B1-002', records: 1,
            options: {
                siteNum: '2B1-002',
                name: 'Gubelin Ltd.',
                country: '中国香港',
                num: 51,
                price: '5678',
                total: '435',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]
            }
        },
        {
            coordinate: [610, 450, 80, 100], text: '2B1-003',
            options: {
                siteNum: '2B1-003',
                name: 'Active&Holding Inc',
                country: '加拿大',
                num: 67,
                price: '78312',
                total: '43457',
                // id: '103'
            }
        },

        {
            coordinate: [120, 100, 15, 15], text: '',
            options: {}
        },
        {
            coordinate: [140, 100, 15, 15], text: '',
            options: {}
        },
        {
            coordinate: [160, 100, 15, 15], text: '',
            options: {}
        },
        {
            coordinate: [180, 100, 15, 15], text: '', danger: true,
            options: {}
        },
        {
            coordinate: [215, 100, 15, 15], text: '',
            options: {}
        },
        {
            coordinate: [235, 100, 15, 15], text: '',
            options: {}
        },
        {
            coordinate: [255, 100, 30, 15], text: '',
            options: {}
        },

        {
            coordinate: [120, 130, 35, 35], text: '',
            options: {}
        },
        {
            coordinate: [160, 130, 35, 35], text: '',
            options: {}
        },
        // //
        {
            coordinate: [330, 115, 60, 50], text: '',
            options: {}
        },
        {
            coordinate: [400, 105, 50, 60], text: '',
            options: {}
        },

        {
            coordinate: [215, 130, 35, 35], text: '',
            options: {}
        },
        {
            coordinate: [255, 130, 50, 35], text: '',
            options: {}
        },

        {
            coordinate: [120, 180, 18, 15], text: '',
            options: {}
        },
        {
            coordinate: [143, 180, 12, 15], text: '',
            options: {}
        },
        {
            coordinate: [120, 200, 35, 35], text: '',
            options: {}
        },

        {
            coordinate: [240, 175, 50, 60], text: '',
            options: {}
        },
        {
            coordinate: [320, 175, 140, 60], text: '2C4-002', records: 1,
            options: {
                siteNum: '2C4-002',
                name: 'NORDKOST AS',
                country: '挪威',
                num: 541,
                price: '783124',
                total: '4345',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]

            }
        },


        {
            coordinate: [175, 180, 55, 55], text: '',
            options: {}
        },

        {
            coordinate: [120, 250, 35, 45], text: '',
            options: {}
        },
        {
            coordinate: [120, 300, 35, 35], text: '',
            options: {}
        },
        {
            coordinate: [165, 250, 35, 85], text: '',
            options: {}
        },
        {
            coordinate: [205, 250, 35, 85], text: '',
            options: {}
        },

        {
            coordinate: [260, 250, 60, 85], text: '2C3-003',
            options: {
                siteNum: '2C4-002',
                name: 'BMS PRODUCTS SDN BHD',
                country: '马来西亚',
                num: 54,
                price: '42325',
                total: '562',
                // id: '104'
            }
        },
        {
            coordinate: [330, 250, 60, 85], text: '2C3-002',
            options: {
                siteNum: '2C3-002',
                name: 'HANDOK INC',
                country: '德国',
                num: 5,
                price: '56245',
                total: '464',
                // id: '104'
            }
        },
        {
            coordinate: [400, 250, 60, 85], text: '2C3-001', records: 1,
            options: {
                siteNum: '2C3-001',
                name: 'Plantanmed AB',
                country: '瑞典',
                num: 5,
                price: '55681',
                total: '674',
                ranger:[
                    {
                        id: '2226099',
                        time: '2019-7-02 13:10'
                    }
                ]
            }
        },




    ]
    function drawPoint() {
        ctx.beginPath()

    }
    function drawIcon(record, x, y, width, height) {
        if (width < 70 || height < 70) {

            return false
        }
        switch (record) {
            case 1:
                ctx.drawImage(imgObj, x - 10, y - 20, 15, 15); break;
            case 2:
                ctx.drawImage(imgObj, x - 15, y - 20, 15, 15);
                ctx.drawImage(imgObj1, x + 5, y - 20, 15, 15);
                break;
            case 3:
                ctx.drawImage(imgObj, x - 25, y - 20, 15, 15);
                ctx.drawImage(imgObj1, x - 10, y - 20, 15, 15);
                ctx.drawImage(imgObj2, x + 5, y - 20, 15, 15);
                break;
            default: break;
        }



    }
    function drawPlatform(options, Highlight) {
        var coordinate = options.coordinate;
        var text = options.text;
        var record = options.records
        ctx.beginPath()
        ctx.shadowBlur = 0
        ctx.strokeStyle = '#1F5FF2'
        ctx.clearRect(coordinate[0] * widthUnit, coordinate[1] * heightUnit, coordinate[2] * widthUnit, coordinate[3] * heightUnit)
        var width = coordinate[2] * widthUnit;
        var height = coordinate[3] * heightUnit;
        var center = {
            x: coordinate[0] * widthUnit + coordinate[2] * widthUnit / 2,
            y: coordinate[1] * heightUnit + coordinate[3] * heightUnit / 2,
            bottom: coordinate[1] * heightUnit + coordinate[3] * heightUnit - 5
        }
        if (record) {
            ctx.fillStyle = '#FFB73E';
            if (text) {
                drawIcon(record, center.x, center.bottom, coordinate[2] * widthUnit, coordinate[3] * heightUnit)
                // ctx.drawImage(imgObj,center.x-10, center.bottom-20,15,15)
                // ctx.arc(center.x, center.bottom, 4, 0, 2 * Math.PI)

            } else {
                ctx.drawImage(imgObj, center.x - 10, center.y - 20, 15, 15)
                // ctx.arc(center.x, center.y, 4, 0, 2 * Math.PI)

            }
            ctx.fill();

        }
        ctx.beginPath()
        if (Highlight) {

            if (!options.danger) {

                ctx.fillStyle = '#1F5FF2';

            } else {
                ctx.fillStyle = '#F5424F';
            }

            ctx.fillRect(coordinate[0] * widthUnit, coordinate[1] * heightUnit, coordinate[2] * widthUnit, coordinate[3] * heightUnit);
            if (record) {
                ctx.beginPath()
                ctx.fillStyle = '#FFB73E';
                if (text) {
                    drawIcon(record, center.x, center.bottom, coordinate[2] * widthUnit, coordinate[3] * heightUnit)
                    // ctx.arc(center.x, center.bottom, 4, 0, 2 * Math.PI)

                } else {
                    ctx.drawImage(imgObj, center.x - 10, center.y - 20, 15, 15)
                    // ctx.arc(center.x, center.y, 4, 0, 2 * Math.PI)

                }
                ctx.fill();

            }


        } else {
            if (options.danger) {
                ctx.save();
                ctx.fillStyle = 'rgba(245,66,79,0.20)'
                ctx.strokeStyle = '#F5424F';
                ctx.rect(coordinate[0] * widthUnit, coordinate[1] * heightUnit, coordinate[2] * widthUnit, coordinate[3] * heightUnit);
                ctx.fill();
                ctx.stroke()
                ctx.restore()
            } else {
                ctx.fillStyle = 'none';
                ctx.strokeStyle = '#1F5FF2';
                ctx.rect(coordinate[0] * widthUnit, coordinate[1] * heightUnit, coordinate[2] * widthUnit, coordinate[3] * heightUnit);
                ctx.stroke()
            }

        }

        if (text) {
            ctx.font = "14px Arial";
            ctx.fillStyle = '#fff';
            ctx.fillText(text, center.x - ctx.measureText(text).width / 2, center.y - 8)
        }




    }
    var fns = [
        { fun: drawOutLine, type: 'outline' },
        { fun: drawPlatform, type: 'rect' }
    ];
    function eventHandle() {
        canvas.onclick = function (e) {
            var x = e.offsetX, y = e.offsetY;
            removeTooltip()
            ctx.clearRect(0, 0, width, height)
            lock=true
            for (var i = 0; i <= positionLists.length; i++) {
                var fun;
                if (i === 0) {
                    fun = fns[0]
                    fun['fun']();
                } else {
                    fun = fns[1]

                    fun['fun'](positionLists[i - 1]);
                }

                if (fun.type !== 'outline' && ctx.isPointInPath(x, y)) {
                    fun['fun'](positionLists[i - 1], true);
                    tooltip(e.pageX + 30, e.pageY + 30, positionLists[i - 1].options,positionLists[i - 1].records)
                    for (var j = i; j < positionLists.length; j++) {
                        drawPlatform(positionLists[j])

                    }
                    break;

                }

            }

        }
        canvas.onmousemove = function (e) {
            var x = e.offsetX, y = e.offsetY;
            if(lock){
                return false
            }

            ctx.clearRect(0, 0, width, height)
            for (var i = 0; i <= positionLists.length; i++) {
                var fun;
                if (i === 0) {
                    fun = fns[0]
                    fun['fun']();
                } else {
                    fun = fns[1]

                    fun['fun'](positionLists[i - 1]);
                }

                if (fun.type !== 'outline' && ctx.isPointInPath(x, y)) {
                    canvas.style.cursor = 'pointer'
                    // console.log(positionLists[i - 1])


                    fun['fun'](positionLists[i - 1], true);
                    for (var j = i; j < positionLists.length; j++) {
                        drawPlatform(positionLists[j])
                    }
                    break;

                } else {
                    canvas.style.cursor = 'default'
                    // removeTooltip()
                }

            }

        }

    }
    function creatE(tag) {
        return document.createElement(tag);
    }
    function tooltip(x, y, options,records) {
        var div = creatE('div');
        div.className = 'toolTop'
        div.style.left = x + 'px';
        div.style.top = y > 500 ? y - 330 + 'px' : y + 'px';

        var h2 = creatE('h2');
        var div1 = creatE('div'),
            div2 = creatE('div'),
            div3 = creatE('div'),
            i=creatE('i'),
            i1=creatE('i');
        i.className='ivu-icon ivu-icon-md-locate';
        i1.className='ivu-icon ivu-icon-md-close';
        div1.appendChild(i)
        div3.appendChild(i1)
        div2.innerText=options.siteNum || '2C5-002';
        i1.onclick=function(){
            removeTooltip()
            lock=false
        }

        h2.appendChild(div1)
        h2.appendChild(div2)
        h2.appendChild(div3)
        
        var div4=creatE('div'),
            ul=creatE('ul'),
            ul1=creatE('ul');
        var li=[],
            text=['展商名称:','国家/地区:','展位编号:',
            '提单数:','总金额:','展品数:',
            options.name || '捷太格特JTEKT',options.country || 'Japan',
            options.siteNum || '2C5-002',options.num || '2',
            options.price +'美元'|| '73619.04美元',options.total +'件'|| '25895件'
        ]
        for(let i=0;i<12;i++){
            var li=creatE('li');
            li.innerText=text[i]
            if(i<6){
                ul.appendChild(li)
            }else{
                ul1.appendChild(li)
            }
            
        }
        div4.appendChild(ul)
        div4.appendChild(ul1)

        div.appendChild(h2)
        div.appendChild(div4)
        var list=[];
        
        var divRecord = creatE('div');
        divRecord.className = 'divRecord';
        div.appendChild(divRecord)
        for(let j=0;j<records;j++){
            var div6=creatE('div'),
                p=creatE('p'),
                span=creatE('span'),
                span1=creatE('span'),
                p1=creatE('p'),
                text=document.createTextNode(options['ranger'][j]['id']),
                img;
            span1.onclick=function(){
                clickCallBack(options)
            }
            switch(j){
                case 0:img=imgObj;break;
                case 1:img=imgObj1;break;
                case 2:img=imgObj2;break;
                default:break;
            }
            span.appendChild(img);
            span.appendChild(text);
            span1.innerText='巡馆记录表';
            p.appendChild(span)
            p.appendChild(span1)
            p1.innerText=options['ranger'][j]['time']
            div6.appendChild(p)
            div6.appendChild(p1)
            div6.className='list'
            if(j > 0) {
                divRecord.appendChild(creatE('hr'))
            }
            divRecord.appendChild(div6)
        }
        var body=document.getElementsByTagName('body')[0];
        body.appendChild(div)

    }
    function removeTooltip() {
        var target = document.getElementsByClassName('toolTop')[0]
        var body = document.getElementsByTagName('body')[0];
        if (target) {
            body.removeChild(target)
        }



    }
    function start() {
        positionLists.forEach(function (item) {
            drawPlatform(item)
        })
        drawOutLine()



        eventHandle();

    }
    start()



}
