import express from "express";
import { createVote } from "../controller/index.js";
import {
  getAllPolls,
  getAnswers,
  getPoll,
  getPollVotes,
} from "../service/index.js";

const pollRouter = express.Router();

// APIs
// GET all polls
pollRouter.get("/poll", async (req, res) => {
  try {
    const polls = await getAllPolls();
    if (!polls) {
      throw Error("No poll records found.");
    }
    let response = [];
    for (const poll of polls) {
      let totalVoteCount = 0;
      const answers = await getAnswers(poll.id);
      for (const answer of answers) {
        const voteCount = await getPollVotes(answer.id);
        answer["voteCount"] = voteCount;
        totalVoteCount += voteCount;
      }
      const res = { ...poll, answers: answers, totalVoteCount: totalVoteCount };
      response.push(res);
    }
    res.status(200).send({ polls: response });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
});

// GET poll details
pollRouter.get("/poll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await getPoll(id);
    if (!poll) {
      throw Error("No poll records found.");
    }

    const answers = await getAnswers(poll.id);
    let totalVoteCount = 0;
    for (const answer of answers) {
      const voteCount = await getPollVotes(answer.id);
      answer["voteCount"] = voteCount;
      totalVoteCount += voteCount;
    }
    const resObj = {
      ...poll,
      answers: answers,
      totalVoteCount: totalVoteCount,
    };

    res.status(200).send(resObj);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
});

// POST a vote
pollRouter.post("/poll", async (req, res) => {
  try {
    const { poll_id, answers } = req.body;
    if (!poll_id) {
      throw Error("Please provide poll id.");
    }
    if (!answers) {
      throw Error("Please provide answer(s).");
    }
    const result = await createVote(poll_id, answers);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }
});

export { pollRouter };
