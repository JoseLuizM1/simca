import { createClient } from "@/utils/supabase/client";

export async function getNotices(limit: number = 3) { 
  const supabase = createClient();

  const { data, error } = await supabase
                                .from("notices")
                                .select("*")
                                .order("date", { ascending: false })
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