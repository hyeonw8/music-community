class MeAPI {
  constructor() {}

  async getMe() {}

  async getMyLikes() {
    const response = await fetch("http://localhost:3000/api/me/likes", { cache: "no-store" });
    // console.log("GET MY LIKESS___", response);
    const data = await response.json();

    return data;
  }

  async getMyPosts() {
    const response = await fetch("http://localhost:3000/api/me/posts", { cache: "no-store" });
    // console.log("GET MY POSTS___", response);
    const data = await response.json();

    return data;
  }
}

export default MeAPI;
