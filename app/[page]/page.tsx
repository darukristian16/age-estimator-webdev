import { notFound } from 'next/navigation'

export default function DynamicPage({ params }: { params: { page: string } }) {
  switch (params.page) {
    case 'name':
      return <div>Name Page Content</div>
    case 'start':
      return <div>Start Page Content</div>
    default:
      notFound()
  }
}
