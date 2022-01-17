const router = new Navigo("/")	

router.hooks({
	before(done, match) {
	
	let el = document.getElementById('todo-list')
	el.style.display = "block"

	if (match.url === "progress-bar") {
		progressBar.data.percentage = 0
	}

	if (match.url !== "todo-list") {
		// console.log("other route than todo-list")
		el.style.display = "none"
	}

	if (match.url === "articles-api") {
		fetchRecords()
	}

	done()
	}
});

router.on('/hello-world', function() {
	// console.log("hello-world")
	document.getElementById("content").innerHTML = app.html()
});
			
router.on('/match', function() {
	document.getElementById("content").innerHTML = match.html()
});

router.on('/progress-bar', function() {
	document.getElementById("content").innerHTML = progressBar.html()
});

router.on('/pomodoro-timer', function() {
	document.getElementById("content").innerHTML = timer.html()
});
	
router.on('/todo-list', function() {
	document.getElementById("content").innerHTML = todoForm.html()
});

router.on('/articles-api', function() {
	document.getElementById("content").innerHTML = articlesApi.html()
});

