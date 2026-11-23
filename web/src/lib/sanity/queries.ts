import { groq } from 'next-sanity'

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    logo,
    contactInfo,
    socialLinks,
    defaultSeo
  }
`

// Home Page Builder query
export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    title,
    sections,
    seo
  }
`

// Teacher Panel (excluding paused members)
export const teachersQuery = groq`
  *[_type == "teacherLeader" && (!defined(isPaused) || isPaused == false)] | order(order asc){
    _id,
    name,
    role,
    department,
    photo,
    order
  }
`

// Current Active Executive Committee (all un-paused members)
export const currentCommitteeQuery = groq`
  *[_type == "committeeMember" && batch->isCurrent == true && (!defined(isPaused) || isPaused == false)] | order(order asc){
    _id,
    name,
    role,
    photo,
    about,
    socialLinks,
    order,
    batch->{
      _id,
      sessionName,
      slug,
      academicYear,
      isCurrent
    }
  }
`

// All Batches / Sessions
export const batchesQuery = groq`
  *[_type == "batch"] | order(order desc, sessionName desc){
    _id,
    sessionName,
    "slug": slug.current,
    academicYear,
    isCurrent,
    order,
    "memberCount": count(*[_type == "committeeMember" && references(^._id) && (!defined(isPaused) || isPaused == false)]),
    "previewMembers": *[_type == "committeeMember" && references(^._id) && (!defined(isPaused) || isPaused == false)] | order(order asc)[0...6]{
      _id,
      name,
      role,
      photo
    }
  }
`

// Committee members by Batch Slug (for dedicated historical batch page /committee/[batch])
export const committeeByBatchQuery = groq`
  *[_type == "batch" && slug.current == $slug][0]{
    _id,
    sessionName,
    academicYear,
    isCurrent,
    "members": *[_type == "committeeMember" && references(^._id) && (!defined(isPaused) || isPaused == false)] | order(order asc){
      _id,
      name,
      role,
      photo,
      about,
      socialLinks,
      order
    }
  }
`

// Events
export const eventsQuery = groq`
  *[_type == "event"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    eventDate,
    coverImage,
    shortDescription,
    facebookUrl,
    featuredOnHome,
    galleryPhotos
  }
`

// Posts & News (Wednesday Wonders & Announcements)
export const postsQuery = groq`
  *[_type == "post"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    coverImage,
    excerpt,
    facebookUrl,
    featuredOnHome
  }
`

// Gallery Albums
export const galleryAlbumsQuery = groq`
  *[_type == "galleryAlbum"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    coverPhoto,
    photos,
    featuredOnHome
  }
`

// Digital Wall Magazines
export const wallMagazinesQuery = groq`
  *[_type == "wallMagazine"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    edition,
    publishDate,
    coverImage,
    "pdfUrl": pdfFile.asset->url,
    externalReadUrl,
    description
  }
`

// Achievements
export const achievementsQuery = groq`
  *[_type == "achievement"] | order(order asc, _createdAt desc){
    _id,
    title,
    year,
    description,
    image
  }
`
