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

	type VoteResult {
		positive: Int
		negative: Int
		invalid: Int
	}

	type Query {
		queryVotes: VoteResult
	}

	input AddVoteInput {
		mobile: String!
		yes: Boolean
		no: Boolean
	}

	type Mutation {
		addVote(input: AddVoteInput): Boolean!
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
			try {
				await vote.save();
				return true;
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error.message || error.stack);
				return false;
			}
		},
	},
};

export default Vote;
