import dbConnect from "../../../../config/db";
import PostItem from "../../../../models/Postitem";

dbConnect();

export async function GET() {
    const postItems = await PostItem.find();
    return Response.json(postItems);
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
