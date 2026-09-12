import { redirect } from "next/navigation";
import { profile } from "../profile";

export default function Resume() {
  redirect(profile.resume);
}
