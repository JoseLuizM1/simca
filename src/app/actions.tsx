import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getNotices(limit: number = 3) { 
  const supabase = await createClient(cookies());

  const { data, error } = await supabase
                                .from("notices")
                                .select("*")
                                .order("created_at", { ascending: false })
                                .limit(limit);

  if (error) {
    console.error("Error fetching notices:", error);
    return [];
  }

  return data.map((notice) => ({
    ...notice,
    date: new Date(notice.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
  }));
}