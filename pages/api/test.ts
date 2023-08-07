// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    message: process.env.NEXT_PUBLIC_WLD_APP_ID,
  });
}
