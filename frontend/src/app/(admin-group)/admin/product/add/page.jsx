import ProductForm from '@/components/admin/ProductAdd'
import { getBrand, getCategories, getColor } from '@/library/api-call'
import React from 'react'

export default async function page() {
  const categoryJSON = await getCategories()
  const brandJSON = await getBrand();
  const colorJSON = await getColor();
  return (
    <div>
      <ProductForm category={categoryJSON.data} brand={brandJSON.data} color={colorJSON.data} />
    </div>
  )
}
