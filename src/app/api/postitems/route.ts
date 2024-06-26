import dbConnect from "../../../../config/db";
import PostItem from "../../../../models/Postitem";

dbConnect();

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const start = parseInt(url.searchParams.get("start") || "0");
  const perPage = parseInt(url.searchParams.get("perPage") || "10");
  const searchQuery = url.searchParams.get("search") || "";
  const isTrending = url.searchParams.get("trending") === "true";

  try {
    let query: any = {};

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    if (isTrending) {
      query.trending = true;
    }

    const totalItems = await PostItem.countDocuments(query);
    const postItems = await PostItem.find(query)
      .sort({ date: -1 }) // Mengurutkan berdasarkan tanggal
      .skip(start)
      .limit(perPage);

    return new Response(JSON.stringify({ items: postItems, totalCount: totalItems }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "SERVER ERROR" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const postItem = await request.json();

  try {
    const savedItem = await new PostItem({ ...postItem }).save();
    return new Response(JSON.stringify(savedItem), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "SERVER ERROR" }), {
      status: 500,
    });
  }
}
