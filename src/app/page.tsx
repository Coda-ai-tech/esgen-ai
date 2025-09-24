import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root to /en for now
  redirect('/en');
}
