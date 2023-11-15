import React, { ReactElement, Ref, RefAttributes } from "react";

// Here we are re-declaring the forwardRef type to support generics being passed to it

export const forwardRef = React.forwardRef as <T, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactElement | null,
) => (props: P & RefAttributes<T>) => ReactElement | null;
