var express = require('express')
var mysql      = require('mysql')

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
      let  sql = 'SELECT id,cat_id,title,cover_img_url,source_logo_url,source_name,date FROM news WHERE id<'+req.query.page+' ORDER BY date DESC LIMIT 0,5'
      //查
      connection.query(sql,function (err, result) {
            if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
            }
   
         console.log('--------------------------SELECT----------------------------')
         console.log(result);
         res.send(result)
         console.log('------------------------------------------------------------\n\n')
      })
   } else{
      let  sql = 'SELECT id,cat_id,title,cover_img_url,source_logo_url,source_name,date FROM news ORDER BY date DESC LIMIT 0,5'
      //查
      connection.query(sql,function (err, result) {
            if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
            }
   
         console.log('--------------------------SELECT----------------------------')
         console.log(result)
         res.send(result)
         console.log('------------------------------------------------------------\n\n')
      })
   }
})
router.get('/article', (req, res, next) => {
   if (req.query.newsId){
      let  sql = 'SELECT * FROM news WHERE id='+req.query.newsId;
      //查
      connection.query(sql,function (err, result) {
            if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
            }
   
         console.log('--------------------------SELECT----------------------------');
         console.log(result);
         res.send(result)
         console.log('------------------------------------------------------------\n\n');  
      });
   } else {
      res.status(500)
   }
})

module.exports = router;