arr = [
    {
      "id": 1,
      "siteCatId":1,
      selected: true,
      "siteImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557926048614&di=db34e04617c5b656dd4d68ba4109b978&imgtype=0&src=http%3A%2F%2F2.pic.paopaoche.net%2Fup%2F2017-7%2F201775171334.png",
      "name": "IT之家",
      "description": "爱科技，爱这里",
      "siteRssUrl": "https://www.ithome.com/rss/"
    },
    {
      "id": 2,
      "siteCatId":1,
      selected: true,
      "siteImgUrl": "http://pic.pc6.com/up/2013-8/2013829103453.png",
      "name": "36Kr",
      "description": "提供创业资讯、科技新闻",
      "siteRssUrl": "https://www.36kr.com/feed/"
    },
    {
      "id": 3,
      "siteCatId":1,
      selected: false,
      "siteImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557922188876&di=6eb61dd2b55a8d05b981453dc2df9151&imgtype=0&src=http%3A%2F%2Fcdn.ifanr.cn%2Fwp-content%2Fuploads%2F2014%2F05%2Fifanr_cc.png",
      "name": "爱范儿ifanr",
      "description": "让未来触手可及",
      "siteRssUrl": "https://rsshub.app/ifanr/app"
    },
    {
      "id": 4,
      "siteCatId":2,
      selected: false,
      "siteImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557922188876&di=6eb61dd2b55a8d05b981453dc2df9151&imgtype=0&src=http%3A%2F%2Fcdn.ifanr.cn%2Fwp-content%2Fuploads%2F2014%2F05%2Fifanr_cc.png",
      "name": "爱444范儿ifanr",
      "description": "444让未来触手可及",
      "siteRssUrl": "https://rsshub.app/ifanr/app"
    }
  ]

// console.log(arr)
let newArr = arr.slice(0)


newArr.forEach(function(item,index){
    if(item.siteCatId !== 1){
        // console.log(index)
        newArr.splice(index,1)
    }    
});
console.log(newArr)
console.log('----------------------------------------------')
console.log(arr)