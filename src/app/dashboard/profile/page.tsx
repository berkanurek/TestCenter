import type { Metadata } from "next";

import { Profile } from "./profile";

export const metadata: Metadata = {
  title: "My profile",
};

export default function ProfilePage() {
  return <Profile />;
}
