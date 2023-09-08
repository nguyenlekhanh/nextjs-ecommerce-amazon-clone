'use client';

import React from 'react'
import ProductItem from './ProductItem';

type ItemProps = {
  productData: ProductProps[] | null
}

const Products = ({ productData }: ItemProps) => {
  return (
    <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {productData && productData.map(({
          _id,
          id,
          title,
          brand,
          category,
          description,
          image,
          isNew,
          oldPrice,
          price,
        }: ProductProps) => {
          const uniqueKey = id;
        return (
          <ProductItem 
            key={uniqueKey}
            _id={_id}
            id={id}
            title={title}
            brand={brand}
            category={category}
            description={description}
            image={image}
            isNew={isNew}
            oldPrice={oldPrice}
            price={price}
          />
      )})}
    </div>
  )
}

export default Products