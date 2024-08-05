# PromptLib

PromptLib is an open-source prompting website designed to help users discover, create, and share creative prompts. This platform aims to enhance creativity and productivity by providing a space where users can find useful prompts to get better results and share their own with the community.

## Features

- **Discover Prompts**: Search for prompts using tags to find exactly what you need.
- **Create and Share**: Users can create prompts and share them with the world, adding tags for better organization.
- **User Profiles**: Access and manage your own prompts through a personal profile.
- **Google Sign-In**: Easy authentication using Google.

## Technologies Used

- **Frontend**: React (set up using Vite), Tailwind CSS
- **Backend**: Node.js, Express, Nodemon
- **Database**: MongoDB
- **Authentication**: @react-oauth/google
- **Version Control**: Git

## Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Backend**: Deployed on [Render](https://render.com)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/promptlib.git
    cd promptlib
    ```

2. **Install dependencies for the frontend and backend**
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the `backend` directory and add the following variables:
    ```plaintext
    MONGO_URI=your_mongodb_uri
    PORT=your_local_port
    ```
4. **Set up environment variables**

    Create a `.env` file in the `frontend` directory and add the following variables:
    ```plaintext
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
    VITE_API=your_backend_api
    ```

5. **Run the development server**
    ```bash
    # In the server directory
    npm start
    # In the client directory
    npm run dev
    ```

    The frontend should be running on `http://localhost:5174` and the backend on `http://localhost:PORT`.

## Usage

1. **Visit the live site**: [PromptLib](https://prompt-lib-nu.vercel.app)
2. **Sign in with Google** to access all features.
3. **Search for prompts** using tags.
4. **Create and share your own prompts**.
5. **Manage your prompts** from your personal profile.

## Contributing

Contributions are welcome!

## Acknowledgements

- Thanks to the open-source community for their invaluable contributions.

## Contact

For any questions or feedback, feel free to reach out to Pav125 at [devipavan824@gmail.com](mailto:devipavan824@gmail.com).

---

Live Site: [PromptLib](https://prompt-lib-nu.vercel.app)
