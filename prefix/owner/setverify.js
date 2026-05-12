import { setVerifyChannel } from '../../utils/settings.js';

  export default {
    nombre: 'setverify',
    descripcion: 'Establece el canal donde solo se permite !verify (auto-borra otros mensajes).',
    owner: true,

    async ejecutar({ message, args }) {
      const guildId = message.guild.id;

      if (args[0]?.toLowerCase() === 'off') {
        setVerifyChannel(guildId, null);
        return message.reply('✅ Canal de verificación desactivado.');
      }

      const channel = message.mentions.channels.first() || message.channel;
      setVerifyChannel(guildId, channel.id);
      console.log('[SETVERIFY] Canal configurado:', channel.id, 'en guild:', guildId);

      return message.reply(
        `✅ Canal de verificación → ${channel}\n` +
        `Solo se permitirá \`!verify\` / \`!verificar\` — cualquier otro mensaje será borrado.\n` +
        `Usa \`!setverify off\` para desactivarlo.`
      );
    },
  };
  