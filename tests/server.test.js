import { client, testServer } from "../src/__tests__";

describe("server rate limit", () => {
	afterAll(async () => {
		await testServer.close();
		// avoid jest open handle error
		await new Promise((resolve) => setTimeout(() => resolve(), 50));
	});

	it("request over limit", async () => {
		try {
			await client.post("/test");
			await client.post("/test");
			await client.post("/test");
		} catch (error) {
			expect(error.response.status).toEqual(429);
			expect(error.response.headers["x-ratelimit-remaining"]).toEqual(0);
			expect(error.response.data).toEqual(
				expect.stringContaining("Too many request")
			);
		}
	});

	it("request limit reset", async () => {
		try {
			await new Promise((resolve) => setTimeout(() => resolve(), 600));
			await client.post("/test");
			await client.post("/test");
		} catch (error) {
			expect(error).toBeUndefined();
		}
	});
});
