import { siteSettings } from './singletons/siteSettings.ts'
import { homePage } from './singletons/homePage.ts'
import { batch } from './documents/batch.ts'
import { committeeMember } from './documents/committeeMember.ts'
import { teacherLeader } from './documents/teacherLeader.ts'
import { event } from './documents/event.ts'
import { post } from './documents/post.ts'
import { galleryAlbum } from './documents/galleryAlbum.ts'
import { wallMagazine } from './documents/wallMagazine.ts'
import { achievement } from './documents/achievement.ts'
import { seo } from './objects/seo.ts'
import {
  heroBlock,
  statsBlock,
  eventsBlock,
  postsBlock,
  committeeBlock,
  galleryBlock,
  scilabBlock,
  joinCtaBlock,
} from './objects/pageBuilder/blocks.ts'

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,

  // Documents
  batch,
  committeeMember,
  teacherLeader,
  event,
  post,
  galleryAlbum,
  wallMagazine,
  achievement,

  // Objects & Blocks
  seo,
  heroBlock,
  statsBlock,
  eventsBlock,
  postsBlock,
  committeeBlock,
  galleryBlock,
  scilabBlock,
  joinCtaBlock,
]
