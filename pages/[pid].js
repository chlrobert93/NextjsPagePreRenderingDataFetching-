import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailpage(props) {
  const { loadedProduct } = props;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{ loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps() {
  const { params } = context;

  //Obtener id de producto
  //Nombre del mismo archivo pid
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const product = JSON.parse(jsonData);
  //filtrar
  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },  
  };
}

export default ProductDetailpage;
