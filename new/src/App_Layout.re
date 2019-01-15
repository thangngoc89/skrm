open React;
let component = ReasonReact.statelessComponent("App_Layout");

let make = children => {
  ...component,
  render: _self => {
    <div className="h-screen flex flex-col">
      <header className="bg-brand text-light-1 font-bold p-3">
        "Header"->str
      </header>
      <main className="flex flex-row flex-1">
        /* <aside className="w-48 bg-light-1 p-3 border-r border-dark-4">
          "Sidebar"->str
        </aside> */
        <article className="flex-1 p-3"> ...children </article>
      </main>
    </div>;
  },
};
