var gulp 	= require('gulp');
var plugins = require('gulp-load-plugins')();
var watcher = require('gulp-watch');
var git		= require ('gulp-git');


gulp.task('buildapp',['buildconfig','buildvendorjs'], function() {
	
	return gulp.src(['app/src/**/*Module.js','app/src/**/*.js'])
	//return gulp.src(['app/src/**/*Module.js','env','app/src/**/*.js'])
	.pipe(git.add())
 	.pipe(plugins.uglify())
	.pipe(plugins.concat('main.js'))
 	.pipe(gulp.dest('./app/dist/js/'));

});

gulp.task('buildconfig', function() {
	try{
		nodeEnv = process.env.NODE_ENV;
		console.log("nodeEnv="+nodeEnv);
		if(nodeEnv =='undefined' || nodeEnv ==undefined)
		{
			console.log("Terminating ... please set NODE_ENV with Dev or Prod'");
			throw 'NODE_ENV is not set or incorrect'
		}
		return gulp.src(['env/'+process.env.NODE_ENV+'.js'])
		//.pipe(git.add())
		.pipe(plugins.concat('config.js'))
		.pipe(gulp.dest('./app/dist/configs/'));
	}
	catch (exception)
	{
		console.log("Exception from -BuildConfig:"+exception);
		throw exception;
	}
});

gulp.task('buildvendorjs', function() {
	
	return gulp.src(['thirdparty/angular.js',
					 'thirdparty/angular-ui-router.js',
					 'thirdparty/jquery.min.js',
					 'thirdparty/bootstrap.min.js',
					 'thirdparty/handsontable.full.js',
					 'thirdparty/ngHandsontable.js',
					 'thirdparty/d3.js',
					 'thirdparty/crossfilter.js',
					 'thirdparty/dc.js'
					])
	//.pipe(git.add())
 	//.pipe(plugins.uglify())
	.pipe(plugins.concat('vendor.js'))
 	.pipe(gulp.dest('./app/dist/js/'));

});

gulp.task('watchdog',['gitinit','buildapp'],function(){
	try{
		gulp.watch('env/*.js',			['buildconfig','gitadd','gitcommit','gitstatus']);
		gulp.watch('app/src/**/*.js',	['buildapp']);
	}
	catch( exception){
		console.log("Build/Deployment stopped for follwing reason(s):\n\n"+exception);
		//throw exception;
	}
});


gulp.task('gitadd', function(){
  git.add();
});


gulp.task('gitinit', function(){
	git.init(function(err){if(err) throw err;});
});

gulp.task('gitaddremote', function(){
	git.addRemote('origin','https://github.com/vsesha/PoC.git',function(err){if(err) throw err;});
});

gulp.task('gitcommit', function(){
  //git.commit('auto commit');
});
gulp.task('gitstatus', function(){
  git.status({args: '--porcelain'}, function (err, stdout) {
    if (err) throw err;
  });
});
gulp.task('default',['watchdog']);