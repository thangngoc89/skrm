open ReactHelpers;

[@bs.module "./padStart.js"]
external padStart: (~length: int, ~padString: string, string) => string =
  "default";

module TimeElapsed = {
  [@react.component]
  let make = (~time, ~className=?) => {
    let seconds = time /. 1000.;
    let min = seconds /. 60. |> floor |> Js.Float.toString;
    let sec = mod_float(seconds, 60.) |> floor |> Js.Float.toString;
    let msec =
      mod_float(seconds, 1.)
      ->Js.Float.toFixedWithPrecision(~digits=3)
      ->Js.String.substringToEnd(~from=2);

    <div className={Cn.make(["font-mono", Cn.unpack(className)])}>
      <span className="text-4xl">
        {padStart(~length=2, ~padString="0", min) ++ ":" |> str}
      </span>
      <span className="text-4xl">
        {padStart(~length=2, ~padString="0", sec) ++ ":" |> str}
      </span>
      <span className="text-xl text-dark-4"> {msec |> str} </span>
    </div>;
  };
};

type timerState =
  | Stopped
  | Running(float, Js.Global.intervalId);

type timer = {
  timeElapsed: float,
  timeState: timerState,
};

type state = {
  left: timer,
  right: timer,
};
type timerId =
  | TimerLeft
  | TimerRight;

type setInterval = {
  timeStart: float,
  itv_left: Js.Global.intervalId,
  itv_right: Js.Global.intervalId,
};
type action =
  | Start
  | Stop(timerId)
  | Reset
  | IntervalUpdate(timerId)
  | SetInterval(setInterval);

let emptyTimer = () => {
  {timeElapsed: 0., timeState: Stopped};
};

let intervalUpdate = timer => {
  let {timeElapsed, timeState} = timer;
  switch (timeState) {
  | Stopped => None
  | Running(timeStart, itvId) =>
    let now = Js.Date.now();

    Some({
      timeElapsed: now -. timeStart +. timeElapsed,
      timeState: Running(now, itvId),
    });
  };
};

let stopTimer = (timer, update) => {
  let {timeElapsed, timeState} = timer;
  switch (timeState) {
  | Stopped => ReactUpdate.Update(update(timer))
  | Running(timeStart, itvId) =>
    let now = Js.Date.now();
    UpdateWithSideEffects(
      update({
        timeElapsed: now -. timeStart +. timeElapsed,
        timeState: Stopped,
      }),
      _ => {
        Js.Global.clearInterval(itvId);
        None;
      },
    );
  };
};

let s: Js.t('a) = [%raw {|require("./StopWatch.module.css")|}];

[@react.component]
let make = () => {
  let (state, send) =
    ReactUpdate.useReducer(
      {left: emptyTimer(), right: emptyTimer()}, (action, state) =>
      switch (action) {
      | Reset =>
        UpdateWithSideEffects(
          {left: emptyTimer(), right: emptyTimer()},
          ({state}) => {
            switch (state.left.timeState) {
            | Running(_, intId) => Js.Global.clearInterval(intId)
            | Stopped => ()
            };
            switch (state.right.timeState) {
            | Running(_, intId) => Js.Global.clearInterval(intId)
            | Stopped => ()
            };
            None;
          },
        )
      | Start =>
        switch (state.left.timeState, state.right.timeState) {
        | (Stopped, Stopped) =>
          SideEffects(
            ({send}) => {
              let dateNow = Js.Date.now();

              let intervalIdLeft =
                Js.Global.setInterval(
                  () => send(IntervalUpdate(TimerLeft)),
                  10,
                );
              let intervalIdRight =
                Js.Global.setInterval(
                  () => send(IntervalUpdate(TimerRight)),
                  10,
                );
              send(
                SetInterval({
                  timeStart: dateNow,
                  itv_left: intervalIdLeft,
                  itv_right: intervalIdRight,
                }),
              );
              None;
            },
          )
        | (_, _) => NoUpdate
        }

      | SetInterval({timeStart, itv_left, itv_right}) =>
        Update({
          left: {
            ...state.left,
            timeState: Running(timeStart, itv_left),
          },
          right: {
            ...state.right,
            timeState: Running(timeStart, itv_right),
          },
        })
      | Stop(timerId) =>
        switch (timerId) {
        | TimerLeft =>
          stopTimer(state.left, newTimer => {...state, left: newTimer})
        | TimerRight =>
          stopTimer(state.right, newTimer => {...state, right: newTimer})
        }
      | IntervalUpdate(timerId) =>
        switch (timerId) {
        | TimerLeft =>
          switch (intervalUpdate(state.left)) {
          | None => NoUpdate
          | Some(newTimer) => Update({...state, left: newTimer})
          }
        | TimerRight =>
          switch (intervalUpdate(state.right)) {
          | None => NoUpdate
          | Some(newTimer) => Update({...state, right: newTimer})
          }
        }
      }
    );
  <div className="flex flex-col h-full">
    <div className="flex-1 mt-4 sm:mt-8">
      <div
        className="flex flex-col items-center justify-start sm:flex-row sm:items-end sm:justify-around">
        <div
          className="flex flex-row-reverse items-center w-full px-2 my-2 sm:flex-col sm:items-center">
          <TimeElapsed className="flex-1 ml-2 md:ml-0" time={state.left.timeElapsed} />
          <button
            onClick={_ => send(Stop(TimerLeft))}
            disabled={
              switch (state.left.timeState) {
              | Stopped => true
              | Running(_, _) => false
              }
            }
            className={Cn.make([
              s##btn,
              s##btnRounded,
              "bg-status-error sm:mt-10",
            ])}>
            "Stop"->str
          </button>
        </div>
        <div className="flex justify-start w-full px-2 my-2 sm:justify-center">
          <button
            onClick={_ => send(Start)}
            disabled={
              switch (state.left.timeState, state.right.timeState) {
              | (Stopped, Stopped) => false
              | _ => true
              }
            }
            className={Cn.make([s##btn, s##btnRounded, "bg-status-ok"])}>
            "Start"->str
          </button>
        </div>
        <div
          className="flex flex-row-reverse justify-between items-center w-full px-2 my-2 sm:flex-col sm:items-center">
          <TimeElapsed className="flex-1 ml-2 md:ml-0" time={state.right.timeElapsed} />
          <button
            onClick={_ => send(Stop(TimerRight))}
            disabled={
              switch (state.right.timeState) {
              | Stopped => true
              | Running(_, _) => false
              }
            }
            className={Cn.make([
              s##btn,
              s##btnRounded,
              "bg-status-error sm:mt-10",
            ])}>
            "Stop"->str
          </button>
        </div>
      </div>
    </div>
    <div
      className={Cn.make([
        "flex items-start justify-center sm:mt-6 md:mt-10",
        s##resetContainer,
      ])}>
      <button
        onClick={_ => send(Reset)}
        disabled={
          switch (state.left.timeState, state.right.timeState) {
          | (Stopped, Stopped) => false
          | _ => true
          }
        }
        className={Cn.make([s##btn, "rounded bg-status-warning"])}>
        "Reset"->str
      </button>
    </div>
  </div>;
};
