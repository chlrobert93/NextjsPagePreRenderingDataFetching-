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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  //Obtener id de producto
  //Nombre del mismo archivo pid
  const productId = params.pid;
  //Obtener datos de la función
  const data = await getData();
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
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pod: id } }));

  return {
    //paths: [{ params: { pid: "p1" } }],
    path: params,
    fallback: false,
    //Esperará para que esta página esté completamente en el servidor
    // fallback: 'blocking'
  };
}

export default ProductDetailpage;
