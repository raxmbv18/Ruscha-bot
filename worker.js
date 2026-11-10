const APP = "https://raxmbv18.github.io/Ruscha/";
const TEXT = "Salom! Bu Ruscha Gapiramiz boti.\n\nRus tilini noldan B2 darajagacha gapirib o‘rganasiz:\n• 114 dars va tayyor suhbatlar\n• Ko‘chadagi tirik rus tili\n• Ovozli talaffuz va mashqlar\n• Natijalaringiz saqlanadi\n\nBoshlash uchun pastdagi tugmani bosing.";

export default {
  async fetch(req, env) {
    if (req.method !== "POST") return new Response("ok");
    if (req.headers.get("X-Telegram-Bot-Api-Secret-Token") !== env.WEBHOOK_SECRET) {
      return new Response("forbidden", { status: 403 });
    }
    const u = await req.json();
    const m = u.message;
    if (m && m.chat && m.chat.type === "private") {
      await fetch("https://api.telegram.org/bot" + env.BOT_TOKEN + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: m.chat.id,
          text: TEXT,
          reply_markup: { inline_keyboard: [[{ text: "Darslarni ochish", web_app: { url: APP } }]] },
        }),
      });
    }
    return new Response("ok");
  },
};
