import { Fragment, h } from "preact";
import { useState } from "react";
import { useLayer, Arrow } from "react-laag";
import style from "./DropdownMenu.css";

interface Props {
  items: Array<{
    label: string;
    action: () => void;
  }>;
}

export const DropdownMenu: React.FC<Props> = ({ items, children }) => {
  const [isOpen, setOpen] = useState(false);

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen,
    placement: "bottom-end",
  });

  return (
    <Fragment>
      <button
        type="button"
        className={style.button}
        onClick={(e) => {
          e.preventDefault;
          setOpen(!isOpen);
        }}
        {...triggerProps}
      >
        <svg viewBox="0 0 24 24" className={style.icon}>
          <polyline fill="none" stroke="#000" strokeWidth="2" points="18 9 12 15 6 9"></polyline>
        </svg>
      </button>
      {isOpen &&
        renderLayer(
          <div className={style.tooltip} {...layerProps}>
            <div className={style.list}>
              {items.map(({ label, action }) => {
                return (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      action();
                      setOpen(false);
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <Arrow
              angle={45}
              size={8}
              roundness={0}
              borderWidth={1}
              borderColor="#000"
              backgroundColor="#fff"
              {...arrowProps}
            />
          </div>
        )}
    </Fragment>
  );
};
