import { BrowserRouter, Route, Switch } from "react-router-dom";
import appRoutes from "./appRoutes";

export default (props) => {
  return (
      <BrowserRouter>
        <Switch>
          {appRoutes.map((route, index) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
  );
};
