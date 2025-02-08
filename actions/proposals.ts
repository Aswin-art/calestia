"use server";

import { db } from "@/lib/db";

const checkSlotUser = async (user_id: string) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const proposalCount = await db.proposals.count({
      where: {
        user_id,
        is_emergency: false,
        created_at: {
          gte: oneMonthAgo,
        },
      },
    });

    return proposalCount < 2;
  } catch (err) {
    console.error("Error checking user slot:", err);
    return false;
  }
};

export const insert = async (
  title: string,
  description: string,
  wallet_address: string,
  is_emergency: boolean,
) => {
  if (!title.trim() || !description.trim()) {
    console.warn("Title and description are required.");
    return null;
  }

  try {
    const user = await db.users.findFirst({
      where: { wallet_address },
    });

    if (!user) {
      console.warn("User not found.");
      return null;
    }

    const hasSlot = await checkSlotUser(user.id);
    if (!hasSlot) {
      console.warn(`User ${user.id} has reached the proposal limit.`);
      return null;
    }

    return await db.proposals.create({
      data: { title, description, is_emergency, user_id: user.id },
    });
  } catch (err) {
    console.error("Error inserting proposal:", err);
    return null;
  }
};

export const alreadyVote = async (proposal_id: string, user_id: string) => {
  try {
    const vote = await db.userVotes.findFirst({
      where: {
        proposal_id,
        user_id,
      },
    });

    return vote;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const votesProposal = async (
  id: string,
  user_wallet: string,
  vote: boolean,
) => {
  try {
    const proposal = await db.proposals.findUnique({
      where: { id },
    });

    const user = await db.users.findUnique({
      where: { wallet_address: user_wallet },
    });

    if (!user || !proposal || user.subscription === null) return null;

    const isVoted = await alreadyVote(proposal.id, user.id);
    if (isVoted) return null;

    const votesWeight = user.subscription - 1;

    const votes = await db.userVotes.create({
      data: {
        proposal_id: proposal.id,
        user_id: user.id,
        votes: vote,
        votes_weight: votesWeight,
      },
    });

    if (!votes) return null;

    await db.proposals.update({
      where: { id },
      data: {
        upvote: vote ? { increment: votesWeight } : undefined,
        downvote: !vote ? { increment: votesWeight } : undefined,
      },
    });

    return true;
  } catch (err) {
    console.error("Error voting on proposal:", err);
    return null;
  }
};

export const getAllData = async () => {
  try {
    const proposals = await db.proposals.findMany({
      include: {
        UserVotes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return proposals;
  } catch (err) {
    console.log(err);
    return null;
  }
};
