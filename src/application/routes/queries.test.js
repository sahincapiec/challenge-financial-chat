const request = require("supertest");
const app = require("../../app");

jest.mock("../config/environment");
jest.mock("../services/user");

describe("Queries", () => {
  test(
    "getMessages should return messages ordered by timestamp and limited by 50 messages " +
      "when receives a roomId and has more than 50 messages",
    async () => {
      const User = require("../repository/user");
      await User.deleteMany();
      const Message = require("../repository/message");
      await Message.deleteMany();
      const mockUser = {
        name: "Andres",
        email: "andres@domain.com",
        password: "4ndr3s.12345"
      };
      const aUser = await new User(mockUser);
      aUser.save();
      for (let timestamp = 0; timestamp < 51; timestamp++) {
        const aMessage = {
          message: "The message content.",
          roomId: 1,
          timestamp,
          owner: aUser
        };
        await Message(aMessage).save();
      }

      request(app)
        .get("/queries/getMessages/1")
        .expect(200)
        .then(response => response.body)
        .then(messages => {
          expect(messages[0].timestamp).toBe(50);
          expect(messages[49].timestamp).toBe(1);
        });
    }
  );
});
