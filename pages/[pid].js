import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailpage(props) {
  const { loadedProduct } = props;

  //console.log(loadedProduct);
  //Comprobar si ya esta allí
  if (!loadedProduct) {
    return <p>Loading....</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  //Obtener id de producto
  //Nombre del mismo archivo pid
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  //filtrar
  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

//El objetivo de esta función es decirle a Nextjs que instancias de está página dinámica debe ser generado
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }],
    fallback: true,
    //Esperará para que esta página esté completamente en el servidor
    // fallback: 'blocking'
  };
}

export default ProductDetailpage;
