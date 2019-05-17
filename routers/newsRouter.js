var express = require('express')
var mysql      = require('mysql')
var request = require('request')
var FeedParser = require('feedparser')

var imgUrlFun = function(str){
	var data = '';
   str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
      data =  capture;
   });
	return data
}

var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'ITnews'
});
connection.connect()

var router = express.Router()
router.get('/', (req, res, next) => {
   if(req.query.page){
      let  sql = 'SELECT id,abstract,title,cover_img_url,source_logo_url,source_name,date FROM news WHERE id<'+req.query.page+' ORDER BY id DESC LIMIT 0,5'
      //查
      connection.query(sql,function (err, result) {
         if(err){
         console.log('[SELECT ERROR] - ',err.message);
         return;
         }
         res.send(result)
      })
   } else{
      let  sql = 'SELECT id,abstract,title,cover_img_url,source_logo_url,source_name,date FROM news ORDER BY id DESC LIMIT 0,5'
      //查
      connection.query(sql,function (err, result) {
         if(err){
         console.log('[SELECT ERROR] - ',err.message);
         return;
         }
         res.send(result)
      })
   }
})
router.get('/explore', (req, res, next) => {
   let  sql = 'SELECT * FROM sites ORDER BY id  LIMIT 0,5'
   //查
   connection.query(sql,function (err, result) {
      if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
      }
      res.send(result)
   })
})
// router.get('/morecomments', (req, res, next) => {
//    if (req.query.bottom_comment_id&&req.query.newsId){
//       let  sql = 'SELECT * FROM comments WHERE id<'+req.query.bottom_comment_id+' AND news_id='+req.query.newsId+' ORDER BY id DESC LIMIT 0,5'
//       //查
//       connection.query(sql,function (err, result) {
//          if(err){
//          console.log('[SELECT ERROR] - ',err.message);
//          return;
//          }
//          res.send(result)
//       })
//    } else{
//       res.status(500)
//    }

// })
router.get('/article', (req, res, next) => {
   let data ={}
   if (req.query.newsId){
      let  sql = 'SELECT * FROM news WHERE id='+req.query.newsId
      //查
      connection.query(sql,function (err, result) {
         if(err){
         console.log('[SELECT ERROR] - ',err.message);
         return;
         }
         console.log(result)
         data.news = result
         let sql = 'SELECT * FROM comments WHERE news_id='+req.query.newsId+' ORDER BY support_num DESC LIMIT 0,3'
         connection.query(sql,function (err, result) {
            if(err){
               console.log('[SELECT ERROR] - ',err.message);
               return;
            }
            data.hot_comments = result
            let sql = 'SELECT * FROM comments WHERE news_id='+req.query.newsId+' ORDER BY id DESC LIMIT 0,5'
            connection.query(sql,function (err, result) {
               if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
               }
               data.all_comments = result
               res.send(data)
            })
         })
      });
   } else {
      res.status(500).send('error')
   }
})
router.get('/getrssdata',(reQ,reS)=>{
   if (reQ.query.rssurl){
      var req = request(reQ.query.rssurl)
      var feedparser = new FeedParser();
      req.on('error', function (error) {
         return console.log('rssurl-error')
       });
       
       req.on('response', function (res) {
         var stream = this; // 这里的this是req（所请求request文件），是stream文件类型
       
         if (res.statusCode !== 200) {
           this.emit('error', new Error('Bad status code'));
         }
         else {
           stream.pipe(feedparser);
         }
       });
       
       feedparser.on('error', function (error) {
         // 处理feedparser的错误
         // 这个是feedparser包的错误提示
         console.log('error')
       });

       var posts = []
       feedparser.on('readable', function () {
         // 此时已经获取到Feed信息，在这里可以进行你的操作了
         var stream = this; // 这里的this是feedparser， 也是stream文件类型
         var meta = this.meta; // 注意：这个meta是在feedparser的实例中一直可以获得。
          //Meta其实是RSS等一些的元信息，在后面会介绍到，一般来说Meta信息都是重复的。
         var item;
         while (item = stream.read()) {
            // console.log(item.title)
            posts.push({
               title:item.title,
               imgUrl:imgUrlFun(item.description),
               body:item.description
            })
          }
         //  console.log(posts)
       });
       feedparser.on('end', function(err){
         reS.send(posts)
       });
   }
})

module.exports = router;