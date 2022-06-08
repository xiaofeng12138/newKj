<template>
    <div class="svg" v-if="nowYear == '2019'">
        <h2>{{siteNum}}馆</h2>
        <div class="mark">
            <span>普通展位</span>
            <span>冷链展位</span>
            <span><img src="@/assets/ranger1.png" /> 巡馆记录</span>
        </div>
         <div class="mark1">
             <span>高风险展位</span>
             <span>重点关注</span>
             <span>暂进展位</span>
        </div>
        <div>
            <RadioGroup v-model="floor" @on-change='floorChange'>
                <Radio label='一楼'></Radio>
                <Radio label='二楼'></Radio>
            </RadioGroup>
        </div>
        <div class="svgtu">
             <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="675" height="675" viewBox="0 0 675 673"
         preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0,673) scale(0.1,-0.1)"
           fill="#0C1435"  stroke="#fff">
           
            <path stroke-width="10" d="M2825 6694 c-97 -22 -218 -81 -293 -143 -89 -74 -154 -160 -216 -286
                    -94 -188 -121 -327 -132 -662 l-7 -213 25 0 c25 0 26 -2 33 -87 13 -170 34
                    -339 54 -433 57 -275 78 -330 141 -383 16 -14 30 -30 30 -35 0 -11 -135 -145
                    -151 -150 -5 -2 -30 15 -57 39 -26 23 -65 50 -87 59 -72 32 -398 87 -737 125
                    -50 6 -58 9 -58 27 0 21 -3 21 -116 14 -64 -3 -211 -17 -327 -31 -316 -37
                    -428 -68 -563 -156 -114 -75 -211 -178 -262 -280 -54 -106 -71 -169 -78 -289
                    -5 -83 -2 -115 26 -250 36 -175 36 -225 -3 -385 -28 -117 -30 -299 -4 -395 60
                    -221 227 -398 475 -506 163 -70 339 -99 654 -108 l198 -6 0 29 c0 34 -20 30
                    246 55 215 21 498 79 575 117 20 10 54 34 74 54 21 19 41 35 44 35 4 0 40 -33
                    80 -74 l74 -75 -47 -55 c-25 -30 -53 -70 -60 -88 -29 -69 -72 -324 -123 -728
                    -7 -57 -11 -65 -30 -68 -23 -3 -23 -6 -23 -152 0 -173 22 -399 49 -510 88
                    -350 300 -593 574 -654 134 -31 200 -30 372 4 182 37 244 36 406 -1 332 -76
                    624 34 803 304 127 192 180 388 191 702 3 83 7 185 10 228 l4 77 -34 0 c-38 0
                    -38 0 -50 125 -12 118 -57 422 -81 537 -27 135 -37 158 -100 229 l-46 52 73
                    73 c41 41 78 74 84 74 6 0 24 -14 41 -31 16 -17 43 -39 60 -50 62 -38 404
                    -109 619 -128 240 -22 225 -18 225 -53 l0 -31 183 6 c219 8 403 29 512 57 258
                    68 479 230 574 423 80 163 94 313 47 537 -32 150 -31 252 0 373 37 142 36 312
                    -3 432 -57 180 -203 344 -389 439 -200 101 -342 130 -706 142 l-218 7 0 -22
                    c0 -11 -6 -21 -12 -21 -72 -1 -496 -62 -648 -93 -143 -30 -152 -34 -221 -91
                    -31 -25 -60 -46 -65 -46 -5 0 -42 33 -82 73 l-72 73 31 29 c42 40 78 104 95
                    167 36 136 74 349 89 498 27 275 21 250 62 250 l35 0 -6 168 c-17 399 -60 594
                    -174 781 -139 228 -337 353 -582 368 -81 4 -118 1 -255 -27 -178 -35 -222 -35
                    -375 2 -114 27 -283 32 -375 12z  "/>

                                <path stroke-width="10" d="M2853 6471 c-66 -26 -185 -103 -256 -166 -28 -25 -28 -25 -10 -55
                    l17 -30 777 0 777 0 13 32 c12 30 12 32 -27 66 -170 149 -337 206 -506 172
                    -105 -20 -293 -27 -403 -13 -55 6 -147 14 -205 18 -100 5 -109 4 -177 -24z"/>
                                <path :class="{blue:currentFloor[1]['clickable'],active:currentFloor[1]['active']}" 
                                :position="currentFloor[1]['clickable']" 
                                @click="clickHadle(currentFloor[1]['clickable'],currentFloor[1]['numeber'])"
                                d="M2503 6039 c-65 -19 -63 6 -63 -760 l0 -692 142 -143 141 -143 56 -3
                    c53 -3 56 -5 59 -30 l3 -28 185 0 c139 0 193 4 219 14 l35 15 0 875 c0 782 -2
                    876 -16 890 -13 14 -60 16 -372 15 -196 0 -372 -5 -389 -10z"/>
                                <path :class="{blue:currentFloor[0]['clickable'],active:currentFloor[0]['active']}" 
                                :position="currentFloor[0]['clickable']" 
                                @click="clickHadle(currentFloor[0]['clickable'],currentFloor[0]['numeber'])"
                                  d="M3478 6039 c-17 -9 -18 -62 -18 -888 0 -804 1 -880 17 -892 12 -11
                    65 -15 219 -17 l203 -3 3 28 c3 26 6 28 58 31 l55 3 138 137 137 137 0 711 0
                    711 -26 24 -26 24 -371 2 c-245 2 -378 -1 -389 -8z "/>
                                <path :position="currentFloor[2]['clickable']"
                                :class="{yellow:currentFloor[2]['clickable'],active:currentFloor[2]['active']}"
                                @click="clickHadle(currentFloor[2]['clickable'],currentFloor[2]['numeber'])"
                                  d="M692 4243 c-7 -3 -19 -18 -27 -33 -12 -24 -15 -92 -15 -398 0 -273 3
                    -371 12 -380 9 -9 220 -12 890 -12 l877 0 13 23 c9 15 14 83 16 220 l4 197
                    -24 0 c-36 0 -48 19 -48 76 l0 52 -136 131 -137 131 -706 -1 c-388 0 -712 -3
                    -719 -6z "/>
                                <path :position="currentFloor[7]['clickable']"
                                :class="{green:currentFloor[7]['clickable'],active:currentFloor[7]['active']}"
                                @click="clickHadle(currentFloor[7]['clickable'],currentFloor[7]['numeber'])"
                                  d="M4478 4113 l-137 -138 -3 -55 c-3 -52 -5 -55 -31 -58 l-28 -3 3 -203
                    c2 -154 6 -207 17 -220 12 -15 85 -16 895 -14 l881 3 3 389 c2 388 2 390 -20
                    413 l-21 23 -711 0 -711 0 -137 -137z "/>
                                <path d="M360 4059 c-84 -107 -106 -144 -136 -221 -26 -67 -27 -77 -21 -187 4
                    -64 11 -143 17 -176 12 -73 12 -238 -1 -320 -41 -275 -15 -387 135 -573 l57
                    -71 35 16 34 17 -2 775 -3 775 -30 17 -30 18 -55 -70z"/>
                                <path d="M6283 4108 l-23 -11 0 -776 0 -776 30 -17 30 -17 59 69 c71 82 108
                    144 133 219 26 77 33 187 19 261 -22 113 -29 288 -15 400 7 58 15 148 19 200
                    6 88 5 101 -20 170 -29 78 -63 136 -140 233 -47 59 -55 63 -92 45z"/>
                                <path d="M3305 3894 c-133 -28 -212 -69 -296 -153 -279 -279 -171 -738 205
                    -869 259 -90 555 52 657 317 33 84 38 238 11 328 -58 191 -207 328 -399 368
                    -65 14 -136 17 -178 9z m167 -260 c61 -20 117 -70 153 -135 25 -46 29 -65 30
                    -130 0 -65 -4 -84 -30 -134 -106 -207 -398 -202 -512 8 -26 46 -25 198 1 247
                    36 69 107 130 176 151 43 13 134 10 182 -7z"/>
                                <path d="M3265 3606 c-178 -83 -209 -320 -58 -446 114 -94 297 -68 380 54 63
                    92 68 186 15 280 -69 122 -213 170 -337 112z"/>
                                <path :position="currentFloor[3]['clickable']" 
                                :class="{yellow:currentFloor[3]['clickable'],active:currentFloor[3]['active']}"
                                @click="clickHadle(currentFloor[3]['clickable'],currentFloor[3]['numeber'])"
                                d="M662 3228 c-9 -9 -12 -109 -12 -389 l0 -378 24 -28 24 -28 708 -3
                    707 -2 138 137 139 137 0 51 c0 56 12 75 48 75 l24 0 -4 193 c-3 135 -8 200
                    -18 220 l-13 27 -877 0 c-668 0 -879 -3 -888 -12z "/>
                                <path :position="currentFloor[6]['clickable']" 
                                :class="{green:currentFloor[6]['clickable'],active:currentFloor[6]['active']}"
                                @click="clickHadle(currentFloor[6]['clickable'],currentFloor[6]['numeber'])"
                                d="M4294 3205 c-10 -26 -14 -80 -14 -219 l0 -185 28 -3 c25 -3 27 -6 30
                    -59 l3 -56 143 -141 143 -142 692 0 c733 0 737 0 755 45 3 9 6 189 6 400 0
                    340 -2 384 -16 389 -9 3 -407 6 -885 6 l-870 0 -15 -35z"/>
                                <path :position="currentFloor[4]['clickable']"
                                :class="{red:currentFloor[4]['clickable'],active:currentFloor[4]['active']}"
                                @click="clickHadle(currentFloor[4]['clickable'],currentFloor[4]['numeber'])"
                                d="M2840 2398 c0 -36 -19 -48 -75 -48 l-51 0 -137 -139 -137 -138 2
                    -706 3 -706 23 -23 23 -23 380 -3 c278 -2 385 0 395 9 12 10 14 151 14 888 l0
                    876 -22 15 c-18 12 -67 16 -220 18 l-198 4 0 -24z"/>
                                <path :position="currentFloor[5]['clickable']" 
                                :class="{red:currentFloor[5]['clickable'],active:currentFloor[5]['active']}"
                                @click="clickHadle(currentFloor[5]['clickable'],currentFloor[5]['numeber'])"
                                d="M3514 2411 c-17 -4 -36 -11 -42 -15 -17 -11 -17 -1757 0 -1774 9 -9
                    107 -12 380 -12 387 0 415 3 432 45 3 9 6 333 6 719 l0 703 -131 137 -131 136
                    -52 0 c-57 0 -76 12 -76 47 l0 23 -177 -1 c-98 -1 -192 -4 -209 -8z"/>

                                <path d="M2589 423 c-7 -16 -15 -31 -17 -34 -6 -13 193 -154 258 -184 59 -27
                    75 -30 170 -30 58 0 158 6 222 14 126 15 302 11 398 -10 73 -16 220 -6 292 19
                    65 23 151 79 223 145 l50 45 -17 29 -17 28 -774 3 -774 2 -14 -27z"/>
                                <path d="M2094 5323 c-189 -239 -270 -327 -418 -456 -78 -68 -174 -149 -213
                    -180 -68 -54 -73 -60 -73 -97 0 -44 0 -44 125 -55 116 -11 392 -53 524 -80
                    127 -26 185 -51 230 -99 14 -14 29 -26 36 -26 6 0 37 27 69 59 l59 60 -36 40
                    c-20 22 -42 52 -50 68 -32 64 -99 390 -116 568 -6 61 -13 140 -17 178 l-6 67
                    -38 0 c-34 0 -43 -6 -76 -47z"/>
                                <path d="M4536 5348 c-2 -13 -11 -99 -20 -193 -16 -172 -26 -237 -73 -445 -28
                    -126 -47 -171 -95 -225 l-31 -36 61 -61 61 -61 43 35 c64 52 96 66 221 93 101
                    22 370 62 527 80 135 15 130 13 130 54 0 35 -6 42 -62 87 -92 71 -273 228
                    -346 298 -66 63 -216 237 -291 339 -40 52 -47 57 -82 57 -32 0 -39 -4 -43 -22z"/>

                                <path d="M5480 1466 c0 -2 7 -9 15 -16 12 -10 15 -10 15 4 0 9 -7 16 -15 16
                    -8 0 -15 -2 -15 -4z"/>

                                <path d="M4372 2367 l-62 -62 45 -55 c25 -30 51 -75 59 -100 33 -101 92 -460
                    114 -690 l7 -75 40 -3 c38 -3 42 0 85 55 204 262 387 448 623 628 72 55 77 62
                    77 97 0 43 11 40 -195 58 -151 13 -266 31 -422 66 -179 40 -207 50 -260 99
                    l-50 44 -61 -62z"/>
                                <path d="M2281 2396 c-38 -41 -112 -73 -231 -100 -186 -42 -316 -63 -470 -76
                    -200 -16 -190 -13 -190 -59 0 -35 5 -42 63 -87 113 -88 291 -241 338 -290 56
                    -60 205 -234 283 -331 54 -68 61 -73 96 -73 l39 0 6 58 c29 266 91 646 117
                    717 6 17 31 56 56 88 l45 59 -59 59 c-32 32 -61 59 -64 59 -4 0 -17 -11 -29
                    -24z"/>
                                <path d="M5594 2142 c-12 -4 -240 -224 -508 -489 -473 -466 -487 -482 -484
                    -516 3 -34 7 -30 533 489 532 526 546 542 459 516z"/>
                                <path d="M5149 1607 l-546 -542 -7 -50 -7 -50 590 590 c325 324 591 591 591
                    592 0 2 -17 3 -37 2 -36 0 -60 -22 -584 -542z"/>
                                <path d="M5374 2121 c-5 -10 -67 -65 -138 -121 -205 -164 -318 -279 -525 -535
                    -40 -49 -80 -95 -88 -102 -8 -6 -13 -17 -12 -22 2 -6 186 171 409 394 289 289
                    399 405 384 405 -12 0 -25 -9 -30 -19z"/>
                                <path d="M5027 1712 c-417 -417 -428 -429 -425 -464 l3 -35 470 463 469 464
                    -44 0 -45 0 -428 -428z"/>

                            </g>
        <text v-for="(item,index) in currentFloor" :key="item.id" 
                v-if="item.clickable"
            :x="textCoord[index]['x']" 
            :y="textCoord[index]['y']"
             position style="font-size: 24px" fill="#fff">{{item.numeber}}</text>
        
       </svg>
            
        </div>
    </div>
    <div class="svg" v-else>
        <h2>{{siteNum}}馆</h2>
        <div class="mark">
            <span>普通展位</span>
            <span>冷链展位</span>
            <span><img src="@/assets/ranger1.png" /> 巡馆记录</span>
        </div>
        <div class="mark1">
            <span>高风险展位</span>
            <span>重点关注展位</span>
            <span>暂进展位</span>
        </div>
        <div>
            <RadioGroup v-model="floor" @on-change='floorChange'>
                <Radio label='一楼'></Radio>
                <Radio label='二楼'></Radio>
            </RadioGroup>
        </div>
        <div class="svgtu">
             <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="675" height="675" viewBox="0 0 675 673"
         preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0,673) scale(0.1,-0.1)"
           fill="#0C1435"  stroke="#fff">
            <path stroke-width="10" d="M2825 6694 c-97 -22 -218 -81 -293 -143 -89 -74 -154 -160 -216 -286
                    -94 -188 -121 -327 -132 -662 l-7 -213 25 0 c25 0 26 -2 33 -87 13 -170 34
                    -339 54 -433 57 -275 78 -330 141 -383 16 -14 30 -30 30 -35 0 -11 -135 -145
                    -151 -150 -5 -2 -30 15 -57 39 -26 23 -65 50 -87 59 -72 32 -398 87 -737 125
                    -50 6 -58 9 -58 27 0 21 -3 21 -116 14 -64 -3 -211 -17 -327 -31 -316 -37
                    -428 -68 -563 -156 -114 -75 -211 -178 -262 -280 -54 -106 -71 -169 -78 -289
                    -5 -83 -2 -115 26 -250 36 -175 36 -225 -3 -385 -28 -117 -30 -299 -4 -395 60
                    -221 227 -398 475 -506 163 -70 339 -99 654 -108 l198 -6 0 29 c0 34 -20 30
                    246 55 215 21 498 79 575 117 20 10 54 34 74 54 21 19 41 35 44 35 4 0 40 -33
                    80 -74 l74 -75 -47 -55 c-25 -30 -53 -70 -60 -88 -29 -69 -72 -324 -123 -728
                    -7 -57 -11 -65 -30 -68 -23 -3 -23 -6 -23 -152 0 -173 22 -399 49 -510 88
                    -350 300 -593 574 -654 134 -31 200 -30 372 4 182 37 244 36 406 -1 332 -76
                    624 34 803 304 127 192 180 388 191 702 3 83 7 185 10 228 l4 77 -34 0 c-38 0
                    -38 0 -50 125 -12 118 -57 422 -81 537 -27 135 -37 158 -100 229 l-46 52 73
                    73 c41 41 78 74 84 74 6 0 24 -14 41 -31 16 -17 43 -39 60 -50 62 -38 404
                    -109 619 -128 240 -22 225 -18 225 -53 l0 -31 183 6 c219 8 403 29 512 57 258
                    68 479 230 574 423 80 163 94 313 47 537 -32 150 -31 252 0 373 37 142 36 312
                    -3 432 -57 180 -203 344 -389 439 -200 101 -342 130 -706 142 l-218 7 0 -22
                    c0 -11 -6 -21 -12 -21 -72 -1 -496 -62 -648 -93 -143 -30 -152 -34 -221 -91
                    -31 -25 -60 -46 -65 -46 -5 0 -42 33 -82 73 l-72 73 31 29 c42 40 78 104 95
                    167 36 136 74 349 89 498 27 275 21 250 62 250 l35 0 -6 168 c-17 399 -60 594
                    -174 781 -139 228 -337 353 -582 368 -81 4 -118 1 -255 -27 -178 -35 -222 -35
                    -375 2 -114 27 -283 32 -375 12z  "/>

                                <path stroke-width="10" d="M2853 6471 c-66 -26 -185 -103 -256 -166 -28 -25 -28 -25 -10 -55
                    l17 -30 777 0 777 0 13 32 c12 30 12 32 -27 66 -170 149 -337 206 -506 172
                    -105 -20 -293 -27 -403 -13 -55 6 -147 14 -205 18 -100 5 -109 4 -177 -24z"/>
                                <path :class="{blue:currentFloor[1]['clickable'],active:currentFloor[1]['active']}" 
                                :position="currentFloor[1]['clickable']" 
                                @click="clickHadle(currentFloor[1]['clickable'],currentFloor[1]['numeber'])"
                                d="M2503 6039 c-65 -19 -63 6 -63 -760 l0 -692 142 -143 141 -143 56 -3
                    c53 -3 56 -5 59 -30 l3 -28 185 0 c139 0 193 4 219 14 l35 15 0 875 c0 782 -2
                    876 -16 890 -13 14 -60 16 -372 15 -196 0 -372 -5 -389 -10z"/>
                                <path :class="{blue:currentFloor[0]['clickable'],active:currentFloor[0]['active']}" 
                                :position="currentFloor[0]['clickable']" 
                                @click="clickHadle(currentFloor[0]['clickable'],currentFloor[0]['numeber'])"
                                  d="M3478 6039 c-17 -9 -18 -62 -18 -888 0 -804 1 -880 17 -892 12 -11
                    65 -15 219 -17 l203 -3 3 28 c3 26 6 28 58 31 l55 3 138 137 137 137 0 711 0
                    711 -26 24 -26 24 -371 2 c-245 2 -378 -1 -389 -8z "/>
                                <path :position="currentFloor[2]['clickable']"
                                :class="{yellow:currentFloor[2]['clickable'],active:currentFloor[2]['active']}"
                                @click="clickHadle(currentFloor[2]['clickable'],currentFloor[2]['numeber'])"
                                  d="M692 4243 c-7 -3 -19 -18 -27 -33 -12 -24 -15 -92 -15 -398 0 -273 3
                    -371 12 -380 9 -9 220 -12 890 -12 l877 0 13 23 c9 15 14 83 16 220 l4 197
                    -24 0 c-36 0 -48 19 -48 76 l0 52 -136 131 -137 131 -706 -1 c-388 0 -712 -3
                    -719 -6z "/>
                                <path :position="currentFloor[7]['clickable']"
                                :class="{green:currentFloor[7]['clickable'],active:currentFloor[7]['active']}"
                                @click="clickHadle(currentFloor[7]['clickable'],currentFloor[7]['numeber'])"
                                  d="M4478 4113 l-137 -138 -3 -55 c-3 -52 -5 -55 -31 -58 l-28 -3 3 -203
                    c2 -154 6 -207 17 -220 12 -15 85 -16 895 -14 l881 3 3 389 c2 388 2 390 -20
                    413 l-21 23 -711 0 -711 0 -137 -137z "/>
                                <path d="M360 4059 c-84 -107 -106 -144 -136 -221 -26 -67 -27 -77 -21 -187 4
                    -64 11 -143 17 -176 12 -73 12 -238 -1 -320 -41 -275 -15 -387 135 -573 l57
                    -71 35 16 34 17 -2 775 -3 775 -30 17 -30 18 -55 -70z"/>
                                <path d="M6283 4108 l-23 -11 0 -776 0 -776 30 -17 30 -17 59 69 c71 82 108
                    144 133 219 26 77 33 187 19 261 -22 113 -29 288 -15 400 7 58 15 148 19 200
                    6 88 5 101 -20 170 -29 78 -63 136 -140 233 -47 59 -55 63 -92 45z"/>
                                <path d="M3305 3894 c-133 -28 -212 -69 -296 -153 -279 -279 -171 -738 205
                    -869 259 -90 555 52 657 317 33 84 38 238 11 328 -58 191 -207 328 -399 368
                    -65 14 -136 17 -178 9z m167 -260 c61 -20 117 -70 153 -135 25 -46 29 -65 30
                    -130 0 -65 -4 -84 -30 -134 -106 -207 -398 -202 -512 8 -26 46 -25 198 1 247
                    36 69 107 130 176 151 43 13 134 10 182 -7z"/>
                                <path d="M3265 3606 c-178 -83 -209 -320 -58 -446 114 -94 297 -68 380 54 63
                    92 68 186 15 280 -69 122 -213 170 -337 112z"/>
                                <path :position="currentFloor[3]['clickable']" 
                                :class="{yellow:currentFloor[3]['clickable'],active:currentFloor[3]['active']}"
                                @click="clickHadle(currentFloor[3]['clickable'],currentFloor[3]['numeber'])"
                                d="M662 3228 c-9 -9 -12 -109 -12 -389 l0 -378 24 -28 24 -28 708 -3
                    707 -2 138 137 139 137 0 51 c0 56 12 75 48 75 l24 0 -4 193 c-3 135 -8 200
                    -18 220 l-13 27 -877 0 c-668 0 -879 -3 -888 -12z "/>
                                <path :position="currentFloor[6]['clickable']" 
                                :class="{green:currentFloor[6]['clickable'],active:currentFloor[6]['active']}"
                                @click="clickHadle(currentFloor[6]['clickable'],currentFloor[6]['numeber'])"
                                d="M4294 3205 c-10 -26 -14 -80 -14 -219 l0 -185 28 -3 c25 -3 27 -6 30
                    -59 l3 -56 143 -141 143 -142 692 0 c733 0 737 0 755 45 3 9 6 189 6 400 0
                    340 -2 384 -16 389 -9 3 -407 6 -885 6 l-870 0 -15 -35z"/>
                                <path :position="currentFloor[4]['clickable']"
                                :class="{red:currentFloor[4]['clickable'],active:currentFloor[4]['active']}"
                                @click="clickHadle(currentFloor[4]['clickable'],currentFloor[4]['numeber'])"
                                d="M2840 2398 c0 -36 -19 -48 -75 -48 l-51 0 -137 -139 -137 -138 2
                    -706 3 -706 23 -23 23 -23 380 -3 c278 -2 385 0 395 9 12 10 14 151 14 888 l0
                    876 -22 15 c-18 12 -67 16 -220 18 l-198 4 0 -24z"/>
                                <path :position="currentFloor[5]['clickable']" 
                                :class="{red:currentFloor[5]['clickable'],active:currentFloor[5]['active']}"
                                @click="clickHadle(currentFloor[5]['clickable'],currentFloor[5]['numeber'])"
                                d="M3514 2411 c-17 -4 -36 -11 -42 -15 -17 -11 -17 -1757 0 -1774 9 -9
                    107 -12 380 -12 387 0 415 3 432 45 3 9 6 333 6 719 l0 703 -131 137 -131 136
                    -52 0 c-57 0 -76 12 -76 47 l0 23 -177 -1 c-98 -1 -192 -4 -209 -8z"/>

                                <path d="M2589 423 c-7 -16 -15 -31 -17 -34 -6 -13 193 -154 258 -184 59 -27
                    75 -30 170 -30 58 0 158 6 222 14 126 15 302 11 398 -10 73 -16 220 -6 292 19
                    65 23 151 79 223 145 l50 45 -17 29 -17 28 -774 3 -774 2 -14 -27z"/>
                                <path d="M2094 5323 c-189 -239 -270 -327 -418 -456 -78 -68 -174 -149 -213
                    -180 -68 -54 -73 -60 -73 -97 0 -44 0 -44 125 -55 116 -11 392 -53 524 -80
                    127 -26 185 -51 230 -99 14 -14 29 -26 36 -26 6 0 37 27 69 59 l59 60 -36 40
                    c-20 22 -42 52 -50 68 -32 64 -99 390 -116 568 -6 61 -13 140 -17 178 l-6 67
                    -38 0 c-34 0 -43 -6 -76 -47z"/>
                                <path d="M4536 5348 c-2 -13 -11 -99 -20 -193 -16 -172 -26 -237 -73 -445 -28
                    -126 -47 -171 -95 -225 l-31 -36 61 -61 61 -61 43 35 c64 52 96 66 221 93 101
                    22 370 62 527 80 135 15 130 13 130 54 0 35 -6 42 -62 87 -92 71 -273 228
                    -346 298 -66 63 -216 237 -291 339 -40 52 -47 57 -82 57 -32 0 -39 -4 -43 -22z"/>

                                <path d="M5480 1466 c0 -2 7 -9 15 -16 12 -10 15 -10 15 4 0 9 -7 16 -15 16
                    -8 0 -15 -2 -15 -4z"/>

                                <path d="M4372 2367 l-62 -62 45 -55 c25 -30 51 -75 59 -100 33 -101 92 -460
                    114 -690 l7 -75 40 -3 c38 -3 42 0 85 55 204 262 387 448 623 628 72 55 77 62
                    77 97 0 43 11 40 -195 58 -151 13 -266 31 -422 66 -179 40 -207 50 -260 99
                    l-50 44 -61 -62z"/>
                                <path d="M2281 2396 c-38 -41 -112 -73 -231 -100 -186 -42 -316 -63 -470 -76
                    -200 -16 -190 -13 -190 -59 0 -35 5 -42 63 -87 113 -88 291 -241 338 -290 56
                    -60 205 -234 283 -331 54 -68 61 -73 96 -73 l39 0 6 58 c29 266 91 646 117
                    717 6 17 31 56 56 88 l45 59 -59 59 c-32 32 -61 59 -64 59 -4 0 -17 -11 -29
                    -24z"/>
                                <path d="M5594 2142 c-12 -4 -240 -224 -508 -489 -473 -466 -487 -482 -484
                    -516 3 -34 7 -30 533 489 532 526 546 542 459 516z"/>
                                <path d="M5149 1607 l-546 -542 -7 -50 -7 -50 590 590 c325 324 591 591 591
                    592 0 2 -17 3 -37 2 -36 0 -60 -22 -584 -542z"/>
                                <path d="M5374 2121 c-5 -10 -67 -65 -138 -121 -205 -164 -318 -279 -525 -535
                    -40 -49 -80 -95 -88 -102 -8 -6 -13 -17 -12 -22 2 -6 186 171 409 394 289 289
                    399 405 384 405 -12 0 -25 -9 -30 -19z"/>
                                <path d="M5027 1712 c-417 -417 -428 -429 -425 -464 l3 -35 470 463 469 464
                    -44 0 -45 0 -428 -428z"/>

                            </g>
        <text v-for="(item,index) in currentFloor" :key="item.id" 
                v-if="item.clickable"
            :x="textCoord[index]['x']" 
            :y="textCoord[index]['y']"
             position style="font-size: 24px" fill="#fff">{{item.numeber}}</text>
        
       </svg>
            
        </div>
    </div>
