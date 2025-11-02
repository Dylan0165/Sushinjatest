import './Products.css'

function Products() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '€29,99',
      image: '📦'
    },
    {
      id: 2,
      name: 'Product 2',
      price: '€39,99',
      image: '📦'
    },
    {
      id: 3,
      name: 'Product 3',
      price: '€49,99',
      image: '📦'
    },
    {
      id: 4,
      name: 'Product 4',
      price: '€59,99',
      image: '📦'
    }
  ]

  return (
    <section className="products" id="products">
      <div className="products-container">
        <h2>Onze populairste producten</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="add-to-cart">Toevoegen aan winkelwagen</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
