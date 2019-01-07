module type Route = {
  type t;
  let routeToUrl: t => string;
  let urlToRoute: ReasonReact.Router.url => t;
};
module Make = (R: Route) => {
  include R;
};
