function UseIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UseIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
