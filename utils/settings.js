import { readFileSync, writeFileSync, existsSync } from 'fs';
  import { join, dirname } from 'path';
  import { fileURLToPath } from 'url';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const RUTA = join(__dirname, '..', 'settings.json');

  const DEFAULT = {
    status: null, prefixes: {}, logKeyChannels: {},
    logTicketOpenChannels: {}, logTicketCloseChannels: {}, ticketCounters: {}, verifyChannels: {},
  };

  function cargar() {
    if (!existsSync(RUTA)) return { ...DEFAULT };
    try { return JSON.parse(readFileSync(RUTA, 'utf-8')); }
    catch { return { ...DEFAULT }; }
  }
  function guardar(data) { writeFileSync(RUTA, JSON.stringify(data, null, 2), 'utf-8'); }

  export function getPrefix(guildId) { return cargar().prefixes?.[guildId] || '!'; }
  export function setPrefix(guildId, prefix) {
    const s = cargar(); if (!s.prefixes) s.prefixes = {};
    s.prefixes[guildId] = prefix; guardar(s);
  }

  export function getStatus() { return cargar().status || null; }
  export function setStatus(type, text, state) {
    const s = cargar(); s.status = { type, text, state }; guardar(s);
  }
  export function clearStatus() { const s = cargar(); s.status = null; guardar(s); }

  export function getLogKeyChannel(guildId) { return cargar().logKeyChannels?.[guildId] || null; }
  export function setLogKeyChannel(guildId, channelId) {
    const s = cargar(); if (!s.logKeyChannels) s.logKeyChannels = {};
    if (channelId === null) delete s.logKeyChannels[guildId];
    else s.logKeyChannels[guildId] = channelId;
    guardar(s);
  }

  export function getLogTicketOpenChannel(guildId) { return cargar().logTicketOpenChannels?.[guildId] || null; }
  export function setLogTicketOpenChannel(guildId, channelId) {
    const s = cargar(); if (!s.logTicketOpenChannels) s.logTicketOpenChannels = {};
    if (channelId === null) delete s.logTicketOpenChannels[guildId];
    else s.logTicketOpenChannels[guildId] = channelId;
    guardar(s);
  }

  export function getLogTicketCloseChannel(guildId) { return cargar().logTicketCloseChannels?.[guildId] || null; }
  export function setLogTicketCloseChannel(guildId, channelId) {
    const s = cargar(); if (!s.logTicketCloseChannels) s.logTicketCloseChannels = {};
    if (channelId === null) delete s.logTicketCloseChannels[guildId];
    else s.logTicketCloseChannels[guildId] = channelId;
    guardar(s);
  }

  export function getLogTicketChannel(guildId) { return getLogTicketOpenChannel(guildId); }
  export function setLogTicketChannel(guildId, channelId) { setLogTicketOpenChannel(guildId, channelId); }

  export function getNextTicketNumber(guildId) {
    const s = cargar(); if (!s.ticketCounters) s.ticketCounters = {};
    const next = (s.ticketCounters[guildId] || 0) + 1;
    s.ticketCounters[guildId] = next; guardar(s);
    return String(next).padStart(4, '0');
  }

  export function getVerifyChannel(guildId) { return cargar().verifyChannels?.[guildId] || null; }
  export function setVerifyChannel(guildId, channelId) {
    const s = cargar(); if (!s.verifyChannels) s.verifyChannels = {};
    if (channelId === null) delete s.verifyChannels[guildId];
    else s.verifyChannels[guildId] = channelId;
    guardar(s);
  }
  