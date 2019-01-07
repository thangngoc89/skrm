module Route = {
  type t =
    | Home
    | Input
    | NotFound;

  let routeToUrl =
    fun
    | Home => ""
    | Input => "/input"
    | NotFound => raise(Invalid_argument("Calling NotFound route"));

  let urlToRoute: ReasonReact.Router.url => t =
    url => {
      switch (url.path) {
      | [] => Home
      | ["input"] => Input
      | _ => NotFound
      };
    };
};

include TheRouter.Make(Route);
