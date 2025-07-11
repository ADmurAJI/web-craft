import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, projectType, budget, contactMethod, contactValue, message } =
    body;

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    return new Response("Missing Telegram credentials", { status: 500 });
  }

  const text = `
🚀 *Новая заявка!*

👤 *Имя:* ${name}
📦 *Проект:* ${projectType}
💸 *Бюджет:* ${budget}

📞 *Связаться через:* ${contactMethod || "Не указан"}
🔗 *Контакт:* ${contactValue || "Не указан"}

📝 *Описание задачи:*
${message || "Не указано"}
`;

  const resTelegram = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    },
  );

  if (!resTelegram.ok) {
    const error = await resTelegram.text();
    return new Response(error, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
