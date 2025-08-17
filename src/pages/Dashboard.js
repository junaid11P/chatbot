import React, { useEffect, useCallback } from 'react';
import styles from '../styles/pages/Dashboard.module.css';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@n8n/chat/style.css'; // Import the styles
import { createChat } from '@n8n/chat'; // Import the createChat function

const Dashboard = () => {
  const { user } = useOutletContext();

  const chatConfig = useCallback(() => ({
    webhookUrl: 'https://junedblr.app.n8n.cloud/webhook/d9c2dd74-7bea-495c-8bc6-aa3ca91d3bbe/chat',
    // ... other config options (target, mode, initialMessages, i18n, etc.)
  }), []);

  useEffect(() => {
    // This is where the n8n chat widget is initialized
    createChat(chatConfig());
  }, [chatConfig]);

  return (
    <>
      <Helmet>
        <title>Dashboard - JDChat</title>
      </Helmet>

      <div>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles['welcome-text']}>
          Welcome, {user?.metadata?.firstName || 'stranger'}{' '}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </p>
        <p className={styles['welcome-subtext']}>
          We're glad to have you here. This is your personal space to manage chats, 
          track messages, and explore features securely.
        </p>
        <p className={styles['welcome-subtext']}>
          Get started by creating a new chat or continue your existing conversations.
        </p>
        {/* Dashboard Image */}
        <div className={styles.imageContainer}>
          <img 
            src="/dashboard-illustration.png" 
            alt="Dashboard illustration" 
            className={styles.dashboardImage}
          /> 
        </div>


        {/* This div is the target for the n8n chat widget */}
        <div id="n8n-chat"></div>

      </div>
    </>
  );
};

export default Dashboard;
