import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { authenticate } from "./services/authService";

ReactDOM.render(authenticate(), document.getElementById("root"));

serviceWorker.unregister();
