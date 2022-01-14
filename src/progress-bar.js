let progressBar = new Reef('#progress-bar', {
	data: {
		percentage: 0
	},
	template: function (props) {
		return `
			<br><hr>
			<label for="progress">App progress:</label>
			<progress id="progress" max="100" value="${props.percentage}"> ${props.percentage}% </progress>`;
	}
});

// Render the component into the DOM
progressBar.render();

let interval = setInterval(function () {
	progressBar.data.percentage++

	if (progressBar.data.percentage > 99) {
		clearInterval(interval)
	}

}, 16)
