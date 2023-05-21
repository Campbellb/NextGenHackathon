const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai;