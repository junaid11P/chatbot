# Chatbot Application

## Objective
This project is a full-stack chatbot application with the following features:

- **Email Sign In/Sign Up** using **Bolt + Nhost Auth**.
- **Chat system** using **Hasura GraphQL** queries, mutations, and subscriptions.
- **Chatbot** powered by **n8n** connected to **Hasura Actions**, which in turn calls **OpenRouter (free model)**.

---

## Requirements

### Authentication
- Email-based sign-up/sign-in with **Nhost Auth**.
- All features are restricted to **authenticated users only**.
- For email verification, **try using the same device and network** for smooth verification.

### Database & Permissions
- Create **`chats`** and **`messages`** tables in Hasura.
- Enable **Row-Level Security (RLS)** so users can only access their own data.
- Apply proper permissions for **insert, select, update, and delete**.
- Use only the **user role** for application access.

### GraphQL Only
- All frontend communication with the backend is done via **GraphQL queries, mutations, or subscriptions**.
- **No REST API calls** are allowed from the frontend.

### Hasura Action
- Create an **Action** (e.g., `sendMessage`) that triggers a **webhook in n8n**.
- The Action must be **protected by authentication and role permissions**.

### n8n Workflow
- Receive webhook calls from **Hasura Actions**.
- Validate that the requesting user **owns the chat_id**.
- Call **OpenRouter API** from within n8n using secure credentials.
- Save chatbot responses back to the database via **Hasura GraphQL**.
- Return the chatbot’s reply to the Hasura Action.

### Frontend
- Implement **chat list**, **message view**, and **real-time updates** via GraphQL subscriptions.
- Allow **creating new chats** and **sending messages**.
- Sending a message must:
  1. Save the user message to the database.
  2. Call the **Hasura Action** to trigger the chatbot.
  3. Display the chatbot’s response.

### Deployed : 
- https://jndchat.netlify.app/
