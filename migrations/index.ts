import * as migration_20260725_113845_initial_payload_cms from './20260725_113845_initial_payload_cms';

export const migrations = [
  {
    up: migration_20260725_113845_initial_payload_cms.up,
    down: migration_20260725_113845_initial_payload_cms.down,
    name: '20260725_113845_initial_payload_cms'
  },
];
