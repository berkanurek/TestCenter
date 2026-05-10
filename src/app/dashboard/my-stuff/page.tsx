import type { Metadata } from "next";

import { MyStuff } from "./my-stuff";

export const metadata: Metadata = {
  title: "My stuff",
};

export default function MyStuffPage() {
  return <MyStuff />;
}
