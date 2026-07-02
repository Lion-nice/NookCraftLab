import type { BlogPost } from './blog-data'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'NookCraftLab',
      url: 'https://nookcraftlab.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NookCraftLab',
      url: 'https://nookcraftlab.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NookCraftLab',
    description: 'Custom mechanical keyboard studio. Premium artisan keycaps, custom keyboards, and bespoke typing experiences.',
    url: url,
    author: {
      '@type': 'Organization',
      name: 'NookCraftLab',
      email: 'utopang@foxmail.com',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NookCraftLab',
    url: 'https://nookcraftlab.com',
    description: 'Custom mechanical keyboard studio specializing in artisan keycaps, custom keyboards, and bespoke typing experiences.',
    email: 'utopang@foxmail.com',
    foundingDate: '2025',
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
