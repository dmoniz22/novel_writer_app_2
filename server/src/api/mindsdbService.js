const axios = require('axios');

class MindsDBService {
    constructor(apiKey, baseUrl = 'https://cloud.mindsdb.com') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async checkModelExists(modelName) {
      try {
        const response = await this.client.get(`/api/models/${modelName}`);
        return response.status === 200;
      } catch (error) {
        return false;
      }
    }

    async createBookModel(bookId, trainingData) {
        const modelName = `book_${bookId}`;

        if (await this.checkModelExists(modelName)) {
            console.log(`Model ${modelName} already exists. Skipping creation.`);
            return modelName;
        }

        try {
            const response = await this.client.post('/api/models', {
                name: modelName,
                predict: 'chapter_text',
                using: {
                    engine: 'openai',
                    api_key: this.apiKey, // Ensure correct API key usage
                    model_name: "gpt-3.5-turbo"
                },
                data: trainingData
            });
            console.log(`Model ${modelName} creation started.`);
            return modelName;
        } catch (error) {
            console.error('Error creating model:', error.response ? error.response.data : error.message);
            throw new Error(`Failed to create model for book ${bookId}`);
        }
    }

    async generateChapter(modelName, prompt) {
        try {
            const response = await this.client.post(`/api/models/${modelName}/predict`, {
                data: {
                    prompt: prompt
                }
            });

            if (response.data && response.data.result) {
                return response.data.result.chapter_text;
            } else {
                console.error('Unexpected response from MindsDB:', response.data);
                throw new Error('Failed to generate chapter: Unexpected response format');
            }
        } catch (error) {
            console.error('Error generating chapter:', error.response ? error.response.data : error.message);
            throw new Error('Failed to generate chapter');
        }
    }
}

module.exports = MindsDBService;