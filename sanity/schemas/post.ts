import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { PencilSwooshIcon } from '~/assets'
import { readingTimeType } from '~/sanity/schemas/types/readingTime'

export const Post = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  mainImage: z.object({
    _ref: z.string(),
    asset: z.object({
      url: z.string(),
      lqip: z.string().optional(),
      dominant: z
        .object({
          background: z.string(),
          foreground: z.string(),
        })
        .optional(),
    }),
  }),
  publishedAt: z.string(),
  description: z.string(),
  excerpt: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  body: z.any(),
  contentType: z.enum(['richText', 'markdown']).optional(),
  markdown: z.string().optional(),
  readingTime: z.number(),
  mood: z.enum(['happy', 'sad', 'neutral']),
})
export type Post = z.infer<typeof Post>
export type PostDetail = Post & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headings: any[]
  related?: Post[]
}

export default defineType({
  name: 'post',
  title: '文章',
  type: 'document',
  icon: PencilSwooshIcon,
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '链接标识符',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: '分类',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: '主图',
      type: 'image',
      description: 'This image will be used for the preview (1200 x 675px)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '简介',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Meta Description',
      type: 'text',
      description: '用于SEO和社交媒体分享 (建议150-160字符)',
      rows: 2,
    }),
    defineField({
      name: 'keywords',
      title: '关键词',
      type: 'array',
      description: '用于SEO的关键词列表',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contentType',
      title: '内容类型',
      type: 'string',
      options: {
        list: [
          { title: '富文本编辑器', value: 'richText' },
          { title: 'Markdown', value: 'markdown' },
        ],
        layout: 'radio',
      },
      initialValue: 'richText',
    }),
    defineField({
      name: 'body',
      title: '内容 (富文本)',
      type: 'blockContent',
      hidden: ({ document }) => document?.contentType === 'markdown',
    }),
    defineField({
      name: 'markdown',
      title: '内容 (Markdown)',
      description: '直接粘贴Markdown内容，支持链接、加粗、图片等格式',
      type: 'text',
      rows: 20,
      hidden: ({ document }) => document?.contentType === 'richText',
    }),
    defineField({
      name: 'readingTime',
      title: '阅读时长（分钟）',
      type: readingTimeType.name,
      validation: (Rule) => Rule.required(),
      options: {
        source: 'body',
      },
    }),
    defineField({
      name: 'mood',
      title: '文章情绪',
      type: 'string',
      options: {
        list: [
          { title: 'Neutral', value: 'neutral' },
          { title: 'Happy', value: 'happy' },
          { title: 'Sad', value: 'sad' },
        ],
        layout: 'radio',
      },
    }),
  ],

  initialValue: () => ({
    publishedAt: new Date().toISOString(),
    mood: 'neutral',
    readingTime: 0,
    contentType: 'richText',
  }),

  preview: {
    select: {
      title: 'title',
      author: 'slug',
      media: 'mainImage',
    },
  },
})
