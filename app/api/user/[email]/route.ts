import { connectDB } from "@/lib/mongoDBConnect";
import User from "@/models/User";
import { Favorite } from "@mui/icons-material";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { email: String } }
) => {
  try {
    await connectDB();

    const { email } = params;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Faild to get user ${error?.message}`);
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { email: String } }
) => {
  try {
    await connectDB();

    const { email } = params;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }
    const { movieId } = await req.json();
    const isFavorite = user.favorites.includes(movieId);
    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (item: number) => item !== movieId
      );
    } else {
      user.favorites.push(movieId);
    }
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Faild to get user ${error?.message}`);
  }
};
