import React from "react";
import ButterToast, { Cinnamon } from "butter-toast";

export const error = (title, content) => {
  ButterToast.raise({
    sticky: true,
    content: (
      <Cinnamon.Crisp
        scheme={Cinnamon.Crisp.SCHEME_RED}
        content={content}
        title={title}
        className="notify"
      />
    ),
  });
};

export const success = (title, content) => {
  ButterToast.raise({
    content: (
      <Cinnamon.Crisp
        scheme={Cinnamon.Crisp.SCHEME_GREEN}
        content={content}
        title={title}
        className="notify"
      />
    ),
  });
};
