import axios from 'axios';
import { Strapi } from '@strapi/strapi';
import { ArrayBindingElement } from 'typescript';

// axios.get('http://localhost:1337/api/kru-paul-website?populate=deep').then(response => {
//   console.log(response.data);
// });

type Props = {
  content: any;
  ctx: object;
  subMediaCard: ArrayBindingElement
}





export default function About ({content} : Props) {
  console.log(content)

  return (
    <div>
      <h1>{content.About.Title}</h1>
      {content.About.subMediaCard.map( (card:any) => {
        return(
          <div>
            {card.Description}
          </div>

        )
      })}
    </div>
  )
}


About.getInitialProps = async () => {
  try {
    const res = await axios.get('http://localhost:1337/api/kru-paul-website?populate=deep');
    const content = res.data.data?.attributes;
    return {content}
  } catch (error) {
    return {error}
  }
}