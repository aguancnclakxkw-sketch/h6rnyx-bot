import { EmbedBuilder } from 'discord.js';

  const KEYSERVER_URL = 'https://h6rnyx-keyserver.vercel.app';

  export default {
    nombre: 'verify',
    descripcion: 'Genera un link de verificación para obtener tu key. El link expira en 30 segundos.',
    owner: false,

    async ejecutar({ message }) {
      let verifyToken;
      try {
        const res = await fetch(`${KEYSERVER_URL}/api/bot/create-verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-bot-secret': process.env.ADMIN_KEY || '',
          },
          body: JSON.stringify({ discord_user_id: message.author.id }),
        });
        const data = await res.json();
        if (!res.ok || !data.token) {
          console.error('[VERIFICAR] Error al crear token:', data);
          const errMsg = await message.channel.send({ content: '❌ Error al generar el link. Intenta de nuevo más tarde.' });
          setTimeout(() => errMsg.delete().catch(() => {}), 5000);
          return;
        }
        verifyToken = data.token;
      } catch (err) {
        console.error('[VERIFICAR] Error de red:', err);
        const errMsg = await message.channel.send({ content: '❌ No se pudo conectar con el servidor. Intenta más tarde.' });
        setTimeout(() => errMsg.delete().catch(() => {}), 5000);
        return;
      }

      const verifyLink = `${KEYSERVER_URL}/api/discord/verify?vt=${verifyToken}`;

      const embed = new EmbedBuilder()
        .setTitle('🔑 Verificación de Membresía')
        .setColor(0x5865F2)
        .setDescription(
          '🇺🇸 **Click the link below to verify your Discord membership.**\n' +
          'After verifying, you will be able to complete the steps to get your key.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🇪🇸 **Haz clic en el link de abajo para verificar tu membresía en Discord.**\n' +
          'Después de verificar, podrás completar los pasos para obtener tu key.\n\n' +
          `🔗 **Link:** ${verifyLink}\n\n` +
          '-# Este link expira en 30 segundos  •  This link expires in 30 seconds'
        )
        .setFooter({ text: 'h6rnyxv hub' })
        .setTimestamp();

      // Try DM directly — log error if it fails so we can debug
      let dmSent = false;
      try {
        await message.author.send({ embeds: [embed] });
        dmSent = true;
        console.log('[VERIFICAR] DM enviado a', message.author.tag);
      } catch (err) {
        console.error('[VERIFICAR] DM fallido para', message.author.tag, '-', err.message);
      }

      if (dmSent) {
        const notice = await message.channel.send({
          content: `📬 ${message.author} — **Check your DMs! / ¡Revisa tus mensajes privados!** 🔑`,
        });
        setTimeout(() => notice.delete().catch(() => {}), 10_000);
      } else {
        const sent = await message.channel.send({ embeds: [embed] });
        setTimeout(() => sent.delete().catch(() => {}), 30_000);
      }
    },
  };
