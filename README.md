# h6rnyx Bot

  Bot de Discord para el servidor de h6rnyx. Incluye gestión de keys, moderación, diversión y sistema de tickets.

  ## Comandos

  ### Slash (Owner/Admin)
  | Comando | Descripción |
  |---------|-------------|
  | `/genkey [duración]` | Genera una key del keyserver |
  | `/revokekey <key>` | Revoca una key |
  | `/checkkey <key>` | Verifica el estado de una key |
  | `/ticket` | Envía el panel de tickets |

  ### Prefix (! por defecto)
  **Moderación:** `!ban`, `!kick`, `!mute`, `!unmute`, `!warn`, `!clear`, `!lock`, `!unlock`, `!slowmode`, `!nuke`

  **General:** `!ping`, `!help`, `!avatar`, `!userinfo`, `!serverinfo`

  **Diversión:** `!8ball`, `!abrazo`, `!beso`, `!chiste`, `!dado`, `!howgay`, `!meme`, `!piropo`, `!say`, `!ship`, `!teamo`

  ## Setup

  1. Clona el repo e instala dependencias:
  ```bash
  npm install
  ```

  2. Copia `.env.example` a `.env` y rellena los valores

  3. En el [Discord Developer Portal](https://discord.com/developers/applications), activa:
     - **Server Members Intent**
     - **Message Content Intent**

  4. Arranca el bot:
  ```bash
  node index.js
  ```
