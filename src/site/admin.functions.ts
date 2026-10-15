import { createServerFn } from "@tanstack/react-start";

/**
 * Idempotently makes sure the single admin account (from ADMIN_EMAIL / ADMIN_PASSWORD
 * secrets) exists and has the admin role. Takes no input and returns nothing sensitive.
 */
export const ensureAdminAccount = createServerFn({ method: "POST" }).handler(async () => {
  const email = process.env['ADMIN_EMAIL'];
  const password = process.env['ADMIN_PASSWORD'];
  if (!email || !password) return { ok: false };
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  let userId: string | undefined;
  for (let page = 1; page <= 20 && !userId; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    userId = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
    if (data.users.length < 200) break;
  }

  if (!userId) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    userId = data.user.id;
  }

  await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
  return { ok: true };
});
