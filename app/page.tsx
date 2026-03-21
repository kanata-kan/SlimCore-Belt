import { redirect } from 'next/navigation'

/**
 * Root page redirects to /landing
 * This keeps the URL clean and allows future A/B testing
 * by adding /landing-v2, /landing-b, etc.
 */
export default function RootPage() {
  redirect('/landing')
}
