import { getVerifyChannel, setVerifyChannel } from '../../utils/settings.js';

  export default {
    nombre: 'setverify',
    descripcion: 'Establece el canal de verificación (solo !verify permitido en ese canal).',
    owner: true,

    async ejecutar({ message, args }) {
      const guildId = message.guild.id;

      // !setverify off — disable
      if (args[0]?.toLowerCase() === 'off') {
        setVerifyChannel(guildId, null);
        return message.reply('✅ Canal de verificación desactivado. Ya no se borrará nada automáticamente.');
      }

      // Use mentioned channel or current channel
      const channel = message.mentions.channels.first() || message.channel;
      setVerifyChannel(guildId, channel.id);

      return message.reply(
        `✅ Canal de verificación establecido en ${channel}.\n` +
        `Solo se permitirá el comando \`!verify\` / \`!verificar\` — cualquier otro mensaje será borrado automáticamente.\n` +
        `Para desactivarlo usa \`!setverify off\`.`
      );
    },
  };
  