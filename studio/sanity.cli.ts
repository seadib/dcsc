import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 't5npxsw7',
    dataset: 'production',
  },
  studioHost: 'dcsc',
  autoUpdates: false,
})

