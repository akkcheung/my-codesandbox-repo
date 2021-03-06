
// let articlesApi = new Reef('#articles-from-an-api', {
let articlesApi = new Reef('#content', {
	data: {
		articles: []
	},
	template: function (props) {

		if (!props.articles.length) {
			return `<p>There are no articles.</p>`
		}

		return `
			<hr>
			<ul>
				${ props.articles.map(function (article) {
						return `<li>
							<strong><a href="#">${article.title}</strong>
							${article.body}
						<li>`
					}).join('') }
			</ul>`
	}
})

const fetchRecords = function () {
fetch('https://jsonplaceholder.typicode.com/posts').then( 
	function (response) {
		return response.json()
	}).then( function (data) {
		articlesApi.data.articles = data
	})
};	

