import React from "react";
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT } from "butter-toast";

export const error = (title, content) => {
  ButterToast.raise({
    sticky: true,
    content: (
      <Cinnamon.Crisp
        scheme={Cinnamon.Crisp.SCHEME_RED}
        content={content}
        title={title}
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
      />
    ),
  });
};
