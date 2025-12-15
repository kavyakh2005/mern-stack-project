import ProductCard from '@/components/website/Card'
import React from 'react'
import { getProducts } from '@/library/api-call';

export default async function page() {
  const product = await getProducts();
  // console.log(product)
  const data = product.data
  return (
    <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-4 gap-4'>
      {
        data.map((product) => {
          return <ProductCard product={product} key={product._id} />
        })
      }
    </div>
  )
}
