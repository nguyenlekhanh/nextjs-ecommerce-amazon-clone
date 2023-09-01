'use client';

import React from 'react'
import ProductItem from './ProductItem';

type ItemProps = {
  productData: ProductProps[]
}

const Products = ({ productData }: ItemProps) => {
  return (
    <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {productData.map(({
          _id,
          title,
          brand,
          category,
          description,
          image,
          isNew,
          oldPrice,
          price,
        }: ProductProps) => (
          <>
          <ProductItem 
            key={_id}
            _id={_id}
            title={title}
            brand={brand}
            category={category}
            description={description}
            image={image}
            isNew={isNew}
            oldPrice={oldPrice}
            price={price}
          />
          </>
      ))}
    </div>
  )
}

export default Products