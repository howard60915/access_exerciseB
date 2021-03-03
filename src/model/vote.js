import database from "../database";

const Vote = database.model("Vote", {
	tableName: "vote",
});

export const voteDefs = `
	type Vote {
		id: Int
		yes: Boolean
		no: Boolean
		mobile: String
	}

	type VotedResult {
		positive: Int
		negative: Int
		invalid: Int
	}

	type Query {
		queryVotes: VotedResult
	}

	input AddVoteInput {
		mobile: String!
		yes: Boolean
		no: Boolean
	}

	type AddVoteResult {
		voted: Boolean!
		error: String
	}

	type Mutation {
		addVote(input: AddVoteInput): AddVoteResult
	}
`;

export const resolvers = {
	Query: {
		queryVotes: async () => {
			const votes = await new Vote().fetchAll();
			const result = votes.reduce(
				(prev, { attributes }) => {
					if (attributes.yes && !attributes.no) {
						prev.positive += 1;
					} else if (!attributes.yes && attributes.no) {
						prev.negative += 1;
					} else {
						prev.invalid += 1;
					}
					return prev;
				},
				{
					positive: 0,
					negative: 0,
					invalid: 0,
				},
			);
			return result;
		},
	},
	Mutation: {
		addVote: async (source, args) => {
			const { mobile, yes, no } = args.input;
			const vote = new Vote({ mobile, yes, no });
			let error = null;
			let votedResult = false;
			try {
				await vote.save();
				votedResult = true;
			} catch (err) {
				// eslint-disable-next-line no-console
				error = err.message || err.stack;
			}
			return {
				voted: votedResult,
				error,
			};
		},
	},
};

export default Vote;
