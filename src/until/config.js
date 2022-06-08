const config = {
  dev:{
    sso:'devhost/',
    base:'devhost/'
  },
  prod: {
    sso: '/',
    base: '/',
    exchangeUrl:'http://elines.coscoshipping.com/ebusiness/deliveryOrderOpen',
    truckUrl:'http://elines.coscoshipping.com/ebusiness/ecntrImportOpen/query'
  },
}

let cfg = {}

if (process.env['NODE_ENV'] === 'production') {
  cfg = config['prod']
} else if (process.env['NODE_ENV'] === 'pp') {
  cfg = config['test']
} else {  //development
  cfg = config['dev']
}


export default cfg
