import ReactDOM from 'react-dom';

//Import the main application
import App from './main/App.jsx';

const app_wrapper = document.getElementById('root');

app_wrapper ? ReactDOM.render(<App />, app_wrapper) : ( app_wrapper ) => {
    console.log(`
        Error: Unable to render App. App value is ${ app_wrapper }`
    )
    return false
}
