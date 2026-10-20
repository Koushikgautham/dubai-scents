# Daily Perfume Byte — n8n + OpenAI + Telegram

Every morning at **8:00 IST**, your self-hosted n8n sends a short perfume lesson to Telegram: a concept, one line to say to a supplier, one to say to a buyer, and a 3-option quiz (answer arrives the next day). 45 topics rotate (one per day), drawn from the `perfume-tutor` skill's curriculum, with the key facts and brand-claim rules baked into the prompt so the bot stays accurate and on-brand.

**Cost:** one short OpenAI call a day — fractions of a cent; your $5 credit lasts a very long time. No Claude usage.

## Setup (≈ 15 minutes)

1. **Start n8n** on your home server and open its editor.
2. **Create the Telegram bot**
   - In Telegram, open **@BotFather** → `/newbot` → pick a name (e.g. "Perfume Byte") and a username ending in `bot`. Copy the **bot token** it gives you.
   - Open your new bot and send it any message (e.g. "hi"). *Optional:* add the bot to a group with your co-founder and send a message there instead.
   - Find your **chat ID**: in a browser open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` and look for `"chat":{"id": …}` (group IDs start with `-`). Don't share the token with anyone.
3. **Add credentials in n8n** (Credentials → New) — keys live only in n8n, never in this repo or in chat:
   - **OpenAI API** → paste your OpenAI API key (platform.openai.com → API keys). Name it `OpenAI account`.
   - **Telegram API** → paste the bot token. Name it `Telegram account`.
4. **Import the workflow:** Workflows → Import from file → `automations/n8n/daily-perfume-byte.json`.
5. **Wire it up:**
   - **Ask OpenAI** node → select the `OpenAI account` credential.
   - **Send to Telegram** node → select `Telegram account`, and replace `PUT_YOUR_CHAT_ID_HERE` with your chat ID.
   - **Pick topic** node → check `MODEL`: set it to the cheapest current chat model in your OpenAI account (the file defaults to `gpt-4o-mini`; if that name isn't available, pick the current small/mini model).
6. **Test:** click *Execute workflow* — a message should arrive in Telegram. (The "Yesterday's answer" line only appears from the second scheduled run — n8n saves the quiz answer only when the workflow is active, not during manual tests.)
7. **Activate** the workflow (toggle top-right). Check that the n8n instance timezone or the workflow setting is **Asia/Kolkata** (already set in the file).

## Tweaks
- **Time:** change the cron in *Every day 8:00* (`0 8 * * *` = 08:00 daily; `0 8 * * 1-6` = Mon–Sat).
- **Topics:** edit the `TOPICS` list in *Pick topic*. Keep the `FACTS` block in the system prompt in sync with `.agents/skills/perfume-tutor/references/` if the skill's facts change.
- **Both founders:** use a Telegram group chat ID so you both get the same lesson and can discuss the quiz.

## Limits & safety
- If the home server is off at 8:00, that day's message is skipped — fine for learning; don't use this server for anything customers depend on.
- The model can still make mistakes; the facts block reduces this. If a message looks wrong, check it with the `perfume-tutor` skill in Claude Code and fix the facts block.
- Deeper practice (role-plays, critiques, progress tracking) stays in Claude Code with `perfume-tutor`.
