/**
 * Contents of a single card inside the Card component
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