</template>
<script>
//19年数据
const floorOne = [
  { numeber: 1.1, clickable: true ,active:false},
  { numeber: 2.1, clickable: true ,active:false},
  { numeber: 3, clickable: true ,active:false},
  { numeber: 4.1, clickable: true ,active:false},
  { numeber: 5.1, clickable: true ,active:false},
  { numeber: 6.1, clickable: true ,active:false},
  { numeber: 7.1, clickable: true ,active:false},
  { numeber: 8.1, clickable: true ,active:false}
];
const floorTwo = [
  { numeber: 1, clickable: false ,active:false},
  { numeber: 2, clickable: false ,active:false},
  { numeber: 3.1, clickable: false ,active:false},
  { numeber: 4.2, clickable: false,active:false },
  { numeber: 5.2, clickable: true ,active:false},
  { numeber: 6.2, clickable: true ,active:false},
  { numeber: 7.2, clickable: true ,active:false},
  { numeber: 8.2, clickable: true ,active:false}
];

//20年数据
const newFloorOne = [
  { numeber: 1.1, clickable: true ,active:false},
  { numeber: 2.1, clickable: true ,active:false},
  { numeber: 3, clickable: true ,active:false},
  { numeber: 4.1, clickable: true ,active:false},
  { numeber: 5.1, clickable: true ,active:false},
  { numeber: 6.1, clickable: true ,active:false},
  { numeber: 7.1, clickable: true ,active:false},
  { numeber: 8.1, clickable: true ,active:false}
];
const newFloorTwo = [
  { numeber: 1.2, clickable: true ,active:false},
  { numeber: 2.2, clickable: true ,active:false},
  { numeber: 3.1, clickable: false ,active:false},
  { numeber: 4.2, clickable: false,active:false },
  { numeber: 5.2, clickable: true ,active:false},
  { numeber: 6.2, clickable: true ,active:false},
  { numeber: 7.2, clickable: true ,active:false},
  { numeber: 8.2, clickable: true ,active:false}
];

