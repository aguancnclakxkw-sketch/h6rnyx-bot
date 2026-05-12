import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

  const KEYSERVER_URL = 'https://h6rnyx-keyserver.vercel.app';

  export default {
    data: new SlashCommandBuilder()
      .setName('verificar')
      .setDescription('Genera un link de verificación para obtener tu key (expira en 30 segundos).'),

    async execute(interaction) {
      await interaction.deferReply({ ephemeral: true });

      let verifyToken;
      try {
        const res = await fetch(`${KEYSERVER_URL}/api/bot/create-verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-bot-secret': process.env.ADMIN_KEY || '',
          },
          body: JSON.stringify({ discord_user_id: interaction.user.id }),
        });

        const data = await res.json();

        if (!res.ok || !data.token) {
          console.error('[VERIFICAR] Error al crear token:', data);
          return interaction.editReply({ content: '❌ Error al generar el link. Intenta de nuevo más tarde.' });
        }

        verifyToken = data.token;
      } catch (err) {
        console.error('[VERIFICAR] Error de red:', err);
        return interaction.editReply({ content: '❌ No se pudo conectar con el servidor. Intenta más tarde.' });
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

      await interaction.editReply({ embeds: [embed] });

      setTimeout(async () => {
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle('🔑 Verificación de Membresía')
              .setColor(0xed4245)
              .setDescription('❌ Este link ha expirado. Usa `/verificar` de nuevo para obtener uno nuevo.')
              .setFooter({ text: 'h6rnyxv hub' })
          ],
        }).catch(() => {});
      }, 30_000);
    },
  };
  