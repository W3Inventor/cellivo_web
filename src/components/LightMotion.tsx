import * as React from "react";

type MotionProps<T extends keyof JSX.IntrinsicElements> = Omit<JSX.IntrinsicElements[T], "style"> & {
  animate?: unknown;
  exit?: unknown;
  initial?: unknown;
  layout?: unknown;
  layoutId?: unknown;
  style?: React.CSSProperties & Record<string, unknown>;
  transition?: unknown;
  variants?: unknown;
  viewport?: unknown;
  whileHover?: unknown;
  whileInView?: unknown;
  whileTap?: unknown;
};

const createMotionElement = <T extends keyof JSX.IntrinsicElements>(tagName: T) =>
  React.forwardRef<HTMLElement, MotionProps<T>>(
    (
      {
        animate: _animate,
        exit: _exit,
        initial: _initial,
        layout: _layout,
        layoutId: _layoutId,
        transition: _transition,
        variants: _variants,
        viewport: _viewport,
        whileHover: _whileHover,
        whileInView: _whileInView,
        whileTap: _whileTap,
        ...props
      },
      ref,
    ) => React.createElement(tagName, { ...props, ref }),
  );

export const motion = {
  article: createMotionElement("article"),
  div: createMotionElement("div"),
  section: createMotionElement("section"),
  span: createMotionElement("span"),
};

export const useScroll = () => ({ scrollYProgress: undefined });

export const useTransform = () => undefined;
