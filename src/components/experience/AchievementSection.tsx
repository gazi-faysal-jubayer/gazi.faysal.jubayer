import { ACHIEVEMENTS } from "@/lib/constants";
import {
  getAchievementThumbnail,
  readAchievementMedia,
} from "@/lib/achievement-media";
import { AchievementDock } from "./AchievementDock";

export function AchievementSection() {
  const achievements = ACHIEVEMENTS.map((item) => {
    const media = readAchievementMedia(item.id);
    return {
      ...item,
      media,
      thumbnail: getAchievementThumbnail(item.id, media),
    };
  });

  return <AchievementDock achievements={achievements} />;
}
