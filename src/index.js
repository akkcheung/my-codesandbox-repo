import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>`;

let el = document.querySelector("#app");

let app = new Reef(el, {
  data: {
    greeting: "Hello",
    name: "world"
  },
  template: function (props) {
    return `<h1>Hello, ${props.name}!</h1>`;
  }
});

let match = new Reef("#match", {
  data: {
    username: ""
  },
  template: function (props) {
    return `
      <hr>
      <label for="username">What is your name? </label></br>
      <input id="username"><br>
      <div>
        <em>${
          props.username.length > 0
            ? `You typed: ${props.username}`
            : "Please enter a username above."
        }
        </em>
      </div>
    `;
  }
});

document.addEventListener("input", function (event) {
  if (!event.target.matches("#username")) return;

  match.data.username = event.target.value;
});

app.render();
match.render();
