# 🦠 Covid-Daily-Report

A simple Node.js Line Bot that sends daily COVID-19 case updates.

## 📦 Features

- Fetches daily COVID-19 statistics
- Sends notifications via LINE Messaging API
- Lightweight and easy to deploy

## 📁 Project Structure

```
Covid-Daily-Report/
├── app.js           # Main application logic
├── line.js          # LINE API integration
├── package.json     # Project metadata and dependencies
```

## 🚀 Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Create a `.env` file with your LINE credentials:

```
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
LINE_CHANNEL_SECRET=your_channel_secret
```

3. **Run the bot**

```bash
node app.js
```
