/**
 * Generate data for a number of posts, based on data from /users and /posts apis.
 * Will return an array containing such data, ready to use inside the Card component.
 */
export async function generatePostData(): Promise<PostData[] | null> {

  const API_USER = "https://jsonplaceholder.typicode.com/users";
  const API_POST = "https://jsonplaceholder.typicode.com/posts";
  const API_PHOTO = "https://picsum.photos"

  try {
    // getting data from both apis in one call
    const [userData, postData] = await Promise.all([fetch(API_USER), fetch(API_POST)])

    if (!userData.ok || !postData.ok) {
      throw new Error(`Error completing initial promise: ${userData.status}, ${postData.status}`)
    }


    const users = await userData.json()
    const posts = await postData.json()
    //TODO FIX TYPING
    const result: PostData[] = posts.map((post: any) => {
      const user = users.find((u: any) => u.id === post.userId)
      const name = user?.name || "Unknown"

      return {
        id: post.id,
        title: post.title,
        contents: post.body,
        // TODO - FIX THE TYPING
        author: { name },
        img: `${API_PHOTO}/seed/${name}/300/300`
      }
    })
    return result
  } catch (e) {
    console.error(`Catch block triggered: ${e}`)
    return null
  }

}
