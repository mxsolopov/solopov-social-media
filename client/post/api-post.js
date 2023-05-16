const create = async (params, credentials, post) => {
  try {
    let response = await fetch("/api/posts/new/" + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(post),
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/posts/feed/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { create, listNewsFeed }
