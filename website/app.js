var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyp);
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('app started on port ' + port);

// index page
app.get('/', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: 'demo1 首页1',
      movies: movies
    });
  });
});

//detail page
app.get('/detail/:id', function(req, res) {
  var id = req.params.id;
  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'demo1' + movie.title,
      id: id,
      movie: movie
    });
  });
});

//admin page
app.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: 'demo1 后台录入页',
    movie: {
      _id: '',
      doctor: '',
      country: '',
      title: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary: ''
    }
  });
});


//admin update movie
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: 'demo1 后台更新页',
        movie: movie
      });
    });
  }
});

//admin delete movie
app.delete('/admin/list',function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
               console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }

});

//admin post movie
app.post('/admin/movie/new', function(req, res) {
  console.log(req.body);
  console.log(req.body.movie);
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  if (id !== undefined) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/detail/' + movie._id);
      });
    });
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      language: movieObj.language,
      country: movieObj.country,
      year: movieObj.year,
      poster: movieObj.poster,
      flash: movieObj.flash,
      summary: movieObj.summary
    });
    _movie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }
      res.redirect('/detail/' + movie._id);
    });
  }
});



//list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('list', {
      title: 'demo1 列表页',
      movies: movies
    });
  });
});