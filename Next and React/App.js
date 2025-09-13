import React from "https://esm.sh/react@19.1.0";
import ReactDOM from 'https://esm.sh/react-dom@19.1.0/client'

const dynamic = (props) => {
    console.log(props)
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1" , {} , props.name),
        ]
    )
}
const App = () => {
   return React.createElement(
    "div",
    {},
    [
        React.createElement(dynamic , { name: "Javascript"}),
        React.createElement(dynamic , { name: "Typescript"}),
        React.createElement(dynamic , { name: "Python"}),
        React.createElement(dynamic , { name: "Java"}),
        React.createElement(dynamic , { name: "C++ and Rust"})


    ]
   )
};
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App))