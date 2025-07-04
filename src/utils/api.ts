/**
 * Generate data for a number of posts, based on data from /users and /posts apis.
 * Will return an array containing such data, ready to use inside the Card component.
 */
export async function generatePostData(numberOfPosts: number = 1): Promise<PostData[] | null> {

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

    const result: PostData[] = []

    for (let i = 0; i < numberOfPosts && i < posts.length; i++) {
      const name = users.find((n: any) => n.id === posts[i].userId)?.name || "Unknown"
      const post: PostData = {
        id: posts[i].id,
        title: posts[i].title,
        contents: posts[i].body,
        // TODO - FIX THE TYPING
        // author_name: users.find((n: any) => n.id === posts[i].userId)?.name || "Unknown",
        author: {
          name: name
        },
        img: `${API_PHOTO}/seed/${name}/300/300`
      }
      result.push(post)
    }
    return result
  } catch (e) {
    console.error(`Catch block triggered: ${e}`)
    return null
  }

}
