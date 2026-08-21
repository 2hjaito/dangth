'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaUserEdit, FaTags } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'

interface Post {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  image?: string
  tags?: string[]
  arxiv?: string
  published: boolean
}

export default function PostListClient({ posts }: { posts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState<string>('')

  const tagCounts: Record<string, number> = {}
  posts.forEach((post) => {
    // Chỉ tính tag của các bài đã được xuất bản (để đồng nhất với sortedPosts)
    if (post.published) {
      post.tags?.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // 🔥 ĐÃ SỬA: Lọc bỏ các tag có count = 1
  const allTags = Object.entries(tagCounts)
    .filter(([, count]) => count > 1) // Chỉ giữ lại tag có số lượng > 1
    .sort((a, b) => b[1] - a[1]) // Sắp xếp theo thứ tự giảm dần của số lượng
  const sortedPosts = [...posts]
    .filter((post) => post.published) // 👈 lọc chỉ các bài viết đã được xuất bản
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())


  const filteredPosts = selectedTag
    ? sortedPosts.filter((post) => post.tags?.includes(selectedTag))
    : sortedPosts

  return (
    <div className="pt-[50px] max-w-[700px] mx-auto px-4 pb-24 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">
      <h1 className="text-[32px] font-semibold mb-4">Post</h1>

      {/* Tag filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedTag('')}
          className={`px-3 py-1 rounded-full border text-sm transition ${selectedTag === ''
            ? 'bg-white text-blue-600 border-blue-600 font-semibold'
            : 'bg-indigo-400 text-white border-indigo-500 hover:bg-indigo-500'
            }`}
        >
          Show All <span className="ml-1 font-bold">{posts.length}</span>
        </button>

        {allTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full border text-sm transition ${selectedTag === tag
              ? 'bg-white text-blue-600 border-blue-600 font-semibold'
              : 'bg-indigo-400 text-white border-indigo-500 hover:bg-indigo-500'
              }`}
          >
            {tag} <span className="ml-1 font-bold">{count}</span>
          </button>
        ))}
      </div>

      {filteredPosts.map((post) => (
        <div
          key={post.slug}
          className="flex flex-col sm:flex-row gap-4 border-b pb-6 mt-6"
        >
          {/* Thumbnail */}
          <div className="w-full sm:w-[220px] flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[16/9] sm:h-[120px] object-cover rounded-md border dark:border-gray-700"
            />

          </div>

          {/* Post Info */}
          <div className="flex-1 flex flex-col gap-2">
            <Link
              href={`/post/${post.slug}`}
              className="text-[20px] font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>

            {post.subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.subtitle}</p>
            )}

            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
              <span className="flex items-center gap-1">
                <FaUserEdit />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <MdDateRange />
                {typeof post.date === 'string'
                  ? post.date
                  : new Date(post.date).toISOString().slice(0, 10)}
              </span>
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mt-1">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Arxiv link */}
            {post.arxiv && (
              <Link
                href={post.arxiv}
                target="_blank"
                className="text-sm text-blue-500 mt-1 hover:underline"
              >
                Xem trên arXiv →
              </Link>
            )}
          </div>
        </div>
      ))}


    </div>
  )
}
