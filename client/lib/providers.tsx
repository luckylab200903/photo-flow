"use client";

/* Core */
import { Provider } from "react-redux";
import {store} from "./store"
/* Instruments */
import { reduxStore } from "@/lib/redux";

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};

