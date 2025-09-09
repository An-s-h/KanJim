import { Request, Response } from "express";
import Kanji from "../models/KanjiModel";

export const getKanjis = async (req: Request, res: Response) => {
  try {
    const { level } = req.params; // <-- from /api/v1/kanji/:level
    const { tag, set } = req.query; // optional query filters

    let filter: any = {};
    if (level) filter.level = level;
    if (tag) filter.tags = tag;
    if (set) filter.tags = set;

    const kanjis = await Kanji.find(filter);

    res.status(200).json({
      count: kanjis.length,
      kanjis,
    });
  } catch (err) {
    console.error("Error fetching kanji:", err);
    res.status(500).json({ message: "Failed to fetch kanji" });
  }
};
