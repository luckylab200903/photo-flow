"use client";
import { counterSlice } from "@/lib/features/countSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(counterSlice.actions.increment());
          console.log("increment");
        }}
      >
        Hello
      </button>
      <p>{value}</p>
      <p>{status}</p>
    </div>
  );
}
