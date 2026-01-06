import ArabicHeroSection from '@/components/ArabicHeroSection'
import ArabicProductGrid from '@/components/ArabicProductGrid'

interface PageProps {
  params: {
    lang: string
  }
}

export default function ArabicLandingPage({ params }: PageProps) {
  const { lang } = params

  // Only render Arabic content for Arabic locale
  if (lang !== 'ar') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">اللغة غير مدعومة</h1>
          <p className="text-muted-foreground">
            هذه الصفحة متوفرة فقط باللغة العربية
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Arabic Hero Section */}
      <ArabicHeroSection />
      
      {/* Arabic Product Grid */}
      <ArabicProductGrid />
    </div>
  )
}

// Generate static params for build time
export async function generateStaticParams() {
  return [
    { lang: 'ar' },
    // Add other supported locales here if needed
  ]
}