//19年展馆类型数据
const hallTypeName19 ={
  '1.1':{ type:'服务贸易展区'},
  '2.1':{ type:'汽车展区'},
  '3':{ type:'装备展区'},
  '4.1':{ type:'装备展区'},
  '5.1':{ type:'科技生活展区'},
  '5.2':{ type:'国家馆'},
  '6.1':{ type:'品质生活展区'},
  '6.2':{ type:'品质生活展区'},
  '7.1':{ type:'医疗器械展区'},
  '7.2':{ type:'医疗器械展区'},
  '8.1':{ type:'食品农产品展区'},
  '8.2':{ type:'食品农产品展区'},
};
//20年展馆类型数据
const hallTypeName20 ={
  '1.1':{ type:'食品农产品展区'},
  '2.1':{ type:'食品农产品展区'},
  '2.2':{ type:'食品农产品展区'},
  '1.2':{ type:'汽车展区'},
  '3':{ type:'技术装备展区'},
  '4.1':{ type:'技术装备展区'},
  '5.1':{ type:'消费品展区'},
  '5.2':{ type:'消费品展区'},
  '6.1':{ type:'消费品展区'},
  '6.2':{ type:'消费品展区'},
  '7.1':{ type:'医疗器械展区'},
  '7.2':{ type:'医疗器械展区'},
  '8.1':{ type:'医疗器械展区'},
  '8.2':{ type:'服务贸易展区'},
  // 'B':{ type:'技术装备展区'},
}
import {setCookie,getCookie,} from "@/until/getToken";
export default {
  data() {
    return {
      //年份
      nowYear:getCookie('date'),
      currentFloor:getCookie('date') == '2019' ? floorOne : newFloorOne,
      siteNum:2,
      textCoord: [
        { x: 380, y: 170 },
        { x: 280, y: 170 },
        { x: 145, y: 300 },
        { x: 135, y: 400 },
        { x: 270, y: 535 },
        { x: 370, y: 535 },
        { x: 505, y: 405 },
        { x: 505, y: 300 }
      ],
      floor: "一楼"
    };
  },
  beforeMount(){
    let {numSite}=this.$route.params
    this.siteNum=numSite;
    // (''+numSite).split('.')[1]==2 ? this.currentFloor=floorTwo : this.currentFloor=floorOne
    if((''+numSite).split('.')[1]==2) {
      getCookie('date') == '2019' ?  this.currentFloor = floorTwo :  this.currentFloor = newFloorTwo;
      // this.currentFloor=floorTwo;
      this.floor = '二楼'
    } else {
       getCookie('date') == '2019' ?  this.currentFloor = floorOne :  this.currentFloor = newFloorOne;
      // this.currentFloor=floorOne;
      this.floor = '一楼'
    }
    this.currentFloor.forEach(item=>{
      item.numeber==numSite?item.active=true:item.active=false
    });
  },
  methods:{
      floorChange(e){
          if(e==='一楼'){
            getCookie('date') == '2019' ?  this.currentFloor = floorOne :  this.currentFloor = newFloorOne;
          }else{
            getCookie('date') == '2019' ?  this.currentFloor = floorTwo :  this.currentFloor = newFloorTwo;
          }
      },
      clickHadle(disable,num){
          if(!disable){
              return false
          }
          this.siteNum = num;
          // console.log( hallTypeName19[num]['type'])
          let nowYear = getCookie('date')
          let nowYearType = (nowYear == '2019'?  hallTypeName19[num]['type'] :hallTypeName20[num]['type'])
          setCookie('hallType', nowYearType)
          let paramsObj = {
            num,
            hallTypeName:nowYearType
          }
          this.$emit('numSite', paramsObj)
          
          this.currentFloor.forEach(ele=>{
              if(ele.numeber==num){
                  ele.active=true
              }else{
                  ele.active=false
              }
              
          })
      }
  }
};
</script>
<style lang="scss" scoped>
.svg {
  width: 100%;
  height: 100%;
  h2{
      background: rgb(13, 51, 128);
      padding: .4rem 0;
  }
  .svgtu {
    width: 15rem;
    height: 15rem;
    overflow: hidden;
    svg {
      width: 100%;
      height: 100%;
      transform: rotate(45deg);
        path {
        stroke-width: 15;
      }
    }
  }
  .mark{
    display: flex;
    padding:0.4rem 1.2rem;
    justify-content: space-between;
    >span{
      position: relative;
      padding-left: 15px;
      vertical-align: middle;
      img{
        width: 15px;
        height: 15px;
        top: 2px;
        position: relative;
      }
      &::before{
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background:#2c98f2;
        border: 1px solid #1f5ff1;
        left: 0;
        top: 50%;
        transform: translate(0,-50%);
      }
      &:nth-child(2):before{
        background:red;
        border: 1px solid #F5424F;
      }
      &:last-child:before{
        content: none;
        width: 4px;
        height: 4px;
         background:#FFB73E;
        border: 1px solid #FFB73E;
      }
    }
  }
  .mark1{
    display: flex;
    padding:0.4rem 1.2rem;
    justify-content: space-between;
    >span{
      position: relative;
      padding-left: 15px;
      vertical-align: middle;
      img{
        width: 15px;
        height: 15px;
        top: 2px;
        position: relative;
      }
      &::before{
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        left: 0;
        top: 50%;
        transform: translate(0,-50%);
      }
      &:nth-child(1):before{
        background:#FF7521;
        border: 1px solid #FF7521;
      }
      &:nth-child(2):before{
         background:yellow;
        border: 1px solid yellow;
      }
      &:nth-child(3):before{
         background:#6BFF29;
        border: 1px solid #6BFF29;
      }
    }
  }
}
[position] {
  cursor: pointer;
  stroke: none;
}
.blue {
  stroke: rgba(255, 255, 255, 1);
  position: relative;
  z-index: 1;
  &:hover,&.active {
    fill: #2c98f2;
  }
}
.yellow {
    position: relative;
  z-index: 1;
  stroke: rgba(255, 255, 255,1);
  &:hover,&.active {
    fill: #f2a62c;
  }
}
.green {
    position: relative;
  z-index: 1;
  stroke: rgba(255, 255, 255, 1);
  &:hover,&.active {
    fill: #27d980;
  }
}
.red {
    position: relative;
  z-index: 1;
  stroke: rgba(255, 255, 255,1);
  &:hover,&.active {
    fill: #f22c67;
  }
}
</style>
