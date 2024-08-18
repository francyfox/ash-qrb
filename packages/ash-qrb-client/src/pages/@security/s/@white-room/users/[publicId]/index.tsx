import { useRouter } from 'next/router'

export default function UsersPage() {
  const router = useRouter()
  return (
    <>
      <h1 className="text-4xl">you are logged {router.query.publicId}</h1>
    </>
  )
}
