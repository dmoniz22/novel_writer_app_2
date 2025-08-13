# Novel Writer App
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/dmoniz22/novel_writer_app_2.git)

This repository contains the source code for an AI-powered novel writing application. It leverages Supabase for data persistence and MindsDB for AI-driven chapter generation, providing a platform for authors to co-write novels with an AI assistant. The application is containerized using Docker for easy setup and deployment.

## Features

-   **AI-Powered Chapter Generation**: Utilizes MindsDB, backed by models like GPT-3.5-turbo, to generate chapter drafts based on user-provided outlines and prompts.
-   **Structured Data Management**: Upload and store critical novel-planning documents, including novel outlines, chapter outlines, series bibles, worldbuilding notes, and lists of influential authors.
-   **Scalable Backend**: A Node.js and Express server provides a robust API for handling user requests.
-   **Persistent Storage**: Supabase is used to store user data, outlines, and generated chapter drafts.
-   **Containerized Environment**: The entire application stack (client and server) is managed with Docker and Docker Compose for streamlined development and deployment.

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Frontend**: React, Axios
-   **Database**: Supabase (PostgreSQL)
-   **AI/ML**: MindsDB (interfacing with OpenAI)
-   **Containerization**: Docker, Docker Compose

## Architecture

The application is composed of three main services:

1.  **Client**: A React-based single-page application that serves as the user interface. It allows users to upload their writing materials and interact with the AI to generate content.
2.  **Server**: An Express.js API that handles business logic. It communicates with Supabase to manage data and with MindsDB to trigger AI model training and inference for chapter generation.
3.  **Databases & Services**:
    -   **Supabase**: Acts as the primary database for storing all user-generated content, including outlines and chapter drafts.
    -   **MindsDB**: Connects to the data in Supabase to create and query a generative AI model fine-tuned on the user's specific writing style and story details.

## Database Schema

The application uses a PostgreSQL database managed by Supabase with the following schema:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE outlines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    novel_outline TEXT,
    chapter_outline TEXT,
    series_outline TEXT,
    worldbuilding TEXT,
    influential_authors TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    outline_id UUID REFERENCES outlines(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    draft TEXT,
    approved BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Git
-   Docker and Docker Compose

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/dmoniz22/novel_writer_app_2.git
    cd novel_writer_app_2
    ```

2.  **Configure Environment Variables**

    You need to set up API keys for Supabase and MindsDB.

    Create a `.env` file inside the `server/` directory:
    ```sh
    touch server/.env
    ```

    Add the following environment variables to `server/.env`, replacing the placeholder values with your actual credentials.

    ```env
    # Supabase Configuration
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key

    # MindsDB Configuration
    MINDSDB_API_KEY=your_mindsdb_api_key

    # Application Configuration
    PORT=3000
    ```

3.  **Set Up Supabase**
    -   Go to [Supabase](https://supabase.com/) and create a new project.
    -   Navigate to the **SQL Editor** in your project dashboard.
    -   Copy the contents of `schema.sql` from this repository and run it to create the necessary tables.
    -   Find your project's URL and `anon` key in **Project Settings > API** and add them to the `server/.env` file.

4.  **Launch the Application**
    From the root directory of the project, run the services using Docker Compose.

    ```sh
    docker-compose up --build
    ```

    The client will be accessible at `http://localhost:80` and the server will be running on port 3000.

## API Endpoints

The server exposes the following API endpoints.

| Method | Endpoint                    | Description                                                                                             |
| :----- | :-------------------------- | :------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/auth`                 | Authentication endpoint for SSO providers. **(Currently not implemented)**                              |
| `POST` | `/api/outlines`             | Uploads novel materials like outlines and worldbuilding info to Supabase.                               |
| `POST` | `/api/generate/chapter`     | Generates a new chapter draft using MindsDB based on a given prompt and the corresponding outline ID. |