'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Filter, Search, Smartphone, Laptop, Headphones, Tablet, Watch } from 'lucide-react'

interface Product {
  id: string
  name_ar: string
  description_ar: string
  price: number
  image_url: string
  category?: string
  rating?: number
  in_stock?: boolean
}

export default function ArabicProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [sortBy, setSortBy] = useState('الأحدث')

  const categories = ['الكل', 'هواتف', 'لابتوبات', 'سماعات', 'أجهزة لوحية', 'ساعات ذكية']
  const sortOptions = ['الأحدث', 'الأقل سعراً', 'الأعلى سعراً', 'الأعلى تقييماً']

  const getDefaultIcon = (category: string) => {
    switch (category) {
      case 'هواتف':
        return <Smartphone className="w-16 h-16 text-primary" />
      case 'لابتوبات':
        return <Laptop className="w-16 h-16 text-primary" />
      case 'سماعات':
        return <Headphones className="w-16 h-16 text-primary" />
      case 'أجهزة لوحية':
        return <Tablet className="w-16 h-16 text-primary" />
      case 'ساعات ذكية':
        return <Watch className="w-16 h-16 text-primary" />
      default:
        return <Smartphone className="w-16 h-16 text-primary" />
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
      
      if (!response.ok) {
        throw new Error('فشل في تحميل المنتجات')
      }
      
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل المنتجات')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description_ar.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'الأقل سعراً':
        return a.price - b.price
      case 'الأعلى سعراً':
        return b.price - a.price
      case 'الأعلى تقييماً':
        return (b.rating || 0) - (a.rating || 0)
      case 'الأحدث':
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full animate-pulse mx-auto mb-4"></div>
            <div className="h-8 bg-primary/10 rounded animate-pulse w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted/20 rounded animate-pulse w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4"></div>
                  <div className="h-6 bg-primary/10 rounded w-3/4 mx-auto"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/20 rounded w-full"></div>
                    <div className="h-4 bg-muted/20 rounded w-2/3"></div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="h-6 bg-primary/10 rounded w-20"></div>
                    <div className="h-8 bg-primary/20 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <div className="text-destructive text-xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-destructive mb-2">حدث خطأ أثناء تحميل المنتجات</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchProducts} variant="outline">
              حاول مرة أخرى
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            <Star className="w-4 h-4 ml-2" />
            مجموعة واسعة من المنتجات
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            جميع المنتجات
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف مجموعتنا الواسعة من أحدث الأجهزة التقنية والإلكترونيات بأفضل الأسعار
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pr-10 pl-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            تم العثور على {sortedProducts.length} منتج
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد منتجات مطابقة</h3>
            <p className="text-muted-foreground mb-4">
              حاول تغيير معايير البحث أو تصفح جميع المنتجات
            </p>
            <Button onClick={() => {setSearchTerm(''); setSelectedCategory('الكل')}} variant="outline">
              عرض جميع المنتجات
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name_ar}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center">
                        {getDefaultIcon(product.category || '')}
                      </div>
                    )}
                    {product.rating && (
                      <Badge variant="secondary" className="absolute top-2 left-2">
                        <Star className="w-3 h-3 ml-1 fill-current" />
                        {product.rating}
                      </Badge>
                    )}
                    {!product.in_stock && (
                      <Badge variant="destructive" className="absolute top-2 right-2">
                        غير متوفر
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold text-right line-clamp-2">
                    {product.name_ar}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-right mb-4 text-sm line-clamp-3">
                    {product.description_ar}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <span className="text-xl font-bold text-primary">
                        {product.price.toLocaleString()} ر.س
                      </span>
                      {product.category && (
                        <Badge variant="outline" className="block mt-1 text-xs">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="default"
                      disabled={!product.in_stock}
                      className="group-hover:scale-105 transition-transform"
                    >
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      {product.in_stock ? 'أضف للسلة' : 'غير متوفر'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
