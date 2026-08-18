import * as migration_20260725_114807_initial_payload_cms from './20260725_114807_initial_payload_cms';
import * as migration_20260725_134330_add_blog_posts from './20260725_134330_add_blog_posts';
import * as migration_20260818_113300_add_client_portal from './20260818_113300_add_client_portal';

export const migrations = [
  {
    up: migration_20260725_114807_initial_payload_cms.up,
    down: migration_20260725_114807_initial_payload_cms.down,
    name: '20260725_114807_initial_payload_cms',
  },
  {
    up: migration_20260725_134330_add_blog_posts.up,
    down: migration_20260725_134330_add_blog_posts.down,
    name: '20260725_134330_add_blog_posts'
  },
  {
    up: migration_20260818_113300_add_client_portal.up,
    down: migration_20260818_113300_add_client_portal.down,
    name: '20260818_113300_add_client_portal'
  },
];
