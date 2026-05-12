import { tieneAcceso } from '../utils/accesos.js';
  import { getPrivado } from '../utils/estadoGlobal.js';
  import { getPrefix, getVerifyChannel } from '../utils/settings.js';

  export default {
    name: 'messageCreate',
    once: false,

    async execute(client, message) {
      if (message.author.bot) return;

      // Auto-delete non-!verify messages in the verify channel
      if (message.guild) {
        const verifyChannelId = getVerifyChannel(message.guild.id);
        if (verifyChannelId && message.channel.id === verifyChannelId) {
          const prefix = message.guild ? getPrefix(message.guild.id) : client.prefix;
          const isVerifyCmd = message.content.trim().toLowerCase() === `${prefix}verify` ||
                              message.content.trim().toLowerCase() === `${prefix}verificar`;
          if (!isVerifyCmd && !message.author.bot) {
            await message.delete().catch(() => {});
            return;
          }
        }
      }

      const prefix = message.guild ? getPrefix(message.guild.id) : client.prefix;
      if (!message.content.startsWith(prefix)) return;

      if (getPrivado() && message.author.id !== client.ownerId) return;

      const args = message.content.slice(prefix.length).trim().split(/\s+/);
      const nombreComando = args.shift().toLowerCase();

      const comando = client.prefixCommands.get(nombreComando);
      if (!comando) return;

      if (comando.owner) {
        const autorizado = tieneAcceso(message.author.id, comando.nombre, client.ownerId);
        if (!autorizado) {
          return message.reply('❌ No tienes permiso para usar este comando.');
        }
      }

      try {
        await comando.ejecutar({ client, message, args });
      } catch (err) {
        console.error(`[ERROR] Al ejecutar ${nombreComando}:`, err);
        message.reply('❌ Ocurrió un error al ejecutar el comando.').catch(() => {});
      }
    },
  };
  