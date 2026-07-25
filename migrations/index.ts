import * as migration_20260725_114807_initial_payload_cms from './20260725_114807_initial_payload_cms';
import * as migration_20260725_134330_add_blog_posts from './20260725_134330_add_blog_posts';

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
];
