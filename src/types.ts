import { z } from "zod";

export type OnBoardingParams = {
  username: string;
  displayName: string;
  jwtToken: string;
  bio: string;
  upiId: string;
};

export type UpdateStreameType = {
  username: string;
  displayName: string;
  jwtToken: string;
  bio: string;
  upiId: string;
};

export const updateStreamerParams = z.object({
  displayName: z.string().min(1, "Required"),
  bio: z.string().min(1, "Required"),
  upiId: z.string().min(1, "Required"),
});
