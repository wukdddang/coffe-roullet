import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(request: NextApiRequest) {
  await connectMongoDB();

  try {
    const { participants } = request.body; // 요청 본문에서 참가자 목록 추출
    console.log(participants);

    if (!participants || !Array.isArray(participants)) {
      return NextResponse.json({ message: "Invalid participants array" });
    }

    // 각 참가자의 participation 값을 +1 증가
    await Promise.all(
      participants.map(async (participate) => {
        await User.findOneAndUpdate(
          { name: participate.name },
          { $inc: { participationCount: 1 } },
          { new: true }
        );
      })
    );

    NextResponse.json({ message: "Participation updated successfully" });
  } catch (error) {
    NextResponse.json({ message: "Server error", error: error });
  }
}
