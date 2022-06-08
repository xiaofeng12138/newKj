import GuiBing from '@/views/enterprise/separateBill/index'
import Bill from '@/views/enterprise/separateBill/bill'
import airBill from '@/views/enterprise/separateBill/airBill'
import Order from '@/views/enterprise/separateBill/order'
import Result from '@/views/enterprise/separateBill/result'
import concat from '@/components/guibing/board'
import sort from '@/components/guibing/sort'

export default {
  path: 'guibing',
  component: GuiBing,
  children: [
    { path: 'airBill', component: airBill, name: 'AirBill' },
    { path: 'bill', component: Bill, name: 'bill' },
    { path: 'order', component: Order, name: 'order' },
    { path: 'result', component: Result, name: 'result' },
    { path: 'concat/:billNo', component: concat, name: 'concat'},
    { path: 'sort/:billNo', component: sort,name:'sort'},
  ]
}
