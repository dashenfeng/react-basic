import { useParams, useSearchParams } from "react-router-dom";

function Article() {
  /* useSearchParams传参 */
  // const [params] = useSearchParams() //params为里面有的属性，解构出来
  // console.log(params);
  // const id = params.get('id')
  // const name = params.get('name')

  /* useParams传参 */
  const params = useParams();
  let id = params.id;
  let name = params.name;

  return (
    <div>
      {id}--{name}
    </div>
  );
}

export default Article;
