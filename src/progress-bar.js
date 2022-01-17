// let progressBar = new Reef('#progress-bar', {

let progressBar = new Reef('#content', {
	data: {
		percentage: 0
	},
	template: function (props) {
		return `
			<br><hr>
			<label for="progress">App progress:</label>
			<progress id="progress" max="100" value="${props.percentage}"> ${props.percentage}% </progress>
      <button data-action="start-progress">Start</button>`
	}
});

// Render the component into the DOM
// progressBar.render();

/*
let interval = setInterval(function () {
	progressBar.data.percentage++

	if (progressBar.data.percentage > 99) {
		clearInterval(interval)
	}

}, 16)
*/


const clickHandlerProgressBar = function(event) {

  let action = event.target.getAttribute('data-action');

	if (action === 'start-progress') {
		let interval = setInterval(function () {
			progressBar.data.percentage++

			if (progressBar.data.percentage > 99) {
				clearInterval(interval)
			}

		}, 16)
	}

}

document.addEventListener('click', clickHandlerProgressBar, false);
