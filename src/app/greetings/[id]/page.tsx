import { getUrlData } from "@/app/actions"
import { notFound } from "next/navigation"
import AnimatedGreeting from "@/components/AnimatedGreeting"

export default async function GreetingPage({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any
}) {
  // No need to await params - it's a regular object
  const data = await getUrlData(params.id)

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />

      <AnimatedGreeting name={data.name} classStream={data.classStream} />
    </div>
  )
}

