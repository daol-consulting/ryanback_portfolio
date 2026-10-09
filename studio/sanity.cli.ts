import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'z0se41xa',
    dataset: 'production',
  },
  studioHost: 'ryanback-portfolio',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'vjyt3dkv3k4smuuebrerwjih',
  },
})
