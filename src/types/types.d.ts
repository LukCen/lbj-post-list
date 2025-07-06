/**
 * Dane dla pojedyńczej karty w komponencie Card
 */
type PostData = {
  id: number,
  title: string,
  contents: string,
  author: {
    name: string
  },
  img: string
}


type ApiUser = {
  id: number;
  name: string;

}

type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
}
