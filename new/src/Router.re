module Route = {
  type t =
    | Home
    | New
    | Input
    | NotFound;

  let routeToUrl =
    fun
    | Home => ""
    | Input => "/input"
    | New => "/new"
    | NotFound => raise(Invalid_argument("Calling NotFound route"));

  let urlToRoute: ReasonReact.Router.url => t =
    url => {
      switch (url.path) {
      | [] => Home
      | ["input"] => Input
      | ["new"] => New
      | _ => NotFound
      };
    };
};

include TheRouter.Make(Route);
