import axios from 'axios';
import * as configuration from '../config/configuration';

const config = configuration.default();

export const sendTextPrompt = async (
  prompt: string,
  stream: boolean = false,
) => {
  try {
    if (!prompt) return;
    const model = 'qwen3:30b-instruct';

    const agentUri = process.env.AI_URI;
    const agentPath = '/api/generate';
    const agentUsername = process.env.AI_USERNAME;
    const agentPassword = process.env.AI_PWD;
    const basicAuth = {
      username: agentUsername,
      password: agentPassword,
    };

    const body = {
      model,
      prompt,
      stream: false,
    };
    const response = await axios.post(agentUri + agentPath, body, {
      auth: basicAuth,
    });

    return response?.data.response;
  } catch (e) {
    throw new Error(e);
  }
};
