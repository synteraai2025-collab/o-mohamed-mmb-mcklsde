import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const sql = 'SELECT id, name_ar, description_ar, price, image_url FROM products ORDER BY created_at DESC'
    const result = await query(sql)
    
    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    
    return NextResponse.json(
      { 
        error: 'فشل في تحميل المنتجات',
        message: error instanceof Error ? error.message : 'حدث خطأ غير متوقع'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
