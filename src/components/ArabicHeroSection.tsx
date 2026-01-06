import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Zap, Smartphone, Laptop, Headphones } from 'lucide-react'

interface FeaturedProduct {
  id: string
  name_ar: string
  description_ar: string
  price: number
  image_url: string
}

async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featured-products`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured products')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export default async function ArabicHeroSection() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            <Zap className="w-4 h-4 ml-2" />
            عروض حصرية لفترة محدودة
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            مرحباً بكم في متجر التكنولوجيا
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            اكتشف أحدث التقنيات والأجهزة الذكية بأفضل الأسعار. نوفر لك تجربة تسوق استثنائية مع ضمان الجودة والخدمة المميزة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <ShoppingCart className="w-5 h-5 ml-2" />
              تسوق الآن
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              تصفح المنتجات
            </Button>
          </div>
        </div>

        {/* Featured Products Grid */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">المنتجات المميزة</h2>
              <Badge variant="default" className="text-sm">
                <Star className="w-4 h-4 ml-1" />
                الأكثر مبيعاً
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name_ar}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center justify-center space-x-4">
                          <Smartphone className="w-12 h-12 text-primary" />
                          <Laptop className="w-12 h-12 text-accent" />
                          <Headphones className="w-12 h-12 text-primary" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl font-semibold text-right">
                      {product.name_ar}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-right mb-4 text-base">
                      {product.description_ar}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.price} ر.س
                      </span>
                      <Button size="sm" variant="default">
                        <ShoppingCart className="w-4 h-4 ml-2" />
                        أضف للسلة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Promotional Banner */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-right mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  خصم 25% على جميع الهواتف الذكية
                </h3>
                <p className="text-lg opacity-90">
                  استخدم كود الخصم: TECH25 للحصول على خصم إضافي
                </p>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                احصل على الخصم
                <Zap className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">توصيل سريع</h4>
            <p className="text-muted-foreground">
              توصيل خلال 24-48 ساعة لجميع أنحاء المملكة
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-xl font-semibold mb-2">ضمان الجودة</h4>
            <p className="text-muted-foreground">
              ضمان شامل على جميع المنتجات لمدة تصل إلى سنتين
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">دفع آمن</h4>
            <p className="text-muted-foreground">
              خيارات دفع متعددة وآمنة لراحتك
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
