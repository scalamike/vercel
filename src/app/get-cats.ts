import { createClient } from "@supabase/supabase-js";
import { connection } from "next/server";
import { cats, type Cat } from "./cats";

export async function getCats(): Promise<Cat[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return cats;

  await connection();

  try {
    const { data, error } = await createClient(url, key)
      .from("cats")
      .select("id, name, breed, age, gender, location, image, description, traits, featured")
      .eq("available", true)
      .order("featured", { ascending: false })
      .order("name");

    return error ? cats : (data as Cat[]);
  } catch {
    return cats;
  }
}