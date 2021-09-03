function HomePage(props) {
  const { products } = props;
  console.table(products);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

//Lo que hace esta función es preparar los props para su compoenente
//Se ejecuta primero y despues el componenente 
//Ejecutar cualquier código  nunca sera visible del lado del cliente
export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "1", title: "Product  1" }],
    },
  };
}

export default HomePage;
